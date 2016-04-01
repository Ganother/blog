var service=angular.module('service',[]);

//新闻列表服务
service.factory('listService',['$http',function($http){
    return {
        //获取文章列表
        getNews: function(){
            return $http.get('/get_f2e_list',{
                headers: {'Content-Type':'application/json'}
            });

        }
    }
}]);
//文章详情服务
service.factory('articleService',['$http', function ($http) {
    return{
        //获取文章详情
        getArticle: function(id){
            return $http.get('/get_f2e_detail?',{
                headers: {'Content-Type':'application/json'},
                params: {'id': id}
            });
        }

    }
}]);
