'use strict';

angular.module('likeService', [])
        .constant("likeUrl", "http://apigility/likes")
        .factory('likeService', function($http, likeUrl) {
            return {
                add: function(snippetId) {
                    return $http.post(likeUrl, {'nodeId': snippetId});
                },
                remove: function(snippetId) {
                    return $http.delete(likeUrl + '/' + snippetId);
                },
                getLikes: function(snippetId) {
                    return $http.get(likeUrl + '/' + snippetId);
                }
            };
        });

