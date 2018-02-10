'use strict';

let newsApp = angular.module('newsApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
            .when('/news',
            {
                templateUrl:'views/news.html',
                controller:'NewsController'
            })
            .when('/news/:id/:title', {
                templateUrl:'views/newsDetails.html',
                controller:'NewsDetailsController'
            })
            .when('/saved',
                {
                    templateUrl:'views/savedNews.html',
                    controller:'SavedNewsController'
                })
            .otherwise( {
                redirectTo: '/news'
            });
    });