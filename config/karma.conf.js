'use strict';

module.exports = config => {
    var configuration = {
        basePath: '../src',
        frameworks: ['jasmine', 'browserify'],
        browsers: [/*'Firefox', 'Chrome',*/ 'ChromeHeadless', 'FirefoxHeadless' /*, 'ChromeHeadlessNoSandbox' */],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../utils/test-utils.js',
            '**/*.test.js',
            '*.test.js'
        ],
        preprocessors: {
            '**/*.test.js': ['browserify'],
            '*.test.js': ['browserify']
        },

        autoWatch: true,

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-browserify'
        ]
    };

    config.set(configuration);
};