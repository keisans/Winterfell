var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var babel      = require('gulp-babel');

/**
 * Examples Build
 */
gulp.task('build-examples', function() {
  return browserify({
           debug   : process.env.NODE_ENV != 'production',
           entries : [
             'examples/app.js'
           ]
         })
         .transform(babelify)
         .bundle()
         .pipe(source('app.js'))
         .pipe(buffer())
         .pipe(uglify())
         .pipe(gulp.dest('examples/build'));
});

gulp.task('watch-examples', function() {
  return gulp.watch([
    'src/**/*.js',
    'examples/**/*.js',
    '!examples/build/app.js'
  ], {}, function() {
    return gulp.start('build-examples');
  });
});

/**
 * Dev Build
 */
gulp.task('build-dev', function() {
  return browserify({
           debug   : process.env.NODE_ENV != 'production',
           entries : [
             'dev/test.js'
           ]
         })
         .transform(babelify)
         .bundle()
         .pipe(source('app.js'))
         .pipe(buffer())
         .pipe(gulp.dest('dev/build'));
});

gulp.task('watch-dev', function() {
  return gulp.watch([
    'src/**/*.js',
    'dev/**/*.js',
    '!dev/build/app.js'
  ], {}, function() {
    return gulp.start('build-dev');
  });
});

gulp.task('dist', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
