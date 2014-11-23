angular.module('snippetApp')
        .controller('likeController', function($scope, likeService, $rootScope) {
            //var hasLiked = false;
            $scope.likeClick = function(snippet) {

                likeService.add(snippet.id).success(function(data) {
                    snippet.likes += 1;
                }).error(function(error) {

                });

//        if (!hasLiked) {
//            likeService.add(snippet.id).success(function (data) {
//                hasLiked = true;
//                $scope.liked = 'Unlike';
//                snippet.likes += 1;
//            }).error(function (error) {
//                
//            });
//        } else {
//            likeService.remove(snippet.id).success(function (data) {
//                hasLiked = false;
//                $scope.liked = 'Like';
//                snippet.likes -= 1;
//            }).error(function (error) {
//
//            });
//
//        }
            };
        });