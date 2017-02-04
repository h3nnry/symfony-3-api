'use strict';

/*global jasmine */
require('ts-node/register');
var helpers = require('./helpers');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter,
    pkg = require('../package.json');

exports.config = {

  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using SauceLabs.
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  sauceBuild: process.env.CIRCLE_BUILD_NUM,

  allScriptsTimeout: 110000,

  // How long to wait for a page to load.
  getPageTimeout: 60000,

  specs: [
    helpers.root('src/**/**.e2e-spec.ts'),
    helpers.root('src/**/*.e2e-spec.ts')
  ],

  // Saucelabs capabilities reference
  // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
  multiCapabilities: [
    {
      'browserName': 'firefox',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Firefox 49.0: Windows 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '47.0',
      'platform': 'Windows 10'
    },
    {
      'browserName': 'chrome',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Chrome 48: Windows 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '54.0',
      'platform': 'Windows 10'
    },
    {
      'browserName': 'internet explorer',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (IE11: Windows 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '11.0',
      'platform': 'Windows 10'
    },
    {
      'browserName': 'internet explorer',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (IE10: Windows 8) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '10.0',
      'platform': 'Windows 8'
    },
    {
      'browserName': 'MicrosoftEdge',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (MS Edge 14: Windows 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '14.14393',
      'platform': 'Windows 10'
    },
    {
      'browserName': 'safari',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Safari 10: OS X 10.11) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '10.0',
      'platform': 'OS X 10.11'
    },
    {
      'browserName': 'Safari',
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'build': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Safari: i0S 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'deviceName': 'iPhone 7 Simulator',
      'platformName': 'iOS',
      'platformVersion': '10.0',
      'appiumVersion': '1.6.0',
      'deviceOrientation': 'portrait'
    },
    {
      'browserName': 'Browser',
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'build': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Android: 5.1) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'deviceName': 'Android Emulator',
      'platformName': 'Android',
      'platformVersion': '5.1',
      'appiumVersion': '1.5.3',
      'deviceOrientation': 'portrait'
    }
  ],

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000,
    print: () => {}
  },

  directConnect: false,

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new SpecReporter());
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};
