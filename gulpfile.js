var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");

// Compile sass into CSS & auto-inject into browsers
gulp.task("style", function(err) {
  var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);
    this.emit("end");
};
    return gulp.src("app/sass/style.scss")
      .pipe(plumber({errorHandler: onError}))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({
          browsers: ["last 2 versions", "> 2%"],
          cascade: false
        })
      ]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.stream());
});

// Static Server + watching sass/html/img/js files
gulp.task("serve", ["style"], function() {

    browserSync.init(null, {
      proxy: "3-goodfood"
    });

    gulp.watch("app/**/*.scss", ["style"]);
    gulp.watch("app/*.html").on("change", browserSync.reload);
    gulp.watch("app/img/**/*.{png,jpg,gif,svg}").on("change", browserSync.reload);
    gulp.watch("app/js/**/*.js").on("change", browserSync.reload);
});

// Default: turn the server on and refresh/inject on change!
gulp.task("default", ["serve"]);

// Copy
gulp.task("copy", function() {
  return gulp.src([
    "app/fonts/**/*.{woff,woff2}",
    "app/img/**",
    "app/js/**",
    "app/bower/**",
    "app/*.html"
  ], {
    base: "./app"
  })
  .pipe(gulp.dest("dist"));
});

// Production compile scss
gulp.task("style-dist", function() {
  gulp.src("app/sass/style.scss")
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ["last 2 versions", "> 2%"],
        cascade: false
      })
    ]))
    .pipe(gulp.dest("dist/css"));
});

// Production Server
gulp.task("serve-dist", function() {
  browserSync.init(null, {
    server: "dist"
  });
});

// Clean dist folder
gulp.task("clean", function() {
  return del("dist");
});

// Build
gulp.task("build", function(fn) {
  run("clean", "copy", "style-dist", "serve-dist", fn);
});
