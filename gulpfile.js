const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const tsify = require("tsify");
const htmlPaths = {
    pages: ['app/html/*.html']
};


gulp.task("copy-html", function () {
    return gulp.src(htmlPaths.pages)
        .pipe(gulp.dest("dist"));
});


gulp.task("typescript", function () {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['app/src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});

gulp.task('default', gulp.parallel('copy-html', 'typescript'));
