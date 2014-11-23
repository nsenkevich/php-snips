angular.module('snippetApp')
        .controller('logoutController', function($scope, $location, authService) {
            authService.logout();
            $location.path('/login');
        })
        .controller('authController', function($scope, $location, $cookieStore, authService) {

            $scope.login = function(user, pass) {
                authService.login({
                    grant_type: "password",
                    client_id: "testclient2",
                    username: user,
                    password: pass
                }).success(function(data) {
                    authService.storeToken(data.access_token);
                    $location.path('/dashboard');
                }).error(function(error) {
                    $location.path('/login');
                });
            };

            $scope.register = function(user, pass, email) {
                authService.register({
                    username: user,
                    password: pass,
                    email: email
                }).success(function(data) {
                    $scope.login(user, pass);
                }).error(function(error) {
                    $location.path('/signup');
                });
            };

            $scope.isLoggedIn = function()
            {
                return authService.isLoggedInToken();
            }

        });