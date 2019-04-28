var cryptoTrack = angular.module('CryptoTrack', [
    'ngAnimate',
    'ngRoute',
    'ngMessages',
    'CryptoTrack.Main',
])

CryptoTrack.config(function($routeProvider){
   
      $routeProvider
        .when('/', {  

           templateUrl:  'client/src/CryptoTrack/Main/tmpl/cryptoTrack.html',
           controller:   'MainController',
           controllerAs: 'main'
        })
})
