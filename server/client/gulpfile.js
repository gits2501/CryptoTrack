var gulp   = require('gulp');
var concat = require('gulp-concat');
var babel  = require('gulp-babel');


gulp.task('concat-js', function(){
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

gulp.task('concat-css', function(){
     var base = 'assets/css/';
     
     return gulp.src([

           base + 'normalize.css',
           base + 'crypto-track.css'
     ])
     .pipe(concat('crypto-track.css'))
     .pipe(gulp.dest(base))
})

gulp.task('build', [
          'concat-js', 
          'concat-css',
]);  // concats js , then concats css into 2 files


