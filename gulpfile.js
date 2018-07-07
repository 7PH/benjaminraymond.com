const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const tsify = require("tsify");
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlPaths = { pages: ['app/html/*.html'] };
const scssPaths = { pages: ['app/css/*.scss'] };
const resPaths = { pages: ['app/res/*'] };

gulp.task("copy-html", () => gulp.src(htmlPaths.pages).pipe(gulp.dest('dist/')));
gulp.task("copy-res", () => gulp.src(resPaths.pages) .pipe(gulp.dest('dist/res')));

gulp.task("copy-scss", function () {
    return gulp.src(scssPaths.pages)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
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
        .pipe(gulp.dest("dist/src/"));
});

gulp.task('default', gulp.parallel('copy-html', 'copy-scss', 'copy-res', 'typescript'));
