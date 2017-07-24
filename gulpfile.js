const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('test:unit', () => {
  return gulp.src('./test/unit/**/*.js')
    .pipe(mocha({
      reporter: 'nyan',
    }))
    .pipe(istanbul.writeReports());
});

gulp.task('test:integration', () => {
  return gulp.src('./test/integration/**/*.js')
    .pipe(mocha({
      reporter: 'nyan',
    }))
    .pipe(istanbul.writeReports());
});

gulp.task('pre-test', () => {
  return gulp.src([
    './app/**/*.js',
    './config/**/*.js',
    './data/**/*.js',
    './db/**/*.js',
    './models/**/*.js',
    './server.js/**/*.js',
  ]);
});

gulp.task('test', gulpsync.sync([
  'pre-test',
  'test:unit',
  'test:integration',
]));
