var gulp = require('gulp');
// var usemin = require('gulp-usemin');
// var uglify = require('gulp-uglify');
// var minifyHtml = require('gulp-minify-html');
// var minifyCss = require('gulp-minify-css');
// var jsonminify = require('gulp-jsonminify');
// var sass = require('gulp-sass');
// var livereload = require('gulp-livereload');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('default', ['minify', 'projects', 'json', 'fonts', 'images', 'sass'], function () {});

 
gulp.task('minify', function () {
  gulp.src('./src/index.html')
      .pipe($.usemin({
        assetsDir: '.',
        css: [$.minifyCss(), 'concat'],
        html: [$.minifyHtml({empty: true})],
        js: [$.uglify()]
      }))
      .pipe(gulp.dest('public/'));
});

gulp.task('projects', function () {
  return gulp.src('./src/projects/*.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./public/projects/'));
});

gulp.task('json', function () {
    return gulp.src(['./src/config.json'])
        .pipe($.jsonminify())
        .pipe(gulp.dest('public/'));
});


gulp.task('fonts', function() {
  gulp.src('bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('images', function() {
  gulp.src('src/img/**')
    .pipe(gulp.dest('./public/img'));
});

gulp.task('sass', function() {
  gulp.src('src/sass/sixtycycles.sass')
    .pipe($.sass({
      sourceComments: 'normal',
      style: 'compressed',
      includePaths: [
        './src/sass',
        'bower_components/bootstrap-sass-official/assets/stylesheets',
        'bower_components/fontawesome/scss',
      ]
    }))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe($.livereload());
});

gulp.task('watch', function () {
  $.livereload.listen();
  gulp.watch('src/sass/*.sass', ['sass']);
});

gulp.task('reload', function() {
  return gulp
    .src(config.modals)
    .pipe($.livereload());
});
