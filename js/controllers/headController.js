angular.module('snippetApp')
        .controller('headController', function($scope, $location, $cookies) {
            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };

            $scope.isLogin = function() {
                return $cookies.token;
            };
        });