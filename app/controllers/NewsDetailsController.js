'use strict';

newsApp.controller('NewsDetailsController', function ($rootScope, $scope, $routeParams, dataService, parseService) {

    let getDetails = () => {
        if ($routeParams['id'] && $routeParams['title']) {
            if ($rootScope.news) {
                $scope.newsDetails = parseService.getNewsDetails($routeParams['id'], $routeParams['title'], $rootScope.news);
            } else {
                dataService.getNewsDetails($routeParams['title'])
                    .then((response) => {
                        $scope.newsDetails = response.data.articles[0];
                    })
            }
        }
    };

    getDetails();

});