app.factory('httpInterceptor', ['$q', '$rootScope', '$location', '$cookieStore', '$injector',
    function($q, $rootScope, $location, $cookieStore, $injector) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                ;

                $rootScope.$broadcast('loading-started');
                return config || $q.when(config);
            },
            requestError: function(request) {
                return $q.reject(request);
            },
            response: function(response) {
                $rootScope.$broadcast('loading-complete');
                return response || $q.when(response);
            },
            responseError: function(response) {
                var message = response.data.detail;
                switch (response.status) {
                    case 400:
                        $rootScope.$broadcast('error-message', message);

//                  if(errorResponse.data.errors.length > 0) {
//                    for(var i=0; i<errorResponse.data.errors.length; i++) {
//                      showMessage(errorResponse.data.errors[i], 
//                        'xx-http-error-validation-message', 6000);
//                    }
//                  }
                        break;
                    case 401:
                        //user Not authorised
                        $rootScope.$broadcast('error-message', 'Please login to acess your account.');
                        $location.url('/login');
                        $cookieStore.remove('token');
                        break;
                    case 403:
                        //user loged in trying update/remove not related resources 
                        $rootScope.$broadcast('error-message', message);
                        $location.url('/dashboard');
                        break;
                    case 404:
                        $location.url('/404');
                        $rootScope.$broadcast('error-message', message);
                        break;
                    case 406:
                        $rootScope.$broadcast('error-message', message);
                        break;
                    case 422:
                        $rootScope.$broadcast('info-message', message);
                        break;
                    case 500:
                        $rootScope.$broadcast('error-message', message);
                        break;
                    default:
                        $rootScope.$broadcast('error-message', message);
                }
                $rootScope.$broadcast('loading-complete');
                return $q.reject(response);
            }
        };
    }]);

// this will display the message if there was a http return status
app.directive('loadingIndicator', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$on("loading-started", function(e) {
                element.css({"display": ""});
            });
            scope.$on("loading-complete", function(e) {
                element.css({"display": "none"});
            });
        }
    };
});

app.directive("httpErrorMessages", function() {
    var showMessage = function(element, content, cl, time) {
        element
                .addClass(cl)
                .fadeIn('fast')
                .delay(time)
                .fadeOut('fast', function() {
                    $(this).hide();
                })
                .text(content);
    };
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$on("error-message", function(e, message) {
                showMessage(element, message, 'alert alert-danger', 6000);
            });
            scope.$on("success-message", function(e, message) {
                showMessage(element, message, 'alert alert-success', 6000);
            });
            scope.$on("info-message", function(e, message) {
                showMessage(element, message, 'alert alert-info', 6000);
            });
        }
    };
});