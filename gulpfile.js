const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');


gulp.task('html', function() {
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('public/build/html'))
});

gulp.task('styles', function() {
    return gulp.src('public/stylesheets/scss/*.scss', { style: 'expanded' })
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src('public/javascripts/app.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('pug', function() {
    return gulp.src('views/*.pug')
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/stylesheets/**/*.scss', ['styles']);
    gulp.watch('public/javascripts/*.js', ['scripts']);
    gulp.watch('views/*.pug', ['pug']);
});

gulp.task('server', function() {
    nodemon({
        'script': 'app.js',
        'ignore': 'public/*'
    });
});

gulp.task('serve', ['server', 'watch']);

gulp.task('default', ['scripts', 'styles', 'serve']);