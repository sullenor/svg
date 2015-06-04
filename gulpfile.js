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
    .pipe(concat('index.css'))
    .pipe(gulp.dest('static'));
});

gulp.task('html', function () {
  gulp.src('./pages/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./static'));
});

gulp.task('js', function () {
  browserify('./pages/index.js')
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.error(err.message || err); })
    .pipe(source('index.js'))
    .pipe(gulp.dest('static'));
});

gulp.task('spy', ['default'], function () {
  gulp.watch(['pages/index.css', 'bro/components/*.css'], ['css']);
  gulp.watch('pages/index.jade', ['html']);
  gulp.watch([
    'pages/index.js',
    'bro/components/*.jsx',
    'bro/*/*.js'
  ], ['js']);
});
