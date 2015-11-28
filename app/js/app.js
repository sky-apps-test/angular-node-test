var formApp = angular.module('formApp', [
  'ngRoute',
  'formControllers'
]);

formApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/sign-in', {
        templateUrl: 'templates/sign-in.html',
        controller: 'FormController'
    }).
    when('/sign-out', {
        templateUrl: 'templates/sign-out.html',
        controller: 'FormController'
    }).
    when('/authentications', {
        templateUrl: 'templates/authentications.html',
        controller: 'FormController'
    }).
    otherwise({
        redirectTo: '/sign-in'
    });
}]);
