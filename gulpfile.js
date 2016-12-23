'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var ghPages = require('gulp-gh-pages');
var ejs = require("gulp-ejs");

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
}

var BROWSER_SYNC_RELOAD_DELAY = 3000;

gulp.task('sass', function () {
  return gulp.src('./public/**/*.scss')
    .pipe(sass({
      includePaths: [
        require('node-bourbon').includePaths,
        require('bootstrap').includePaths
      ],
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(concat('style.css')) // this is what was missing
    .pipe(gulp.dest('./public/css')); // output to theme root
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'index.js',
    watch: ['index.js']
  }).on('start', function onStart() {
    // ensure start only got called once
    if (!called) { cb(); }
    called = true;
  }).on('restart', function onRestart() {
    // reload connected browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 3201,

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});
gulp.task("scripts", function () {
  gulp.src("public/js/sigbit-admin.js")
    .pipe(include({
      includePaths: [
        __dirname + "/node_modules/jquery/dist",
        __dirname + "/node_modules/bootstrap/dist/js",
        __dirname + "/node_modules/tether/dist/js",
        __dirname + "/public/js",
      ]
    }))
    .on('error', console.log)
    .pipe(gulp.dest("public"));
});
gulp.task('default', ['browser-sync', 'scripts'], function () {
  gulp.watch('public/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('public/**/*.scss', ['sass', browserSync.reload]);
  gulp.watch('views/**/*.ejs', ['bs-reload']);
});

gulp.task('deploy', ['prod'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      "remoteUrl" : "git@github.com:significantbit/sigbit-admin.git"
    }));
});

gulp.task('prod', function () {
  gulp.src("public/js/sigbit-admin.js")
    .pipe(include({
      includePaths: [
        __dirname + "/node_modules/jquery/dist",
        __dirname + "/node_modules/bootstrap/dist/js",
        __dirname + "/node_modules/tether/dist/js",
        __dirname + "/public/js",
      ]
    }))
    .on('error', console.log)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest("dist"))
    .pipe(concat('sigbit-admin.js'))
    .pipe(gulp.dest("dist"))
    .pipe(concat('sigbit-admin.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));

  gulp.src('./public/sass/style.scss')
    .pipe(sass({
      includePaths: [require('node-bourbon').includePaths],
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(concat('sigbit-admin.css'))
    .pipe(gulp.dest('dist'))
    .pipe(concat('sigbit-admin.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));

  gulp.src("./views/**/*.ejs")
    .pipe(ejs({
      msg: "Hello Gulp!",
    },{ext:'.html'}))
    .pipe(gulp.dest("./dist"));
})
