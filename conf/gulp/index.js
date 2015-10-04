var gulp = require('gulp');


var $ = require('gulp-load-plugins')();


var browserSync = require('browser-sync');
var reload = browserSync.reload


var autoprefixer = require('autoprefixer-core');
var bower = require('main-bower-files');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;





var THEME_PATH = 'src/www/content/themes/cied-twentyfifteen';
var DIST_THEME_PATH = 'dist/content/themes/cied-twentyfifteen';


var DEV_URL = 'cied.georgetown.dev';





var AUTOPREFIXER_BROWSERS = [
 'ie >= 8',
 'ff >= 29',
 'chrome >= 34',
 'safari >= 7',
 'opera >= 23',
 'ios >= 7',
 'android >= 4.4',
 'bb >= 10'
];


var IMAGEMIN_PREFS = {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true,
    svgoPlugins: [
      { cleanupAttrs: true },
      { cleanupEnableBackground: true },
      { cleanupIDs: true },
      { cleanupNumericValues: true },
      { collapseGroups: false },
      { convertColors: false },
      { convertPathData: false },
      { convertShapeToPath: false },
      { convertStyleToAttrs: false },
      { convertTransform: false },
      { mergePaths: false },
      { moveElemsAttrsToGroup: false },
      { moveGroupAttrsToElems: false },
      { removeComments: true },
      { removeDesc: true },
      { removeDoctype: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeEmptyContainers: false },
      { removeEmptyText: true },
      { removeHiddenElems: true },
      { removeMetadata: true },
      { removeNonInheritableGroupAttrs: false },
      { removeRasterImages: true },
      { removeTitle: true },
      { removeUnknownsAndDefaults: false },
      { removeUnusedNS: true },
      { removeUselessStrokeAndFill: true },
      { removeViewBox: true },
      { removeXMLProcInst: true },
      { sortAttrs: true },
      { transformsWithOnePath: true },
    ],
};


var INLINE_OPTIONS = {
    rootpath: path.resolve('./src/www')
};


var MINIFY_OPTIONS = {comments:true,spare:true};


var PLUMBER_OPTIONS = {
  errorHandler: true
};


var REVALL_OPTIONS = {
  base: ['dist', 'src/www/components'],
  ignore: [
    /^\/favicon.ico$/g,
    '.html',
    '.php',
    '.twig',
  ],
};





gulp.task('build', ['clean'], function (done) {
  runSequence(['extras', 'extras:theme', 'images:dist', 'fonts'], 'html', 'rev', done);
});


gulp.task('clean', function (done) {
  del([
    'dist/index.php',
    'dist/content/**',
    'dist/wp/**'
  ], done);
});


gulp.task('default', ['serve']);


gulp.task('extras', function () {
  return gulp.src([
    'src/www/**/*.*',
    '!src/www/*-config.php',
    '!src/www/wp/wp-content/themes',
    '!src/www/components/**',
    '!src/www/content/themes/**',
    '!src/www/content/uploads',
  ], {
    dot: true
  })
  .pipe($.size({title: 'extras'}))
  .pipe(gulp.dest('dist'));
});

gulp.task('extras:theme', function () {
  return gulp.src([
    THEME_PATH + '/style.css',
    THEME_PATH + '/screenshot.png'
  ], {
    dot: true
  }).pipe(gulp.dest(DIST_THEME_PATH));
});


gulp.task('fonts', function () {
    gulp.src(bower())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(DIST_THEME_PATH + '/fonts'))

    gulp.src(THEME_PATH + '/fonts/**')
      .pipe(gulp.dest(DIST_THEME_PATH + '/fonts'))
});


gulp.task('html', ['styles', 'jshint'], function () {

  var assets = $.useref.assets({searchPath: [
    'src/www/',
    './',
  ]});
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var htmlFilter = $.filter('**/*.{php,twig}');

  return gulp.src(THEME_PATH + '/**/*.{php,twig}')
    .pipe($.inlineSource(INLINE_OPTIONS))
    .pipe(assets)
    .pipe(jsFilter)
      .pipe($.uglify())
      .pipe(jsFilter.restore())
    .pipe(cssFilter)
      .pipe($.combineMediaQueries({log: true }))
      .pipe($.csso())
      .pipe($.size({title: 'styles gzipped', gzip: true}))
      .pipe(cssFilter.restore())
    .pipe(gulp.dest('dist'))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(htmlFilter)
      .pipe(gulp.dest(DIST_THEME_PATH + '/'))
      .pipe($.size({title: 'html', gzip: true}))
      .pipe(htmlFilter.restore())
});


gulp.task('images', function () {
  return gulp.src('src/images/**/*.*')
    .pipe(gulp.dest(THEME_PATH + '/images'))
    .pipe($.size({title: 'images', gzip: true}))
});


gulp.task('images:dist', function () {
    return gulp.src(['src/images/**/*'])
        .pipe($.plumber())
        .pipe($.cache($.imagemin(IMAGEMIN_PREFS)))
        .pipe(gulp.dest( DIST_THEME_PATH + '/images/'))
        .pipe($.size({title: 'images:dist', gzip: true}));
});


gulp.task('jshint', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('src/www/content/themes/cied-twentyfifteen/scripts'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


gulp.task('rev', function () {
  return gulp.src(DIST_THEME_PATH + '/**')
    .pipe($.revAll(REVALL_OPTIONS))

    .pipe(gulp.dest(DIST_THEME_PATH));
});


gulp.task('serve', ['styles', 'jshint'], function () {
  browserSync({
      proxy: DEV_URL
  });

  gulp.watch([
      'src/www/content/themes/cied-twentyfifteen/**/*.{twig,php}',
      'src/www/content/themes/cied-twentyfifteen/images/**/*',
      'src/www/content/themes/cied-twentyfifteen/scripts/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**', ['jshint']);
    gulp.watch('./src/images/*', ['images', reload]);
    gulp.watch('bower.json', ['wiredep']);
});


gulp.task('styles', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      onError: console.error.bind(console, 'Sass error:')}))
    .pipe($.postcss([ autoprefixer(AUTOPREFIXER_BROWSERS) ]))
    .pipe($.sourcemaps.write('./map'))
    .pipe(gulp.dest(THEME_PATH + '/css'))
    .pipe($.filter('**/*.css'))
    .pipe($.size({title: 'CSS', gzip: true}))
    .pipe(reload({stream: true}))
});


gulp.task('wiredep', function () {
  gulp.src('src/sass/*.scss')
    .pipe(wiredep({
      directory: 'src/www/components',
    }))
    .pipe(gulp.dest('src/sass'));

  gulp.src('src/www/content/themes/cied-twentyfifteen/views/__base.twig')
    .pipe(wiredep({
      directory: 'src/www/components',
      ignorePath: '../../../..',
      overrides: {
        "normalize.css": {
          "main": "normalize.css"
        },
        "waypoints": {
          "main": [
            "lib/jquery.waypoints.js",
            "lib/shortcuts/sticky.js"
          ]
        }
      }
    }))
    .pipe(gulp.dest('src/www/content/themes/cied-twentyfifteen/views/'));

});
