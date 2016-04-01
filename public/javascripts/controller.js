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
controllers.controller("ArticleController",function($sce,$scope,articleService,$routeParams,angularLoad,$timeout){
    //获取文章详情
    articleService.getArticle($routeParams.id).success(function (data) {
        if(data.errcode==0){
            var text = data.data;
            $scope.body=text.replace(/class="language\-(\w+)"/g,"data-language='$1'");
            $timeout(function(){
                angularLoad.loadScript('/javascripts/code_color/rainbow.js').then(function() {
                    angularLoad.loadScript('/javascripts/code_color/generic.js').then(function() {
                        angularLoad.loadScript('/javascripts/code_color/html.js').then(function() {
                            angularLoad.loadScript('/javascripts/code_color/css.js').then(function() {
                                angularLoad.loadScript('/javascripts/code_color/javascript.js').then(function() {
                                    Rainbow.color();
                                });
                            });
                        });
                    });
                });
            },800);
        }else{
            console.log(data);
        }

    });

});



