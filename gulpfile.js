var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('default', ['build']);

gulp.task('build', ['ts', 'sass']);

gulp.task('ts', function() {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("app/**/*.ts", ['ts']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch('sass/**/*.scss', ['sass']);
});
