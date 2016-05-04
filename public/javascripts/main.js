
var myApp=angular.module('myApp',['ngRoute','controllers','directive','angularLoad']);

myApp.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider){
    $routeProvider.when('/list',{
        controller: 'ListController',
        templateUrl: '/template/article_list.html'
    }).when('/article/:id',{
        controller: 'ArticleController',
        templateUrl: '/template/article.html'
    }).otherwise({
        redirectTo: '/list'
    });
    $httpProvider.interceptors.push('timestampMarker');
}]);

myApp.filter("trustHtml", function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

myApp.factory('timestampMarker', ["$rootScope", function ($rootScope) {
    var timestampMarker = {
        request: function (config) {
            $rootScope.loading = true;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
             $rootScope.loading = false;
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);
