'use strict';

newsApp.factory('parseService', function() {
    let parseSources = (sources) => {
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
            sourcesLocal[i]['color'] = randomColor();
        });
        return sourcesLocal
    };
    let getChoosedSources = (sources) => {
        let choosedSources = [];
        sources.forEach((source) => {
            if (source.choose) {
                choosedSources.push(source.id);
            }
        });
        return choosedSources
    };
    let parseTime = (time) => {
        let delZero = (str) => (str[0] === '0') ? str[1] : str;
        time = time.substring(0,20);
        let timeStr = time.substring(time.lastIndexOf('T')+1,time.length-1);
        let dateArr = time.substring(0,time.indexOf('T')).split('-');
        let dateStr = delZero(dateArr[2]) + '.' + dateArr[1] + '.' + dateArr[0];
        if (timeStr === '00:00:00') {
            timeStr = '';
        }
        return timeStr + ' ' + dateStr
    };
    let randomColor = () => {
        let r = Math.floor(Math.random() * (256));
        let g = Math.floor(Math.random() * (256));
        let b = Math.floor(Math.random() * (256));
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + '0.3)'
    };
    let createColors = (sources) => {
        let colors = {};
        sources = sources || [];
        sources.forEach((source) => {
            colors[source.id] = source.color;
        });
        return colors
    };
    let getNewsDetails = (id,title,news) => {
        let newsDetails = {};
        news.forEach((item) => {
            if (item.source.id === id && item.title === title) {
                newsDetails = item;
            }
        });
        return newsDetails
    };
    let deleteSavedNews = (title,news) => {
        return news.filter((item,i) => {
            if (!item) {
                news.splice(i,1);
                return false
            } else {
                return item.title !== title
            }
        });
    };
    let resetChoosedSources = (sources) => {
        return sources.map((item) => {
            if (item.choose) {
                item.choose = false;
            }
            return item
        });
    };
    return {
        parseSources : parseSources,
        parseTime : parseTime,
        getChoosedSources : getChoosedSources,
        createColors : createColors,
        getNewsDetails : getNewsDetails,
        deleteSavedNews: deleteSavedNews,
        resetChoosedSources: resetChoosedSources
    }
});