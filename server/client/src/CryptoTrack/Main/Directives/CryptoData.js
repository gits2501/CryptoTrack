angular.module('CryptoTrack.Main')
 .directive('cryptodata', function(GetListingModel){

     let linker = function(scope, elem, attrs){
         // 1 display loader       
         // 2 get data from server
         // 3 remove loader
         // 4 display data from server into table

         let cryptoTrack = elem; 
         let cryptoListing;
     console.log("IN DIREcTIve") 
         GetListingModel()
         .then(function(cryptoListing){
              console.log('Directive Listing') 
          },)
         

     }
   
     return {
        restrict: 'A',
        link: linker
     }

 }):
