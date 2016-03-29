
var myApp=angular.module('myApp',['ngRoute','controllers','directive']);

myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/list',{
        controller: 'ListController',
        templateUrl: '/template/article_list.html'
    }).when('/article/:id',{
        controller: 'ArticleController',
        templateUrl: '/template/article.html'
    }).otherwise({
            redirectTo: '/'
        })
    ;
}]);

myApp.filter("trustHtml", function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

