exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    capabilities: [{
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        'appium:app': '../web/android/app/build/outputs/apk/debug/app-debug.apk',
        'appium:deviceName': 'Medium_Phone_API_36.0',
        'appium:platformVersion': '15.0',
        'appium:automationName': 'UiAutomator2'
    }],
    logLevel: 'info',
    bail: 0,
    hostname: 'localhost',
    port: 4723,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,
    framework: 'mocha',

    reporters: ['spec'],

    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
