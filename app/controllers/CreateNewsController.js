'use strict';

newsApp.controller('CreateNewsController', function($scope, $location, localStorageService) {
    $scope.create = (news,createNewsForm) => {
        if (createNewsForm.$valid) {
            localStorageService.createNews(news.title,news.text,news.author);
            alert('News created');
            $location.path('/created');
        }
    }
});
