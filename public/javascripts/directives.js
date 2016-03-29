var directive=angular.module('directive',[]);
directive.directive('editor', [function() {
    return {
        restrict: 'A'

        , link: function(scope, element, attrs){

            var editor = new UE.ui.Editor({initialContent: ''});
            editor.render(element[0]);

            editor.ready(function(){
                editor.addListener('contentChange', function(){
                    scope.content = editor.getContent();
                    scope.simple=editor.getContentTxt();
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
                });

                // scope.$watch('content', function(newValue){
                //     editor.setContent(newValue);
                // });
            });
        }
    };
}]);
//directive.directive('text',['articleService',function (articleService) {
//    return{
//        restrict: 'E',
//        template: articleService.getArticle
//
//    }
//}]);