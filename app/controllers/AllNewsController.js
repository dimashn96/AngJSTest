'use strict';

newsApp.controller('NewsController', function ($scope, dataService, parseService, localStorageService) {
    if (localStorageService.isset('sources') && localStorageService.isset('colors')) {
        dataService.loadConfig().then(() => {
            $scope.sources = localStorageService.get('sources');
            $scope.colors = localStorageService.get('colors');
            $scope.updateNews();
        });
    } else {
        dataService.getSources().then((response) => {
            $scope.sources = parseService.parseSources(response.data.sources);
            $scope.colors = parseService.createColors($scope.sources);
            localStorageService.set('sources',$scope.sources);
            localStorageService.set('colors',$scope.colors);
        });
    }
    $scope.updateNews = () => {
        $scope.news = dataService.getNewsBySources($scope.sources,$scope.news);
        localStorageService.set('sources',$scope.sources);
    };
    $scope.parseTime = parseService.parseTime;
    $scope.saveNews = (title) => {
        localStorageService.saveNews(title);
    };
    $scope.savingCheck = (title) => localStorageService.savingCheck(title);
    $scope.resetChoosedSources = () => {
        $scope.sources = parseService.resetChoosedSources($scope.sources);
        $scope.updateNews();
    };
});