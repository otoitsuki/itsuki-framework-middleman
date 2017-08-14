
// ========================================================
// 載入外掛
// ========================================================

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    hologram = require('gulp-hologram');
    browserSync = require('browser-sync').create(),
    livereload = require('gulp-livereload'),
    del = require('del'),
    webstandards = require('gulp-webstandards'),
    lint = require('gulp-eslint');



// ========================================================
// 建立任務
// ========================================================


// CSS
gulp.task('styles', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(postcss([require('autoprefixer')({ browsers: ['last 2 versions'] })]))
    .pipe(gulp.dest('source/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload({ start: true }));
});

// JS
gulp.task('scripts', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('source/assets/scripts'))
    .pipe(notify({ message: 'Script task complete' }))
    .pipe(livereload({ start: true }));
});

// IMG
gulp.task('images', function() {
  return gulp.src('source/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('source/assets/images'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(livereload({ start: true }));
});


// HTML
gulp.task('html', function() {
  return gulp.src('source/**/*.slim')
    .pipe(notify({ message: 'Html task complete' }))
    .pipe(livereload({ start: true }));
});


// hologram - default
gulp.task('hologram', function() {
    gulp.src('hologram_config.yml')
      .pipe(hologram())
      .pipe(notify({ message: 'hologram task complete' }))
      .pipe(livereload({ start: true }));
});



// browserSync Setup
gulp.task('js-watch', ['scripts'], browserSync.reload);
gulp.task('css-watch', ['styles'], browserSync.reload);
gulp.task('img-watch', ['images'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);


// browserSync Server
gulp.task('serve', function () {

    gulp.start('styles', 'scripts' , 'images', 'html');
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "source/"
        }
    });

    // Watch .scss files
    gulp.watch('source/sass/**/*', ['css-watch']);

    // Watch .js files
    gulp.watch('source/javascript/**/*', ['js-watch']);

    // Watch image files
    gulp.watch('source/images/**/*', ['img-watch']);
  // Watch html files
  gulp.watch('source/**/*.slim', ['html-watch']);
});


// ========================================================
// Watch
// ========================================================

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('source/sass/**/*', ['styles','hologram']);
  gulp.watch('source/sass/**/*', ['styles']);

  // Watch .js files
  gulp.watch('source/javascript/**/*', ['scripts']);

  // Watch image files
  gulp.watch('source/images/**/*', ['images']);

  // Watch slim files
  gulp.watch('source/**/*.slim', ['html']);

  // Create LiveReload server
  livereload.listen();

});


// ========================================================
// default 工作
// ========================================================

// Gulp default 工作
// gulp.task('default',['watch'],  function() {
//    gulp.start('styles', 'scripts' , 'images', 'html');
// });


// Gulp default 工作 browserSync Ver.
gulp.task('default',['watch'],  function() {
   gulp.start('styles', 'scripts' , 'images', 'html', 'hologram');
});

// ========================================================
// 其他工作
// ========================================================

// gulp webstandards
gulp.task('webstandards', function(){
        returngulp.src('source/**/*')
        .pipe(webstandards());
});

// gulp lint
gulp.task('lint', function () {
        gulp.src(['source/javascript/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
