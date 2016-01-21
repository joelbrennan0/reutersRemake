/* gulpfile.js */
var
    gulp = require('gulp'),
    sass = require('gulp-sass');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
        in: './bower_components/bootstrap-sass-official/'
    };

// fonts
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

// css source file: .scss files
var css = {
    in: source + 'css/main.scss',
    out: dest + 'css/',
    watch: source + 'css/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});

gulp.task('html', function()
{
	return gulp.src('src/*.html')
		.pipe(gulp.dest(dest));
});

// default task
gulp.task('default', ['sass', 'html'], function () {
     gulp.watch(css.watch, ['sass', 'html']);
});
