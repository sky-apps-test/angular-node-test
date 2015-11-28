var formControllers = angular.module('formControllers', []);

formControllers.controller('FormController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.processForm = function() {
            $http({
                method  : 'POST',
                url     : 'http://localhost:8080/api/authenticate',
                data    : '',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                console.log(data);

                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                    $scope.errorSuperhero = data.errors.superheroAlias;
                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
            });
        };
        // $http.get('http://localhost:8080/api/authenticate').success(function(data) {
        //     $scope.phones = data;
        // });
        //
        // $scope.orderProp = 'age';
    }
]);
