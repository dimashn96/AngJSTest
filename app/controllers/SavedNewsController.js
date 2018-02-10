'use strict';

newsApp.controller('SavedNewsController', function ($rootScope, $scope, dataService, parseService, localStorageService) {

    $scope.news = [];

    if (localStorageService.isset('colors')) {
        $scope.colors = localStorageService.get('colors');
    } else {
        $scope.colors = parseService.createColors($scope.sources);
        localStorageService.set('colors',$scope.colors);
    }

    let titles = localStorageService.get('savedNews');
    titles.forEach((title) => {
        dataService.getNewsDetails(title).then((response) => {
            $scope.news.push(response.data.articles[0]);
        })
    });

    $scope.deleteSavedNews = localStorageService.deleteSavedNews;

});