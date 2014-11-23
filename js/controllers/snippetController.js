angular.module('snippetApp')

        .controller('snippetListController', function($scope, snippetService) {
            $scope.currentPage = 1;

            $scope.getSnippetsByPage = function(pageNo) {
                $parameters = {page: pageNo};
                if ($scope.category) {
                    $parameters.category = $scope.category;
                }
                if ($scope.tag) {
                    $parameters.tag = $scope.tag;
                }
                if ($scope.user) {
                    $parameters.user = $scope.user;
                }

                $scope.getSnippets($parameters);
            }

            $scope.getSnippetsByCategory = function(category) {
                $scope.category = category;
                $scope.tag = 0;
                $scope.user = 0;
                $scope.getSnippets({category: category});
            }

            $scope.getSnippetsByTag = function(tag) {
                $scope.tag = tag;
                $scope.category = 0;
                $scope.user = 0;
                $scope.getSnippets({tag: tag});
            }

            $scope.getSnippetsByUser = function(userId) {
                $scope.tag = 0;
                $scope.category = 0;
                $scope.user = userId;
                $scope.getSnippets({user: userId});
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
                        },
                        function(error) {
                            $location.path('/login');
                        });
            }

            $scope.getSnippetsByPage($scope.currentPage);
        })

        .controller('snippetController', function($scope, snippetService, categoryService, tagService, $location, $routeParams, $rootScope) {

            $scope.getError = function(error) {
                if (typeof error != 'undefined') {
                    if (error.required) {
                        return 'Please enter a value';
                    } else if (error.isEmpty) {
                        return error.isEmpty;
                    } else if (error.maxlength) {
                        return 'Provided value to long.';
                    } else if (error.minlength) {
                        return 'Provided value to short.';
                    }
                }
            }

            $scope.createSnippet = function(newSnippet) {

                var selectedCategories = [];
                angular.forEach(newSnippet.categories, function(selectedCategory) {
                    angular.forEach($scope.loadCategories, function(listedCategory) {
                        if (listedCategory.category === selectedCategory) {
                            selectedCategories.push(listedCategory);
                        }
                    });
                });

                newSnippet.categories = selectedCategories;

                snippetService.create(newSnippet,
                        function(success) {
                            $rootScope.$broadcast('success-message', 'Snippet has been successfully created');
                            $location.path('/dashboard');
                        },
                        function(error) {
                            angular.forEach(error.data.validation_messages, function(errors, fieldName) {
                                if ($scope.snippetForm[fieldName]) {
                                    $scope.snippetForm[fieldName].$setValidity(fieldName, false);
                                    angular.forEach(errors, function(errorMessage, errorName) {
                                        console.log($scope.snippetForm[fieldName]);
                                        $scope.snippetForm[fieldName].$error[errorName] = errorMessage;
                                    });
                                }
                            });
                        }
                )
            }

            $scope.updateSnippet = function(snippet) {
                snippetService.update(snippet,
                        function(success) {
                            $rootScope.$broadcast('success-message', 'Snippet has been successfully updated');
                            $location.path('/dashboard');
                        });
            }

            $scope.getSnippet = function() {
                snippetService.show({id: $routeParams.id},
                function(snippet) {

                    var selectedCategories = [];
                    angular.forEach(snippet.categories, function(selectedCategory) {
                        angular.forEach($scope.loadCategories, function(listedCategory) {
                            if (listedCategory.category === selectedCategory.category) {
                                selectedCategories.push(listedCategory);
                            }
                        });
                    });
                    snippet.categories = selectedCategories;

                    var selectedTags = [];
                    angular.forEach(snippet.tags, function(tag) {
                        selectedTags.push({"text": tag.text});
                    });
                    snippet.tags = selectedTags;

                    $scope.snippet = snippet;
                },
                        function(error) {
                            $location.path('/snippets');
                        });
            }

            if ($routeParams.id) {
                $scope.getSnippet();
            }

            $scope.loadTags = function(query) {
                return tagService.showAll();
            };

            categoryService.showAll().then(function(response) {
                $scope.loadCategories = response.data;
            });
        });