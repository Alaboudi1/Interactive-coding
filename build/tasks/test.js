var gulp = require('gulp');
var Karma = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js'
  }, done).start();
});

/**
 * Run test once with code coverage and exit
 */
gulp.task('cover', function(done) {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true,
    reporters: ['progress'],
    preprocessors: {
      'test/**/*.js': ['babel'],
      'src/services/*.js': ['babel', 'progress']
    },
    coverageReporter: {
      includeAllSources: true,
      instrumenters: {
        isparta: require('isparta')
      },
      instrumenter: {
        'src/**/*.js': 'isparta'
      },
      reporters: [
        { type: 'html', dir: 'progress' },
        { type: 'text' }
      ]
    }
  }, done).start();
});
