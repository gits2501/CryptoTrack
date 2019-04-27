var gulp   = require('gulp');
var concat = require('gulp-concat');
var babel  = require('gulp-babel');


gulp.task('concat', function(){
     var base = 'src/CryptoTrack/'
     return gulp.src([ 
          
          base + 'Main/Main.js',  
          base + 'Main/Controllers/MainController.js',  
 
          base + 'CryptoTrack.js'
     ])
     .pipe(concat('CryptoTrackApp.js'))
     .pipe(babel())                                         // Transpile
     .pipe(gulp.dest('assets/js')) 
})
