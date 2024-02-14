// Es importante leer este archivo con el package.json para entenderlo mejor.

// Funcionalidades para CSS:
const {src, dest, watch, parallel} = require('gulp'); // extraemos la funcionalidad de gulp que tenemos en node_modules.
                                                      // src: sirve para identificar un archivo (source);
                                                      // dest: sirve para guardarlo (destination);
                                                      // watch: para no tener que compilar manualmente todo el tiempo.
                                                      // parallel: para que varias funciones se ejecuten en simultaneo.
const sass = require('gulp-sass')(require('sass')); // importamos la funcionalidad de la dependencia sass y el plugin gulp-sass.
const plumber = require('gulp-plumber'); // importamos la funcionalidad del plugin plumber
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Funcionalidades para imagenes:
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Funcionalidades para JavaScript:
const terser = require('gulp-terser-js');


// Funciones:

function css(done) { // la nombramos css porque el paquete sass ya existe en package.json

    src('src/scss/**/*.scss')       // 1) Identificamos el archivo SASS con la funcion src; en este caso revisa recursivamente todos los .scss de la carpeta scss
        .pipe(sourcemaps.init())
        .pipe(plumber())            // este plugin sirve para que los errores no detenga todo el workflow.
        .pipe(sass())               // 2) Lo compilamos con la funcion sass que importamos de la dependencia;
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))    // 3) Lo almacenamos con la funcion dest().

    done(); // callback que avisa a gulp de que llegamos al final de la funcion.
}

function imagenes(done) { // para optimizar el tamaño de las imágenes

    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done()
}

function versionWebp(done) {
    
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done()
}

function versionAvif(done) {
    
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done()
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);


//
