'use strict';

newsApp.controller('NewsController', function ($scope, dataService, parseService) {

    // $scope.sources = [{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'}];

    // $scope.items = [];

    dataService.getSources().then((response) => {
        $scope.sources = parseService.parse(response.data.sources,'sources');
        console.log($scope.sources);
    });

    // $scope.bool = false;

    // function cons() {
    //     console.log($scope.sources);
    //     console.log($scope.bool);
    // }
    //
    // setInterval(cons,5000);

});