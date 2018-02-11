'use strict';

newsApp.controller('CreatedNewsController', function($scope, localStorageService) {

    let getCreatedNews = () => {
        $scope.createdNews = localStorageService.get('createdNews');
    };

    getCreatedNews();

    $scope.deleteCreatedNews = (title) => {
        localStorageService.deleteCreatedNews(title);
        getCreatedNews();
    };

});
