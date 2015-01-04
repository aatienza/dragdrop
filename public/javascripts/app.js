'use strict';

/* App Module */

var app = angular.module('DragDrop', [
  'ngRoute',
  'DragDropControllers',
  'DragDropDirectives',
  'DragDropServices'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'editController'
      }).
      when('/live', {
        templateUrl: 'partials/live.html',
        controller: 'liveController'
      }).
      otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
}]);
