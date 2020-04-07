/*
 |--------------------------------------------------------------------------
 | Setup and requires
 |--------------------------------------------------------------------------
 |
 | We're loading laravel mix here, and plugins for tailwindcss,
 | purgecss, and imagemin.
 |
*/

const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-tailwind');
require('laravel-mix-purgecss');
require('laravel-mix-imagemin');

/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 |
 | We're setting our paths for src and dist here. You can configure
 | whitelist patterns for PurgeCSS as needed.
 |
*/

const srcPath = 'src';
const publicPath = 'web';
const distFolder = 'dist';
const distPath = path.join(publicPath, distFolder);

// This is the only line you'll likely need to change.
const purgeCssWhitelistPatterns = []

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. We are compiling the Sass and JS,
 | running image optimizations, and versioning assets.
 |
 */

 /*
 |--------------------------------------------------------------------------
 | Set Mix Public Path
 |--------------------------------------------------------------------------
*/

mix.setPublicPath(distPath).setResourceRoot(`/${distFolder}/`);

 /*
 |--------------------------------------------------------------------------
 | Build Javascript
 |--------------------------------------------------------------------------
*/

mix.js(path.join(srcPath, 'js/main.js'), 'js');

/*
 |--------------------------------------------------------------------------
 | Build Styles
 |--------------------------------------------------------------------------
*/

mix
    .sass(path.join(srcPath, 'scss/main.scss'), 'css')
    .sourceMaps(true)
    .tailwind('./tailwind.config.js');

/*
 |--------------------------------------------------------------------------
 | Image Optimizations
 |--------------------------------------------------------------------------
*/

mix.imagemin(
        {
            context: path.join(srcPath, 'images'),
            from: '*',
            to: 'images',
        },
        {
            optipng:{
                optimizationLevel: 5
            },
            jpegtran: null,
            plugins: [
                require('imagemin-mozjpeg')({
                    quality: 100,
                    progressive: true,
                }),
            ]
        }
    )

/*
 |--------------------------------------------------------------------------
 | Copy Fonts and Icons
 |--------------------------------------------------------------------------
*/

// mix
//     .copy(path.join(srcPath, 'icons'), path.join(distPath, 'icons'))
//     .copy(path.join(srcPath, 'fonts'), path.join(distPath, 'fonts'));

/*
 |--------------------------------------------------------------------------
 | Hot Module Replacement Setup
 |--------------------------------------------------------------------------
*/

mix.options({
    hmrOptions: {
        host: process.env.VIRTUAL_HOST,  // site's host name
        port: 443,
    }
});

mix.webpackConfig({
    // add any webpack dev server config here
    devServer: {
        public: process.env.VIRTUAL_HOST
    }
});

/*
 |--------------------------------------------------------------------------
 | Run PurgeCSS and version files if we are in production mode
 |--------------------------------------------------------------------------
*/

if (mix.inProduction()) {
    mix.version();

    mix.purgeCss({
        enabled: true,
        content: ['src/**/*.vue', 'src/**/*.css', 'src/**/*.scss', 'src/**/*.pcss', 'templates/**/*.twig'],
        extensions: ['twig', 'html', 'js', 'php', 'vue'],
        extractor: class TailwindExtractor {
            static extract(content) {
            return content.match(/[\w-/:]+(?<!:)/g) || [];
            }
        },
        whitelist: purgeCssWhitelistPatterns
    });
}