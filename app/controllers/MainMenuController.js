'use strict';

newsApp.controller('MenuController', function ($scope, $location) {
    let listener = () => $location.$$url !== $scope.url;
    let setUrl = () => {
        $scope.url = $location.$$url;
    };
    $scope.$watch(listener,() => {
        setUrl();
    });
});
