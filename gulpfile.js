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

// for virtual server config
const config = {
  connectionStr: 'mongodb://localhost/gmag-test',
  port: 3002,
};
gulp.task('server-start', () => {
  return Promise.resolve()
    .then(() => require('./db').init(config.connectionStr))
    .then((db) => require('./data').init(db))
    .then((data) => require('./data/initial.data').init(data))
    .then((data) => require('./app').init(data, config.sessionSecret))
    .then((app) => {
      app.listen(config.port,
        () => console.log(`Server running at port ${config.port}...`));
    });
});
// remove virtual db
const { MongoClient } = require('mongodb');
gulp.task('server-stop', () => {
  return MongoClient.connect(config.connectionStr)
    .then((db) => {
      return db.dropDatabase();
    });
});
//

gulp.task('test:browser', ['server-start'], () => {
  return gulp.src('./test/browser/**/*.js')
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 10000,
    }))
    .once('end', () => {
      gulp.start('server-stop');
    });
});

gulp.task('pre-test', () => {
  return gulp.src([
    './app/**/*.js',
    './config/**/*.js',
    './data/**/*.js',
    './db/**/*.js',
    './models/**/*.js',
    './server.js/**/*.js',
  ])
    // Covering files
    .pipe(istanbul({
      includeUntested: true,
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', gulpsync.sync([
  'pre-test',
  'test:unit',
  'test:integration',
  'test:browser',
]));
