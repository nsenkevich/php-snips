angular.module('snippetApp')
        .controller('userController', function($scope, snippetService, userService, $rootScope, $location) {
            $scope.currentPage = 1;

            $scope.setParameters = function(parameter, value) {
                $scope.parameters = {};
                $scope.parameters[parameter] = value;
            }

            $scope.getSnippets = function($parameters) {
                snippetService.showAll($parameters,
                        function(snippetsHal) {
                            var snippets = [];
                            angular.forEach(snippetsHal, function(res) {
                                angular.forEach(res.snippets, function(snippet) {
                                    snippets.push(snippet);
                                });
                            });
                            $scope.total_items = snippetsHal.total_items;
                            $scope.page_size = snippetsHal.page_size;
                            $scope.page_count = snippetsHal.page_count;
                            $scope.snippets = snippets;
                            if (!$scope.total_items) {
                                $rootScope.$broadcast('success-message', 'Someone\'s been lazy :) No snipps yet.');
                            }
                        },
                        function(error) {
                            $location.path('/login');
                        });
            }

            $scope.getSnippetsByPage = function(pageNo) {
                $scope.setParameters('page', pageNo);
                userService.getUser()
                        .success(function(data) {
                            $scope.user = data.userId;
                            if ($location.path() === '/favorites') {
                                $scope.setParameters('favorites', $scope.user);
                            } else {
                                $scope.setParameters('user', $scope.user);
                            }
                            $scope.getSnippets($scope.parameters);
                        }).error(function(error) {
                    $location.path('/login');
                });
            }

            $scope.getSnippetsByPage($scope.currentPage);

            $scope.deleteSnippet = function(snippet) {
                snippetService.delete({id: snippet.id},
                function(success) {
                    $scope.snippets.splice(snippet, 1);
                    $rootScope.$broadcast('success-message', 'Snippet has been successfully removed');
                });
            }

        });