const {describe, expect, test}  = require('@jest/globals');
const {add, getStatusTrackerInfo}  = require('./index');

describe('test', () => {
    test('should add numbers', () => {
        expect(add(5, 6)).toEqual(11);
    })
})

describe('should highlight the current status', () => {
    const completeClass = 'progress-complete';
    const activeClass = 'progress-active';
    const testCases = [
      { status: 'RequestAcknowledged', expectedArr: [], showTracker: false },
      { status: 'RequestSubmitted', expectedArr: [], showTracker: false },
      { status: 'Completed', expectedArr: [], showTracker: false },
      { status: 'inTransit', expectedArr: [completeClass, activeClass, '', '', ''], showTracker: true },
      { status: 'crewAssigned', expectedArr: [activeClass, '', '', '', ''], showTracker: true },
      { status: 'onLocation', expectedArr: [completeClass, completeClass, activeClass, '', ''], showTracker: true },
      { status: 'InProcess', expectedArr: [completeClass, completeClass, completeClass, activeClass, ''], showTracker: true },
      { status: 'Canceled', expectedArr: [], showTracker: false }
    ];
    
    test('It should have correct status tracker for each status', () => {
      testCases.forEach((testCase) => {
        const statusInfo = getStatusTrackerInfo(testCase.status, []);
        expect(statusInfo.statusArr).toEqual(testCase.expectedArr);
        expect(statusInfo.showTracker).toEqual(testCase.showTracker);
       });
    });
});