var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var paths = {
  jsSource: ['public/app/**/*.js', '!/public/bundle.js'],

};

gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
});

gulp.task('default', ['watch','js']);
