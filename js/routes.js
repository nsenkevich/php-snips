app.config(
        function($routeProvider, $httpProvider) {

            $httpProvider.interceptors.push('httpInterceptor');

            $routeProvider
                    .when('/about', {
                        templateUrl: 'partials/about.html'
                    })
                    .when('/', {
                        templateUrl: 'partials/snippets.html', controller: 'snippetListController'
                    })

                    .when('/dashboard', {
                        templateUrl: 'partials/dashboard.html', controller: 'userController',
                        resolve: {'auth': function(authService) {
                                return authService.isLoggedIn()
                            }}
                    })

                    .when('/favorites', {
                        templateUrl: 'partials/favorites.html', controller: 'userController',
                        resolve: {'auth': function(authService) {
                                return authService.isLoggedIn()
                            }}
                    })

                    .when('/create', {
                        templateUrl: 'partials/create.html', controller: 'snippetController',
                        resolve: {'auth': function(authService) {
                                return authService.isLoggedIn()
                            }}
                    })

                    .when('/update/:id', {
                        templateUrl: 'partials/update.html', controller: 'snippetController',
                        resolve: {'auth': function(authService) {
                                return authService.isLoggedIn()
                            }}
                    })

                    .when('/snippets/:id', {
                        templateUrl: 'partials/snippet.html', controller: 'snippetController'
                    })

                    .when('/login', {
                        templateUrl: 'partials/login.html', controller: 'authController',
                    })
                    .when('/signup', {
                        templateUrl: 'partials/signup.html', controller: 'authController',
                    })
                    .when('/logout', {
                        templateUrl: 'partials/login.html', controller: 'logoutController'
                    })

                    .when('/404', {
                        templateUrl: 'partials/404.html'
                    })
            $routeProvider.otherwise({
                redirectTo: '/login'
            });

            /* CORS... */
            /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        });