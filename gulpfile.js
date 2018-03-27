var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var notify = require( 'gulp-notify' );
var svgSprite = require("gulp-svg-sprites");



gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.scss')
      .pipe( sass().on( 'error', notify.onError(
          {
              message: "<%= error.message %>",
              title  : "Sass Error!"
          } ) )
      )
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});



gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('src/sass/**/*.scss', ['sass']); 
  // Обновляем браузер при любых изменениях в HTML или JS
  gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
});



gulp.task('useref', function () {
    return gulp.src(['src/*.html', 'src/*.php'])
    	.pipe(useref())
    	// Минифицируем только CSS файлы
    	//.pipe(gulpIf('*.css', minifyCSS()))
	    // Uglifies only if it's a Javascript file
	    .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
});


gulp.task('images', function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('dist/img'))
});


gulp.task('libs', function() {
    return gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
});



gulp.task('clean:dist', function(callback){
    del(['dist/**/*', '!dist/img', '!dist/img/**/*','!dist/fonts', '!dist/fonts/**/*', '!dist/js', '!dist/js/**/*'], callback)
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], callback)
});




gulp.task('build', function (callback) {
    runSequence(['clean:dist', 'sass', 'useref', 'images', 'libs'], callback)
});
