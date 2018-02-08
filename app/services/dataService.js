'use strict';

newsApp.factory('dataService', function($http) {

    let config;

    let data = {};

    let getSources = () => get('sources');

    function get(type) {
        if (!config) {
            return $http({method: 'GET', url: 'config/config.json'})
                .then(function (response) {
                    config = response.data.config;
                    $http.defaults.headers.common['X-Api-Key'] = config.api.key;
                    data[type] = $http({method: 'GET', url: config.api[type]});
                    return data[type]
            })
        } else {
            if (!data[type]) {
                data[type] = $http({method: 'GET', url: config.api[type]});
                return data[type];
            } else {
                return data[type]
            }
        }
    }

    return {
        getSources : getSources
    }

});