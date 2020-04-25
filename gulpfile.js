var { src, dest, task, series } = require('gulp');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
let header = require('gulp-header');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');

const banner = `/*
 * AngularJS Paraguay Validators
 * License: MIT
 * author: Jorge Calijurio <jorge@calweb.com.br>
 * Project site: https://github.com/jcalijurio/angularjs-paraguay-validators
*/
`;

task('build', () => src(['./src/*.js'])
    .pipe(browserify({
        insertGlobals: true,
        debug: false
    }))
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(concat('angularjs-paraguay-validator.min.js'))
    .pipe(dest('dist/'))
);

task('copy', () =>
    src(['package.json', 'LICENSE', 'README.md'])
        .pipe(dest('./dist/'))
);

task('upload', cb =>
    cmd('npm publish', { cwd: './dist/' })()
        .then(() => cb())
);

task('publish', series('build', 'copy', 'upload'));