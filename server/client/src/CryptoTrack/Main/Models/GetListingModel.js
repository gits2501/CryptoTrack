angular.module('CryptoTrack.Main')
 .factory('GetListingModel', function($http, ConfigureRequestService){


     return function getListing(){

          return $http(ConfigureRequestService.cryptoOptions('listing'))
                  .then(function success(cryptoData){
                       console.log('CryptoListing: ', cryptoData)
                   })
                   .catch(function failure(err){
                       console.log('getListing failed: ', err)
                   })
                 

     }

  })
