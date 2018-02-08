'use strict';

newsApp.factory('parseService', function() {

    function parseSources(sources) {
        let sourcesLocal = [];
        sources.forEach((source,i) => {
            sourcesLocal[i] = {};
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    let keyArr = ['id','name','category'];
                    if (keyArr.indexOf(key) !== -1) {
                        sourcesLocal[i][key] = source[key];
                    }
                }
            }
            sourcesLocal[i]['choose'] = false;
        });
        return sourcesLocal
    }

    function getChoosedSources(sources) {
        let choosedSources = [];
        sources.forEach((source) => {
            if (source.choose) {
                choosedSources.push(source.id);
            }
        });
        return choosedSources
    }

    return {
        parseSources : parseSources,
        getChoosedSources : getChoosedSources
    }

});