var gulp = require('gulp'); 
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');

// Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

//baseDir="./";


gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server: {
            baseDir: './',
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});

gulp.task('default', ['browser-sync']);



