const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter');
var noop = function () {};

var jasmine = new Jasmine();

jasmine.loadConfig({
  "spec_dir": "dist",
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  "helpers": [
    "helpers/**/*.js"
  ],
  "stopSpecOnExpectationFailure": false,
  "random": false
});

jasmine.configureDefaultReporter({print: noop});    // remove default reporter logs
jasmine.addReporter(new SpecReporter());

jasmine.execute();
