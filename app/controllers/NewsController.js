'use strict';

newsApp.controller('NewsController', function ($rootScope, $scope, dataService, parseService) {

    $scope.updateNews = () => {
        $scope.news = dataService.getNewsBySources($scope.sources,$scope.news);
        $rootScope.news = $scope.news;
        localStorage.sources = JSON.stringify($scope.sources);
    };

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


    // if (!($rootScope.sources && $rootScope.colors)) {
    //     dataService.getSources().then((response) => {
    //         $rootScope.sources = parseService.parseSources(response.data.sources);
    //         $rootScope.colors = parseService.createColors($rootScope.sources);
    //         $scope.sources = $rootScope.sources;
    //         $scope.colors = $rootScope.colors;
    //
    //         if (localStorage.sources && localStorage.colors) {
    //             console.log('initialize from ls');
    //             $rootScope.sources = JSON.parse(localStorage.sources);
    //             $rootScope.colors = JSON.parse(localStorage.colors);
    //             $scope.sources = $rootScope.sources;
    //             $scope.colors = $rootScope.colors;
    //             $scope.updateNews();
    //         } else {
    //             localStorage.sources = JSON.stringify($rootScope.sources);
    //             localStorage.colors = JSON.stringify($rootScope.colors);
    //         }
    //     });
    // }

    $scope.parseTime = parseService.parseTime;

});