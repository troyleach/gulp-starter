// ////////////////////////////////////////////////
// Required taskes
// gulp build
// bulp build:serve
// // /////////////////////////////////////////////
var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    del          = require('del'),
    rename       = require('gulp-rename');

// ////////////////////////////////////////////////
// Scripts Task
// // /////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
});

// ////////////////////////////////////////////////
// SASS Task
// // /////////////////////////////////////////////
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
      }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
  });

// ////////////////////////////////////////////////
// HTML Task
// // /////////////////////////////////////////////
gulp.task('html', function() {
  gulp.src('app/**/*.html')
  .pipe(browserSync.stream());
});

// ////////////////////////////////////////////////
// BUILD Task
// // /////////////////////////////////////////////
// Task delete the build dir first
gulp.task('build:deleteFolder', function(cb) {
  del([
    'build/**'
  ], cb());
});

// Task to create build directory for all files
gulp.task('build:copy', ['build:deleteFolder'], function() {
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
  });

// Task to remove unwanted build files in => list all dir to be included
gulp.task('build:remove', ['build:copy'], function(cb) {
  del([
    'build/scss/',
    'build/js/!(*.min.js)'
  ], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);


// ////////////////////////////////////////////////
// Scripts Task
// // /////////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./app/"
    }
  });
});

// Task to run build server for testing final app
gulp.task('build:serve', function() {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  });
});

// ////////////////////////////////////////////////
// Watch Task
// // /////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts'])
  gulp.watch('app/scss/**/*.scss', ['sass'])
  gulp.watch('app/**/*.html', ['html'])
})


// ////////////////////////////////////////////////
// Default Task
// // /////////////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);