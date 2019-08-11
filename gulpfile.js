var gulp = require('gulp');
var scss = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let FileCache = require('gulp-file-cache');
var fileCache = new FileCache();

gulp.task('scss', function () {
   return new Promise(resolve => {
      gulp
         .src('./styles/index.scss')
         .pipe(fileCache.filter())
         .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
         .pipe(fileCache.cache())
         .pipe(gulp.dest('./public'));
      resolve();
   });
});

gulp.task('scss:ie9', function () {
   return new Promise(resolve => {
      gulp
         .src('./styles/ie.scss')
         .pipe(fileCache.filter())
         .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
         .pipe(fileCache.cache())
         .pipe(gulp.dest('./public'));
      resolve();
   });
});

gulp.task('scss:component', function () {
   return new Promise(resolve => {
      gulp
         .src('./styles/component/**/*.scss')
         .pipe(fileCache.filter())
         .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
         .pipe(fileCache.cache())
         .pipe(gulp.dest('./styles'));
      resolve();
   });
});

gulp.task('watch', function () {
   gulp.watch('./styles/*.scss', gulp.series('scss'));
   gulp.watch('./styles/module/*.scss', gulp.series('scss'));
   gulp.watch('./styles/shared/*.scss', gulp.series('scss'));
   gulp.watch('./styles/ie.scss', gulp.series('scss:ie9'));
   // gulp.watch("./styles/component/**/*.scss", gulp.series("scss:component"));
});
