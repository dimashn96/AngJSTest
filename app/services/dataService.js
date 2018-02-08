'use strict';

newsApp.factory('dataService', function($http, parseService) {

    let config;
    let sources;
    let news = {};

    function getSources() {
        if (!config) {
            return $http({method: 'GET', url: 'config/config.json'})
                .then(function (response) {
                    config = response.data;
                    $http.defaults.headers.common['X-Api-Key'] = config.api.apiKey;
                    sources = $http({method: 'GET', url: config.api.allSources});
                    return sources
            })
        } else {
            return sources = sources || $http({method: 'GET', url: config.api.allSources});
        }
    }

    function getNewsBySource(source) {
        return news[source] = news[source] || $http({method: 'GET', url: config.api.topHeadlinesBySources + source});
    }

    function getNewsBySources(sources,news) {
        let choosedSources = parseService.getChoosedSources(sources);
        let newsLocal = news;
        let state;
        choosedSources.map(function (source) {
            state = newsLocal.some((item) => source === item.source.id);
            if (!state) {
                getNewsBySource(source).then((response) => {
                    newsLocal.push(...response.data.articles);
                })
            }
        });
        newsLocal.map(function (item1) {
            if (choosedSources.indexOf(item1.source.id) === -1) {
                newsLocal = newsLocal.filter((item2) => item2.source.id !== item1.source.id);
            }
        });
        return newsLocal
    }

    return {
        getSources : getSources,
        getNewsBySources: getNewsBySources
    }

});