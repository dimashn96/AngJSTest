'use strict';

newsApp.controller('SavedNewsController', function ($scope, dataService, parseService, localStorageService) {

    if (localStorageService.isset('colors')) {
        $scope.colors = localStorageService.get('colors');
    } else {
        $scope.colors = parseService.createColors($scope.sources);
        localStorageService.set('colors',$scope.colors);
    }

    $scope.savedNews = [];
    localStorageService.get('savedNews').forEach((title) => {
        dataService.getNewsDetails(title).then((response) => {
            if (response.data.articles[0]) {
                $scope.savedNews.push(response.data.articles[0]);
            } else {
                localStorageService.deleteSavedNews(title);
            }
        })
    });

    $scope.deleteSavedNews = (title) => {
        localStorageService.deleteSavedNews(title);
        $scope.savedNews = parseService.deleteSavedNews(title,$scope.savedNews);
    };

});