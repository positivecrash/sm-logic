//load plugins
var gulp             = require('gulp'),
  merge            = require('merge-stream'),
	compass          = require('gulp-compass'),
	autoprefixer     = require('gulp-autoprefixer'),
	minifycss        = require('gulp-minify-css'),
	uglify           = require('gulp-uglify'),
	rename           = require('gulp-rename'),
	concat           = require('gulp-concat'),
	jade             = require('gulp-jade'),
  iconfont         = require('gulp-iconfont'),
  iconfontCss      = require('gulp-iconfont-css'),
	livereload       = require('gulp-livereload'),
	svgSprite        = require("gulp-svg-sprite"),
	svg2png          = require('gulp-svg2png'),
	svgo             = require('imagemin-svgo'),
	ttf2eot          = require('gulp-ttf2eot'),
	ttf2woff         = require('gulp-ttf2woff');


var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'CustomIcons';

//styles
gulp.task('styles', function() {
	return gulp.src(['app/styles/*.scss'])
		.pipe(compass({
			// project: 'dist/assets',
			css: 'dist/assets/css',
			sass: 'app/styles/',
			image: 'dist/assets/i',
			font: 'dist/assets/fonts'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/assets/css'))
    // .pipe(rgbapng())
    // .pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss({
      compatibility: 'ie8',
      aggressiveMerging: false
    }))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(livereload());
});

//scripts
gulp.task('scripts', function() {
	return gulp.src(['app/scripts/plugins/*.js', 'app/scripts/app.js'])
		.pipe(concat('smlogic.js'))
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(livereload());
});

//templates
gulp.task('templates', function() {
  return gulp.src('app/pages/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

//iconfonts
gulp.task('iconfont', function(){
  gulp.src(['app/fonticons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      fontPath: '../fonts/',
      path: 'app/styles/templates/iconsTemplate.scss',
      targetPath: '../../../app/styles/utilities/icons.scss'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      appendUnicode: true,
      fontHeight: 1001,
      // timestamp: runTimestamp,
      // appendCodepoints: true,
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2']
     }))
    .pipe(gulp.dest('dist/assets/fonts'));
    // .pipe(livereload());
});


//svg and png sprites
gulp.task('svgSprite', function () {

  gulp.src('app/spritesrc/basic/*.svg')
    .pipe(svgo()())
    .pipe(svgSprite({
        "mode": {
            "css": {
                "spacing": {
                    "padding": 2
                },
                "dest": "./",
                "layout": "vertical",
                "sprite": "sprite.svg",
                "bust": false,
                "render": {
                    "scss": {
                        "dest": "../../../app/styles/utilities/sprite.scss",
                        "template": "app/styles/templates/sprite-template.scss"
                    }
                }
            }
        }
    }))
    .pipe(gulp.dest('dist/assets/i'));

  // return merge(basic);

});


gulp.task('pngSprite', ['svgSprite'], function() {
  gulp.src('dist/assets/i/sprite.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('dist/assets/i'));

  // return merge(basic);
});

gulp.task('sprite', ['pngSprite']);

//fonts generate
gulp.task('fonts', function(){
  gulp.src(['dist/assets/fonts/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest('dist/assets/fonts/'));

  gulp.src(['dist/assets/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('dist/assets/fonts/'));

});


//watch
gulp.task('live', function() {
	livereload.listen();

	//watch .scss files
	gulp.watch('app/styles/**/*.scss', ['styles']);

	//watch .js files
	gulp.watch('app/scripts/**/*.js', ['scripts']);

	//watch .jade files
	gulp.watch('app/pages/**/*.jade', ['templates']);

	//svg and png sprites
  gulp.watch(['app/spritesrc/basic/*.svg'], ['sprite']);

  //watch font icon files
  gulp.watch('app/fonticons/*.svg', ['iconfont']);

	//font generate if ttf changes
	gulp.watch('dist/assets/fonts/*.ttf', ['fonts']);
});


//default
gulp.task('default', ['scripts', 'styles', 'templates', 'sprite', 'iconfont', 'fonts', 'live']);
