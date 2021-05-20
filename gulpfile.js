const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const tsify = require("tsify");
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const pug = require('gulp-pug');

const pugPaths = { pages: ['app/views/*.pug'] };
const scssPaths = { pages: ['app/css/*.scss'] };
const resPaths = { pages: ['app/assets/**/*'] };

gulp.task("copy-views", () => {
    return gulp.src(pugPaths.pages)
        .pipe(pug())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('docs/'))
});
gulp.task("copy-assets", () => gulp.src(resPaths.pages) .pipe(gulp.dest('docs/assets')));

gulp.task("copy-scss", function () {
    return gulp.src(scssPaths.pages)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('docs'));
});


gulp.task("typescript", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['app/src/main.ts'],
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(gulp.dest("docs"));
});

gulp.task('default', gulp.parallel('copy-views', 'copy-scss', 'copy-assets', 'typescript'));
