'use strict';

newsApp.controller('NewsController', function ($rootScope, $scope, dataService, parseService) {

    if (localStorage.sources && localStorage.colors) {
        dataService.loadConfig().then(() => {
            $scope.sources = JSON.parse(localStorage.sources);
            $scope.colors = JSON.parse(localStorage.colors);
            $scope.updateNews();
        });
    } else {
        dataService.getSources().then((response) => {
            $scope.sources = parseService.parseSources(response.data.sources);
            $scope.colors = parseService.createColors($scope.sources);
            localStorage.sources = JSON.stringify($scope.sources);
            localStorage.colors = JSON.stringify($scope.colors);
        });
    }

    $scope.updateNews = () => {
        $scope.news = dataService.getNewsBySources($scope.sources,$scope.news);
        $rootScope.news = $scope.news;
        localStorage.sources = JSON.stringify($scope.sources);
    };

    $scope.parseTime = parseService.parseTime;

});