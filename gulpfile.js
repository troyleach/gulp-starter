///////////////////////////////////////////////
//
// EDIT CONFIG OBJECT BELOW !!!
// 
// jsConcatFiles => list of javascript files (in order) to concatenate
// buildFilesFoldersRemove => list of files to remove when running final build
// // //////////////////////////////////////////////
var config = {
  jsConcatFiles: [
    './app/js/module1.js', 
    './app/js/main.js'
  ], 
  buildFilesFoldersRemove:[
    'build/scss/', 
    'build/js/!(*.min.js)',
    'build/bower.json',
    'build/bower_components/',
    'build/maps/'
  ]
};

// ////////////////////////////////////////////////
// Required taskes
// gulp build
// bulp build:serve
// // /////////////////////////////////////////////
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    del          = require('del');

function errorlog(err) {
  console.error(err.message);
  this.emit('end');
};

// ////////////////////////////////////////////////
// Scripts Task
// // /////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(config.jsConcatFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('temp.js'))
    .pipe(uglify())
    .on('error', errorlog)
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('app/js'))

    .pipe(browserSync.stream());
});

// ////////////////////////////////////////////////
// SASS Task
// // /////////////////////////////////////////////
gulp.task('sass', function() {
  gulp.src('app/scss/style.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .on('error', errorlog)
      .pipe(autoprefixer({
             browsers: ['last 3 versions'],
             cascade: false
          })) 
      .pipe(sourcemaps.write('../maps'))
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