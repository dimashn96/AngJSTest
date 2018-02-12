'use strict';

newsApp.controller('NewsDetailsController', function($scope, $routeParams, $location, dataService) {
    if ($routeParams['id'] && $routeParams['title']) {
        dataService.getNewsDetails($routeParams['title'])
            .then((response) => {
                if (response.data.articles[0]){
                    $scope.newsDetails = response.data.articles[0];
                } else {
                    alert('News not found!');
                    $location.path('/saved');
                }
            });
        }
});