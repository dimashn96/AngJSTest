'use strict';

newsApp.controller('CreateNewsController', function($scope, localStorageService) {

    $scope.create = (news,createNewsForm) => {
        console.log('saving');
        if (createNewsForm.$valid) {
            localStorageService.createNews(news.title,news.text,news.author);
        }
    }

});
