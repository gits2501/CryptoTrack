"use strict";

angular.module('CryptoTrack.Main', []);
angular.module('CryptoTrack.Main').controller('MainController', function () {
  var mainCtrl = this;
  mainCtrl.test = "Data from MainCtrl";
});
var portfolio = angular.module('CryptoTrack', ['ngAnimate', 'ngRoute', 'ngMessages', 'CryptoTrack.Main']);
portfolio.config(function ($routeProvider) {
  $routeProvider.when('/', {
    // root will point to page with full page cude animation
    templateUrl: 'client/src/CryptoTrack/Main/tmpl/cryptoTrack.html',
    controller: 'MainController',
    controllerAs: 'main'
  });
});