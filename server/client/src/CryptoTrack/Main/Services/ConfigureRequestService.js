angular.module('CryptoTrack.Main')
.service('ConfigureRequestService', function(){

      this.cryptoOptions = function(endpoint){
         return {
            method: "GET",
            url:"/"+ endpoint
         }
      }

 })
