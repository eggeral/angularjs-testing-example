'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lights', {templateUrl: 'partials/lights.html', controller: 'LightsController'});
  $routeProvider.when('/cams', {templateUrl: 'partials/cams.html', controller: 'CamsController'});
  $routeProvider.otherwise({redirectTo: '/lights'});
}]);
