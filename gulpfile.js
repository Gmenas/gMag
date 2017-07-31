const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test:app', () => {
    return gulp.src([
        './app/**/*.js',
        './config/**/*.js',
        './data/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test:app', ['pre-test:app'], () => {
    return gulp.src([
        './tests/unit/**/*.js',
        './tests/integration/**/*.js',
    ])
        .pipe(mocha({
            slow: 2500,
            timeout: 5000,
        }))
        .pipe(istanbul.writeReports({
            dir: './tests/coverage',
        }));
});

gulp.task('test:browser', () => {
    const testServer = require('./tests/utils/test.server');
    const webDriver = require('./tests/browser/utils/web.driver');

    return Promise.all([
        testServer.start(),
        webDriver.setup('chrome'),
    ])
        .then(() => {
            return gulp.src('./tests/browser/**/*.js')
                .pipe(mocha({
                    slow: 5000,
                    timeout: 7500,
                }))
                .once('end', () => {
                    testServer.stop();
                    webDriver.quit();
                });
        });
});
