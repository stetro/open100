var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();

gulp.task('default', ['build']);

gulp.task('build', ['ts']);

gulp.task('ts', function() {
	var tsProject = ts.createProject('tsconfig.json');
	return tsProject.src()
		.pipe(ts(tsProject)).js
        .pipe(gulp.dest('dist'))
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
});
