'use strict';

newsApp.factory('localStorageService', function() {

    let isset = (key) => localStorage[key];
    let get = (key) => JSON.parse(localStorage[key]);
    let set = (key,obj) => {
        localStorage[key] = JSON.stringify(obj);
    };

    return {
      isset: isset,
      get: get,
      set: set
    }

});