// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath();
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/front'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'cobertura' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    restartOnFileChange: true,
    browsers:['ChromeHeadless'],
    junitReporter: {
      outputDir: 'junit-report', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      useBrowserName: false, // add browser name to report and classes names
    }
  });
};