'use strict';

var gulp = require('gulp');
/*var Server = require('karma').Server;*/
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var reload = browserSync.reload;


// Static server
/*gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});*/

// CarmaTest
/*gulp.task('test', function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});*/


var path = {
    build: {
        html: 'build/',
        directives: 'build/directives/',
        js: 'build/js',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index*.html',
        directives: 'src/directives/*.html',
        js: 'src/js/*.js',
        style: 'src/sass/main.scss'
    },
    watch: {
        html: 'src/**/index*.html',
        directives: 'src/directives/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.*',
        stylecss: 'css/**/*.css'
    },
    clean: './build'
};

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css'));
}); 


gulp.task('uglify', function() {
    gulp.src(path.watch.js)
        ///.pipe(uglify()) 
        .pipe(gulp.dest('build/js'))
});


gulp.task('sass', function(){
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.build.css));
        //.pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src([path.src.html])
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .on('end', function() {
            console.log('html - ok')
        });
        //.pipe(reload({stream: true}));
});
gulp.task('directives', function () {
    gulp.src([path.src.directives])

        .pipe(gulp.dest(path.build.directives))
        .on('end', function() {
            console.log('directives - ok')
        });
        //.pipe(reload({stream: true}));
});

/*gulp.task('jshint', function() {
  gulp.src('js/scroll_eng.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});*/
/*
gulp.task('do-log', function(){
    gulp.watch('js/scroll_eng.js', function(changes){
        console.log(changes);
        gulp.run('jshint');
    });
});*/


gulp.task('sass:watch', function(){
    gulp.watch(path.watch.style,['sass'])
});

gulp.task('minify-css:watch', function(){
    gulp.watch(path.watch.style,['minify-css'])
});

gulp.task('uglify:watch', function(){
    gulp.watch(path.watch.js,['uglify'])
});

gulp.task('html:watch', function(){
    gulp.watch(path.watch.html,['html:' + 'build'])
});
gulp.task('directives:watch', function(){
    gulp.watch(path.watch.directives,['directives'])
});

gulp.task('default', ['uglify','uglify:watch','sass','sass:watch', 'html:build', 'html:watch', 'directives:watch']);