function add(a, b) {
    return a + b;
}
const statusKeyMap = {
    requestAcknowledged: 'requestacknowledged',
    crewAssigned: 'crewassigned',
    inTransit: 'intransit',
    onLocation: 'onlocation',
    inProcess: 'inprocess',
    completed: 'completed',
    canceled: 'cancelled',
    requestSubmitted: 'requestsubmitted',
    requestWithdrawn: 'requestwithdrawn',
    onHold: 'onhold'
  };
  const requestedStart = 'Requested Start'
  const dateTimeFormat = 'MM/dd/yy, hh:mma'
const actionStatusProgressionMap = new Map([
    [statusKeyMap.requestAcknowledged, { stateValue: -1, stateAction: 'View', showDateInTracker: false, dateLabel: requestedStart, dateField: 'plannedActivityStartDate', format: 'MM/dd/yy', timeZone: false, statusDisplayName: 'Acknowledged', statusClassName: 'acknowledged-status' }],
    [statusKeyMap.crewAssigned, { stateValue: 1, stateAction: 'View', showDateInTracker: false, dateLabel: 'Forecast Start', dateField: 'plannedActivityStartDate', format: 'MM/dd/yy', timeZone: false, statusDisplayName: 'Crew Assigned', statusClassName: 'crewasign-status' }],
    [statusKeyMap.inTransit, { stateValue: 2, stateAction: 'View', showDateInTracker: false, dateLabel: 'ETA', dateField: 'estimatedArrivalDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'In Transit', statusClassName: 'transit-status' }],
    [statusKeyMap.onLocation, { stateValue: 3, stateAction: 'View', showDateInTracker: false, dateLabel: 'Arrived', dateField: 'lastModifiedDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'On Location', statusClassName: 'location-status' }],
    [statusKeyMap.inProcess, { stateValue: 4, stateAction: 'View', showDateInTracker: false, dateLabel: 'Started', dateField: 'lastModifiedDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'In Progress', statusClassName: 'progress-status' }],
    [statusKeyMap.completed, { stateValue: -1, stateAction: 'View', showDateInTracker: true, dateLabel: 'Completed', dateField: 'lastModifiedDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'Completed', statusClassName: 'completed-status' }],
    [statusKeyMap.canceled, { stateValue: -1, stateAction: 'View', showDateInTracker: true, dateLabel: 'Canceled', dateField: 'lastModifiedDate', format: 'MM/dd/yy', timeZone: false, statusDisplayName: 'Canceled', statusClassName: 'canceled-status' }],
    [statusKeyMap.requestWithdrawn, { stateValue: -1, stateAction: 'View', showDateInTracker: false, dateLabel: 'Scheduled for', dateField: 'activityStartDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'Withdrawn' }],
    [statusKeyMap.requestSubmitted, { stateValue: -1, stateAction: 'View', showDateInTracker: false, dateLabel: requestedStart, dateField: 'activityStartDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'Submitted', statusClassName: 'submitted-status' }],
    ['', { stateValue: -1, stateAction: 'View', showDateInTracker: true, dateLabel: 'Scheduled for', dateField: 'activityStartDate', format: dateTimeFormat, timeZone: true, statusDisplayName: '' }],
    [statusKeyMap.onHold, { stateValue: -1, stateAction: 'View', showDateInTracker: false, dateLabel: requestedStart, dateField: 'activityStartDate', format: dateTimeFormat, timeZone: true, statusDisplayName: 'On Hold', statusClassName: 'onhold-status' }],
  ]);
function getStatusTrackerInfo(currentServiceState, statuses) {
    const serviceConfig = actionStatusProgressionMap.get(currentServiceState?.toLowerCase()) ?? actionStatusProgressionMap.get('');
    const status = statuses.find(status => status.id?.toLowerCase() === currentServiceState?.toLowerCase());
    const statusCount = 5;
    if (status?.shortName && serviceConfig) {
      serviceConfig.statusDisplayName = status.shortName;
    }
    const currentState = serviceConfig?.stateValue ?? -1;
    const showTracker = currentState !== -1;
    let statusArr = [];
    let statusSubtitle = '';
    if (showTracker) {
      for (let status = 1; status <= statusCount; status++) {
        let className = '';
        if (status < currentState) {
          className = `progress-complete`;
        }
        if (status === currentState) {
          className = `progress-active`;
        }
        statusArr.push(className);
      }
    }
    if ([statusKeyMap.requestSubmitted, statusKeyMap.requestAcknowledged].includes(currentServiceState)) {
      statusSubtitle = 'reqDetails.header.submittedSubtitle';
      statusArr = [];
    }

    return { statusArr, showTracker, showDate: !!serviceConfig?.showDateInTracker, statusDisplayName: serviceConfig?.statusDisplayName, statusSubtitle, statusClassName: serviceConfig?.statusClassName };
  }

module.exports = {
    getStatusTrackerInfo,
    add
}

