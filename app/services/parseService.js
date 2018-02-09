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
            sourcesLocal[i]['color'] = randomColor();
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

    function parseTime(time) {
        time = time.substring(0,20);
        let timeStr = time.substring(time.lastIndexOf('T')+1,time.length-1);
        let dateArr = time.substring(0,time.indexOf('T')).split('-');
        let dateStr = delZero(dateArr[2]) + '.' + dateArr[1] + '.' + dateArr[0];
        if (timeStr === '00:00:00') {
            timeStr = '';
        }
        return timeStr + ' ' + dateStr
    }

    function delZero (str) {
        return (str[0] === '0') ? str[1] : str;
    }

    function randomColor(){
        console.log('randomcolor');
        let r = Math.floor(Math.random() * (256));
        let g = Math.floor(Math.random() * (256));
        let b = Math.floor(Math.random() * (256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16)
    }

    function createColors(sources) {
        let colors = {};
        sources.forEach(function (source) {
            colors[source.id] = source.color;
        });
        return colors
    }


    return {
        parseSources : parseSources,
        parseTime : parseTime,
        getChoosedSources : getChoosedSources,
        createColors : createColors
    }

});