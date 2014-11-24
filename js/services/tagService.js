'use strict';
//    headers – {Object} – Map of strings or functions which return strings 
//    action – {string} – The name of action. This name becomes the name of the method on your resource object.
//    method – {string} – Case insensitive HTTP method (e.g. GET, POST, PUT, DELETE, JSONP, etc).
//    params – {Object=} – Optional set of pre-bound parameters for this action. If any of the parameter value is a function, it will be executed every time when a param value needs to be obtained for a request (unless the param was overridden).
//    url – {string} – action specific url override. The url templating is supported just like for the resource-level urls.
//    isArray – {boolean=} – If true then the returned object for this action is an array, see returns section.
//    transformRequest – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http request body and headers and returns its transformed (typically serialized) version. By default, transformRequest will contain one function that checks if the request data is an object and serializes to using angular.toJson. To prevent this behavior, set transformRequest to an empty array: transformRequest: []
//    transformResponse – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http response body and headers and returns its transformed (typically deserialized) version. By default, transformResponse will contain one function that checks if the response looks like a JSON string and deserializes it using angular.fromJson. To prevent this behavior, set transformResponse to an empty array: transformResponse: []
//    cache – {boolean|Cache} – If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
//    timeout – {number|Promise} – timeout in milliseconds, or promise that should abort the request when resolved.
//    withCredentials - {boolean} - whether to set the withCredentials flag on the XHR object. See requests with credentials for more information.
//    responseType - {string} - see requestType.
//    interceptor - {Object=} - The interceptor object has two optional methods - response and responseError. Both response and responseError interceptors get called with http response object. See $http interceptors.

angular.module('tagService', [])
        .constant('tagsUrl', 'http://api.php-snips.com/tags')
        .factory('tagService', function($http, tagsUrl) {
            return  {
                showAll: function() {
                    return $http.get(tagsUrl);
                },
            };
        });


