'use strict';

newsApp.controller('NewsDetailsController', function($scope, $routeParams, dataService) {
    if ($routeParams['id'] && $routeParams['title']) {
        dataService.getNewsDetails($routeParams['title'])
            .then((response) => {
                $scope.newsDetails = response.data.articles[0];
            });
        }
});