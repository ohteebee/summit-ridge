var gulp = require('gulp'),
    sass = require('gulp-sass');
var rename = require('gulp-rename');
var gulp = require('gulp');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
var paths = {
    sassRoot: 'src/theme/index.scss',
    sass: ['src/**/*.scss',
        'src/**/*.sass'
    ],
    destination: 'src',
    production: 'public',
    clean: ['public', 'build'],
    html: ['./src/**/*.html'],
    build: ['./build/**/*.js'],
    extras: ['./src/assets/**/*'],
    js: ['./src/*.js', './src/**/*.js']
};


gulp.task('sass', function() {
    return gulp.src(paths.sassRoot)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.destination));
});

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
//   // gulp.watch(paths.ts, ['compile']);
// });


gulp.task('build', function(cb) {
    runSequence('clean', ['sass', 'useref', 'ng_annotate'], 'extras', cb);
});

gulp.task('build-js', function(cb) {
    runSequence('ng_annotate', cb);
});


gulp.task('build-html', function(cb) {
    runSequence('useref', cb);
});

gulp.task('build-sass', function(cb) {
    runSequence('sass', cb);
});

gulp.task('extras', function() {
    gulp.src(paths.extras)
        .pipe(gulp.dest(paths.production + '/assets'));
});


gulp.task('ng_annotate', function(done) {
    gulp.src(paths.js)
        .pipe(ngAnnotate({
            single_quotes: true
        }))
        .pipe(gulp.dest('./build'))
        .on('end', done);
});

gulp.task('useref', function() {
    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulp.dest(paths.production));
});


gulp.task('clean', function() {
    return del(paths.clean);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['build-sass']);
    gulp.watch(paths.html, ['build-html']);
    gulp.watch(paths.js, ['build-js']);
    gulp.watch(paths.extras, ['extras']);
});
