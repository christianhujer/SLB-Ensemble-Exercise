.PHONY: all
## all:	Run the mutation tests.
all:
	npx stryker run

.PHONY: help
## help:	Print this help text.
help:
	@sed -En 's/^## ?//p' $(MAKEFILE_LIST)
