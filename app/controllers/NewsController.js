'use strict';

newsApp.controller('NewsController', function ($scope, dataService, parseService) {

    $scope.news = [];
    $scope.sources = [];

    dataService.getSources().then((response) => {
        $scope.sources = parseService.parseSources(response.data.sources);
    });

    $scope.updateNews = () => {
        $scope.news = dataService.getNewsBySources($scope.sources,$scope.news);
        console.log($scope.news);
    };

    $scope.parseTime = parseService.parseTime;

});