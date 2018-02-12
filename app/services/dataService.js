'use strict';

newsApp.factory('dataService', function($http, parseService, $q) {
    let config;
    let sources;
    let news = {};
    let newsDetails = {};
    let loadConfig = () => {
        if (!config) {
            return $http.get('config/config.json').then((response) => {
                config = response.data;
                $http.defaults.headers.common['X-Api-Key'] = config.api.apiKey;
            })
        } else {
            return $q.resolve()
        }
    };
    let getSources = () => {
        return loadConfig()
            .then(() => sources = sources || $http.get(config.api.allSources));
    };
    let getNewsBySource = (source) => {
        return news[source] =
            news[source] ||
            $http.get(config.api.allNewsBySources + source);
    };
    let getNewsBySources = (sources,news) => {
        news = news || [];
        let choosedSources = parseService.getChoosedSources(sources);
        let newsLocal = news;
        let state;
        choosedSources.map((source) => {
            state = newsLocal.some((item) => source === item.source.id);
            if (!state) {
                getNewsBySource(source).then((response) => {
                    newsLocal.push(...response.data.articles);
                })
            }
        });
        newsLocal.map((item1) => {
            if (choosedSources.indexOf(item1.source.id) === -1) {
                newsLocal =
                    newsLocal.filter((item2) => item2.source.id !== item1.source.id);
            }
        });
        return newsLocal
    };
    let getNewsDetails = (title) => {
        return loadConfig()
            .then(() => newsDetails[title] =
                newsDetails[title] ||
                $http.get(config.api.allNewsByQuote + title));
    };
    return {
        loadConfig: loadConfig,
        getSources: getSources,
        getNewsBySources: getNewsBySources,
        getNewsDetails: getNewsDetails
    }
});