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
// SASS Task
// // /////////////////////////////////////////////
gulp.task('html', function() {
  gulp.src('app/**/*.html')
  .pipe(browserSync.stream());
});

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