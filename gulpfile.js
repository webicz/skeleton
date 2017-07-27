// Include gulp
var gulp = require('gulp');

// Include plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');

var onError = function (err) {
  gutil.beep();
  console.log(err.toString());
  this.emit('end');
};

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// General styles
gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS({
                rebase: false
            })
        )
        .pipe(rename('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

// Creation of the sprite image
gulp.task('sprite', function(){
    var spriteData = gulp.src('src/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss'
        })
    );

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest('src/sass/general'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream)
        .pipe(browserSync.reload({
          stream: true
        }));
});

// Bootstrap
gulp.task('bootstrap_sass', function(){
    var bootstrap = gulp.src('src/sass/libs/bootstrap-sass/bootstrap.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename('bootstrap.css'))
        .pipe(gulp.dest('dist/libs/bootstrap-sass/css/'));

    var bootstrapTheme = gulp.src('src/sass/libs/bootstrap-sass/bootstrap-theme.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename('bootstrap-theme.css'))
        .pipe(gulp.dest('dist/libs/bootstrap-sass/css/'));

    // Return a merged stream to handle both `end` events
    return merge(bootstrap, bootstrapTheme)
        .pipe(browserSync.stream());
});

gulp.task("bootstrap_js", function(){
    var path = 'src/libs/bootstrap-sass/assets/javascripts/bootstrap/';
    var modules = [
        //path + 'transition.js',
        //path + 'alert.js',
        //path + 'button.js',
        //path + 'carousel.js',
        //path + 'collapse.js',
        //path + 'dropdown.js',
        //path + 'modal.js',
        //path + 'tooltip.js',
        //path + 'popover.js',
        //path + 'scrollspy.js',
        //path + 'tab.js',
        //path + 'affix.js'
    ];

    if(modules.length > 0)
    {
        return gulp.src(modules)
            .pipe(concat('bootstrap.js'))
            .pipe(gulp.dest('dist/libs/bootstrap-sass/js/'));
    }
    else
    {
        return gulp.src('dist/libs/bootstrap-sass/js/bootstrap.js', {read: false})
            .pipe(clean());
    }
});

gulp.task('bootstrap', ['bootstrap_sass','bootstrap_js']);

gulp.task('watch', ['browserSync', 'sprite', 'sass'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/sprite/**/*.png', ['sprite', 'sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);

    // Bootstrap custom watch task
    gulp.watch('src/sass/libs/**/*.scss', ['bootstrap_sass']);
});

// Default task
gulp.task('default', ['bootstrap', 'watch']);