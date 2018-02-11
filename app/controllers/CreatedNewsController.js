'use strict';

newsApp.controller('CreatedNewsController', function($scope, $routeParams, localStorageService) {

    if ($routeParams['title']) {
        $scope.newsDetails = localStorageService.getCreatedNewsDetails($routeParams['title']);
    } else {
        let getCreatedNews = () => {
            $scope.createdNews = localStorageService.get('createdNews');
        };
        getCreatedNews();
        $scope.deleteCreatedNews = (title) => {
            localStorageService.deleteCreatedNews(title);
            getCreatedNews();
        };
    }

});
