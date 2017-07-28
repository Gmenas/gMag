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
        .pipe(mocha())
        .pipe(istanbul.writeReports({
            dir: './tests/coverage',
        }));
});

gulp.task('test:browser', () => {
    const testServer = require('./tests/browser/utils/test.server');
    return testServer.start()
        .then(() => {
            return gulp.src('./tests/browser/**/*.js')
                .pipe(mocha({
                    slow: 10000,
                    timeout: 10000,
                }))
                .once('end', () => {
                    testServer.stop();
                });
        });
});
