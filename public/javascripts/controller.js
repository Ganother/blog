var controllers=angular.module('controllers',['service']);
//文章表控制器
controllers.controller("ListController",function($scope,listService, $routeParams){
    //获取文章列表
         listService.getNews().success(function (data) {
             if(data.errcode == 0){
                 $scope.articleList = data.data;
             }else{
                 console.log(data);
             }

         });
});

controllers.controller("MainController",function($scope,$routeParams){


});

//文章详情控制器
controllers.controller("ArticleController",function($sce,$scope,articleService,$routeParams){
    //获取文章详情
    articleService.getArticle($routeParams.id).success(function (data) {
        if(data.errcode==0){
            $scope.body=data.data;
        }else{
            console.log(data);
        }

    });
});



