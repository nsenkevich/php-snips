'use strict';

angular.module('authService', [])
        .constant("baseUrl", "http://api.php-snips.com")
        .factory('authService', function($http, $cookies, $cookieStore, baseUrl) {
            return {
                login: function(credentials) {
                    return $http.post(baseUrl + '/oauth', credentials);
                },
                register: function(details) {
                    return $http.post(baseUrl + '/users', details);
                },
                logout: function() {
                    $cookieStore.remove('token');
                },
                storeToken: function(token) {
                    $cookieStore.put('token', token);
                },
                isLoggedIn: function()
                {
                    return $http.get(baseUrl + '/oauth/resource');
                },
                isLoggedInToken: function()
                {
                    return $cookieStore.get('token') != null;
                }
            };
        });

