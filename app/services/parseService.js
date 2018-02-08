'use strict';

newsApp.factory('parseService', function() {

    function parse(obj, type) {
        if (type === 'sources') {
            let newObj = [];
            for (let i = 0; i <obj.length; i++) {
                newObj[i] = {};
                for (let key in obj[i]) {
                    if (key === 'id' || key ==='name' || key === 'category') {
                        newObj[i][key] = obj[i][key];
                    }
                }
                newObj[i]['choose'] = false;
            }
            return newObj
        }
    }

    return {
        parse : parse
    }

});