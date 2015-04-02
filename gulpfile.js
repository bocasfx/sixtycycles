var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var livereload = require('gulp-livereload');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var config = {
  sassPath: './sass',
  bowerDir: './bower_components',
  sass: ['./sass/**/*.scss', './sass/**/*.sass'],
  modals: ['./www/modals/**/*.html', './www/**/*.html'],
  js: ['./www/js/**/*.js'],
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./www/fonts'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.modals, ['reload']);
  gulp.watch(config.js, ['reload']);
});

gulp.task('reload', function() {
  return gulp
    .src(config.modals)
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp
    .src(config.sassPath + '/sixtycycles.sass')
    .pipe(sass({
      sourceComments: 'normal',
      style: 'compressed',
      includePaths: [
        './sass',
        config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
        config.bowerDir + '/fontawesome/scss',
      ]
    }))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe($.rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css'))
    .pipe(livereload());
});

gulp.task('build', function() {
  return gulp
    .src([
      config.bowerDir + '/jquery/dist/jquery.min.js',
      config.bowerDir + '/jquery/dist/jquery.min.map',
      config.bowerDir + '/bootstrap/dist/js/bootstrap.min.js',
      config.bowerDir + '/scrollReveal.js/dist/scrollReveal.min.js'
    ])
    .pipe(gulp.dest('./www/js'));
});
