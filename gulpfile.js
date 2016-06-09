var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var doiuse = require('doiuse');
var autoprefixer = require('autoprefixer');
var cssmqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var paths = {
  'scss': './src/scss',
  'css': './assets/css',
  'map': '../maps'
}

var browsers = [
  'last 2 versions', '> 5%'
];

gulp.task('watch', function() {
  gulp.watch(paths.scss + '/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src(paths.scss + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: browsers}),
      doiuse({browsers: browsers}),
      cssmqpacker,
      //cssnano()
    ]))
    .pipe(sourcemaps.write(paths.map))
    .pipe(gulp.dest(paths.css));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './assets'
    },
    startPath: 'html/index.html'
  });

  gulp.watch('./assets/**', function() {
    browserSync.reload();
  });
});

gulp.task('default', ['browser-sync', 'watch']);
