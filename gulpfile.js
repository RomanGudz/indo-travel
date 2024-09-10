import gulp from 'gulp';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass'
import cssimport from 'gulp-cssimport';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import htmlMin from 'gulp-htmlmin';
import cssClean from 'gulp-clean-css';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import souresMaps from 'gulp-sourcemaps';
import gulpImage from 'gulp-image';
import gulpAvif from 'gulp-avif';
import gulpWebp from 'gulp-webp';
import { stream as critical } from 'critical';
import gulpIf from 'gulp-if'
import auotoPrefix from 'gulp-autoprefixer';
import gulpBabel from 'gulp-babel';

const prepros = true;
let dev = false;
const sass = gulpSass(sassPkg);
const allJS = ['./src/js/script/jquery-3.7.1.min.js',
  // './src/js/script/jquery-ui.min.js',
  './src/js/script/swiper-bundle.min.js',
]

export const html = () => gulp
  .src('src/*.html')
  .pipe(htmlMin({
    removeComments: true,
    collapseWhitespace: true,
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());


export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(gulpIf(dev, souresMaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(auotoPrefix())
      .pipe(cssClean({
        2: { specialComments: 0 }
      }))
      .pipe(gulpIf(dev, souresMaps.write('../maps')))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream())
  }

  return gulp
    .src('src/scss/index.css')
    .pipe(gulpIf(dev, souresMaps.init()))
    .pipe(cssimport({
      extensions: ['css'],
    }))
    .pipe(auotoPrefix())
    .pipe(cssClean({
      2: { specialComments: 0 }
    }))
    .pipe(gulpIf(dev, souresMaps.write('../maps')))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

export const js = () => gulp
  .src([...allJS, 'src/js/**/*.js'])
  .pipe(gulpIf(dev, souresMaps.init()))
  .pipe(gulpBabel({
    presets: ['@babel/preset-env'],
    ignore: [...allJS]
  }))
  .pipe(terser())
  .pipe(concat('index.min.js'))
  .pipe(gulpIf(dev, souresMaps.write('../maps')))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/img/**/*.{jpg,jpeg,svg,png}')
  .pipe(gulpIf(!dev, gulpImage({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: true
  })))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const webp = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png}')
  .pipe(gulpWebp())
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const avif = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png}')
  .pipe(gulpAvif())
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const criticalCss = () => gulp
  .src('dist/*.html')
  .pipe(critical({
    base: 'dist/',
    inline: true,
    css: ['dist/css/index.css']
  }))
  .on('error', err => {
    console.error(err.message)
  })
  .pipe(gulp.dest('dist'))

export const copy = () => gulp
  .src('src/fonts/**/*', {
    base: 'src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true
  }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/scss/**/*.css', style);
  gulp.watch('src/img/**/*.{jpg,jpeg,svg,png}', img);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./src/fonts/**/*', copy);
  gulp.watch('src/img/**/*.{jpg,jpeg,png}', webp);
  gulp.watch('src/img/**/*.{jpg,jpeg,png}', avif);
};

export const clear = (done) => {

  deleteAsync(['dist'], {
    force: true,
  });
  done();
};

export const devepol = async () => {
  dev = true;
}

export const base = gulp.parallel(html, style, img, webp, avif, copy, js);

export const build = gulp.series(base, criticalCss);

export default gulp.series(devepol, base, server);