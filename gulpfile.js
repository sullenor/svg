'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jade = require('gulp-jade');
var source = require('vinyl-source-stream');

gulp.task('default', ['css', 'html', 'js']);

gulp.task('css', function () {
  gulp.src('bro/**/*.css')
    .pipe(concat('common.css'))
    .pipe(gulp.dest('static'));
});

gulp.task('html', function () {
  gulp.src('./bro/page/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./static'));
});

gulp.task('js', function () {
  browserify('./bro/page/browser.js')
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.error(err.message || err); })
    .pipe(source('browser.js'))
    .pipe(gulp.dest('static'));
});

gulp.task('gaze', function () {
  gulp.watch('bro/**/*.css', ['css']);
  gulp.watch('bro/page/index.jade', ['html']);
  gulp.watch([
    'bro/components/*/*.jsx',
    'bro/*/*.js'
  ], ['js']);
});
