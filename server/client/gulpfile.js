var gulp   = require('gulp');
var concat = require('gulp-concat');
var babel  = require('gulp-babel');


gulp.task('concat-css', function(){
     let base = 'assets/css/';
     
     return gulp.src([

           base + 'normalize.css',
           base + 'crypto-track.css'
     ])
     .pipe(concat('crypto-track.css'))
     .pipe(gulp.dest(base))
  c
})

gulp.task('concat', function(){
     let base = 'src/CryptoTrack/';
     return gulp.src([ 
          
          base + 'Main/Main.js',  
          base + 'Main/Controllers/MainController.js',  
          base + 'Main/Services/ConfigureRequestService.js',  
          base + 'Main/Models/GetListingModel.js',  
          base + 'Main/Services/GetCryptoListingService.js',  
          base + 'Main/Directives/CryptoData.js',  
 
          base + 'CryptoTrack.js'
     ])
     .pipe(concat('CryptoTrackApp.js'))
     .pipe(babel())                                         // Transpile
     .pipe(gulp.dest('assets/js/')) 
})


gulp.task('build', [
          'concat-css', 
          'concat',
]);  // concats js , then concats css into 1 file


