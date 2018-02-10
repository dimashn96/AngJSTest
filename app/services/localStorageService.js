'use strict';

newsApp.factory('localStorageService', function() {

    let isset = (key) => localStorage[key];
    let get = (key) => JSON.parse(localStorage[key]);
    let set = (key,obj) => {
        localStorage[key] = JSON.stringify(obj);
    };
    let saveForLater = (title) => {
        if (!savingCheck(title)) {
            let savedNews = get('savedNews');
            savedNews.push(title);
            set('savedNews',savedNews);
        }
    };
    let savingCheck = (title) => get('savedNews').some((item) => item === title);

    let deleteSavedNews = (title) => {
        if (savingCheck(title)) {
            console.log(title);
            let savedNews = get('savedNews');
            savedNews.filter((item) => item !== title);
            set('savedNews',savedNews);
        }
    };

    if (!isset('savedNews')) {
        set('savedNews',[]);
    }

    return {
        isset: isset,
        get: get,
        set: set,
        saveForLater: saveForLater,
        deleteSavedNews: deleteSavedNews,
        savingCheck: savingCheck
    }

});