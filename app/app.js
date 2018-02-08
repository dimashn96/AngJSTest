'use strict';

let newsApp = angular.module('newsApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
            .when('/news',
            {
                templateUrl:'views/news.html',
                controller:'NewsController'
            })
            .otherwise( {
                redirectTo: '/news'
            });
    });