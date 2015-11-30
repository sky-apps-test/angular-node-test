var skyAppTest = angular.module('skyAppTest', [
  'ngRoute',
  'ngCookies',
  'skyTestAppControllers'
]);

skyAppTest.config(['$routeProvider', function($routeProvider) {
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
        controller: 'AuthenticationsController'
    }).
    otherwise({
        redirectTo: '/sign-in'
    });
}]);
