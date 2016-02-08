/* gulpfile.js */
var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    nunjucksRender = require('gulp-nunjucks-render'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    maps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    data = require('gulp-data');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
        in: './bower_components/bootstrap-sass-official/'
    };
// var jquery = {
//         in: './jquery/dist/jquery.min.js'
//     };

var js = {
      in: [
        'bower_components/jquery/dist/jquery.min.js',
        bootstrapSass.in + 'assets/javascripts/*.min.js',
        source + 'js/*.js'],
      out: dest + 'js/'
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

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates/'], {watch: false});

  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
  // Adding data to Nunjucks
  .pipe(data(function() {
    return require('./src/JSON/press-releases.json')
  }))
  .pipe(data(function() {
    return require('./src/JSON/news-links.json')
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in src folder
  .pipe(gulp.dest('src'))
});

// copy bootstrap required js to dest
gulp.task('js', function () {
    return gulp
        .src(js.in)
        .pipe(maps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(js.out));
});

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(maps.init())
        .pipe(sass(css.sassOpts))
        .pipe(cssnano())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(css.out));
});

gulp.task('html', ['nunjucks'], function()
{
	return gulp.src('src/*.html')
		.pipe(gulp.dest(dest));
});

// default task
gulp.task('default', ['sass', 'js', 'nunjucks', 'html'], function () {
     gulp.watch(css.watch, ['sass']);
     gulp.watch('src/**/*.nunjucks', ['nunjucks', 'html']);
});
