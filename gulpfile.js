var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');

var paths = {
  jsSource: ['./public/app/**/*.js', '!/public/bundle.js'],
  lessSource: ['./public/styles/**/*.less']
};

gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  .pipe(gulp.dest('./public'));
});

gulp.task('less', function () {
  return gulp.src(paths.lessSource)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.lessSource, ['less']);
});

gulp.task('default', ['watch', 'js', 'less']);
