var { src, dest, watch, task, series, parallel } = require('gulp');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
let header = require('gulp-header');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');

const banner = `/*
 * AngularJS Paraguay Validators
 * License: MIT
 * Project: github.com 
*/`;

task('build', () => src(['./src/*.js'])
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(concat('angularjs-paraguay-validator.min.js'))
    .pipe(addsrc.prepend(['node_modules/paraguay-validators/paraguay-validators.min.js']))
    .pipe(concat('angularjs-paraguay-validator.min.js'))
    .pipe(dest('dist/')));