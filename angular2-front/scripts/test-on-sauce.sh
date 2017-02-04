#!/bin/bash

# For CircleCI only
if [[ $CIRCLECI ]]; then
  # Download and unzip sauce connect
  wget https://saucelabs.com/downloads/sc-latest-linux.tar.gz
  tar -xzf sc-latest-linux.tar.gz

  # Lauch sauce connect and create folder when done
  cd sc-*-linux
  nohup ./bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -i $CIRCLE_BUILD_NUM -f ~/sc_ready &

  # Wait for tunnel to be ready
  while [ ! -e ~/sc_ready ]; do sleep 1; done
  cd ..
fi

# e2e testing script
echo "Running e2e tests in CI mode"
npm run ci:circle

rc=$?

# shut down running services
curl -s -L http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1

# exit with appropriate status code
if [[ $rc != 0 ]]; then
  echo "protractor tests failed"
  exit 1
else
  echo "protractor tests passed"
  exit 0
fi
