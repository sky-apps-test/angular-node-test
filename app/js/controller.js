var skyTestAppControllers = angular.module('skyTestAppControllers', []);

skyTestAppControllers.controller('FormController', [
    '$scope',
    '$http',
    '$location',
    '$cookies',
    'formDataSerializer',
    function ($scope, $http, $location, $cookies, formDataSerializer) {
        $scope.formData = {};

        $scope.processForm = function() {
            $http({
                method  : 'POST',
                url     : 'http://localhost:8080/api/authenticate',
                transformRequest: formDataSerializer,
                data    : this.formData,
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function(data) {
                $cookies.put('token', data.token);

                $location.path('/authentications');
            })
            .error(function(error) {
                alert(error.message);
            });
        };
    }
]);

skyTestAppControllers.controller('AuthenticationsController', [
    '$scope',
    '$http',
    '$cookies',
    function ($scope, $http, $cookies) {
        $http({
            method  : 'GET',
            url     : 'http://localhost:8080/api/authentications',
            headers: {
                'x-access-token': $cookies.get('token')
            }
        })
        .success(function(data) {
            $scope.authentications = data;
        })
    }
]);

skyTestAppControllers.controller('LinksController', [
    '$scope',
    '$cookies',
    function ($scope, $cookies) {
        $scope.signOut = function () {
            $cookies.remove('token');
        };
    }
]);
