const { src, dest, task, series } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const cmd = require('gulp-run-command').default;

const banner = `/*
 * AngularJS Paraguay Validators
 * License: MIT
 * author: Jorge Calijurio <jorge@calweb.com.br>
 * Project site: https://github.com/jcalijurio/angularjs-paraguay-validators
*/
`;

task('build', () => src(['./src/*.js'])
    .pipe(browserify({
        insertGlobals: false,
        debug: false
    }))
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(concat('angularjs-paraguay-validator.min.js'))
    .pipe(header(banner))
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