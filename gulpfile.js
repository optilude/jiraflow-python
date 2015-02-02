/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module */

/**
 * Build CSS and JavaScript using `gulp`.
 *
 * Main targets are: `js`, `css` and `watch`.
 *
 * Run with `--production` to get minified sources.
 */

"use strict";

var argv = require('yargs').argv,

    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    gulpif     = require('gulp-if'),

    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    reactify   = require('reactify'),
    uglify     = require('gulp-uglify'),

    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css');

// Prefix for static resources in the Pyramid app
var staticDirectory = './jiraflow/retail/static/',
    jsDirectory     = staticDirectory + 'js/',

    jsMainFile      = jsDirectory + 'index.jsx',
    jsBundleFile    = 'bundle.js',

    cssMainFile     = staticDirectory + 'less/styles.less',
    cssFiles        = staticDirectory + 'less/**/*.less';

// Browserify bundler
var bundler = browserify({
    entries: [jsMainFile],
    extensions: ['.jsx'],
    debug: !argv.production,
    paths: ['./node_modules', jsDirectory], // XXX: Possibly deprecated approach, see http://stackoverflow.com/questions/20158401
    cache: {}, packageCache: {}, fullPaths: true // for watchify
});

// enable reactify transform with es6 magic
bundler.transform(reactify, {es6: true});

// Build JavaScript using Browserify
gulp.task('js', function() {
    return bundler
        .bundle()
        .pipe(source(jsBundleFile))
        .pipe(buffer())
        .pipe(gulpif(!argv.production, sourcemaps.init({loadMaps: true}))) // loads map from browserify file
        .pipe(gulpif(!argv.production, sourcemaps.write('./'))) // writes .map file
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(staticDirectory));
});

// Build CSS
gulp.task('css', function(){
    return gulp.src(cssMainFile)
        .pipe(less())
        .pipe(gulpif(argv.production, minifyCSS({keepBreaks:true})))
        .pipe(gulp.dest(staticDirectory));
});

// Watch JS + CSS using watchify + gulp.watch

gulp.task('watchify', function() {
    var watcher  = watchify(bundler);
    return watcher
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('update', function () {
        watcher.bundle()
        .pipe(source(jsBundleFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(staticDirectory));

        gutil.log("Updated JavaScript sources");
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source(jsBundleFile))
    .pipe(gulp.dest(staticDirectory));
});

gulp.task('csswatch', function () {
    gulp.watch(cssFiles, ['css']);
});

gulp.task('watch', ['watchify', 'csswatch']);
gulp.task('default', ['js', 'css']);

module.exports = gulp; // for gulp-devtools