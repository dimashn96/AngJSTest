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
            let savedNews = get('savedNews');
            savedNews = savedNews.filter((item) => item !== title);
            set('savedNews',savedNews);
        }
    };

    let createNews = (title,text,author) => {
        if (!creatingCheck(title)) {
            let createdNews = get('createdNews');
            createdNews.push({
                title: title,
                text: text,
                author: author
            });
            set('createdNews',createdNews);
        }
    };
    let creatingCheck = (title) => get('createdNews').some((item) => item.title === title);
    let deleteCreatedNews = (title) => {
        if (creatingCheck(title)) {
            let createdNews = get('createdNews');
            createdNews = createdNews.filter((item) => item.title !== title);
            set('createdNews',createdNews);
        }
    };

    let getCreatedNewsDetails = (title) => {
        let createdNews = get('createdNews');
        let newsDetails;
        createdNews.forEach((item) => {
            if (item.title === title) {
                newsDetails = item;
            }
        });
        return newsDetails
    };

    if (!isset('savedNews')) {
        set('savedNews',[]);
    }

    if (!isset('createdNews')) {
        set('createdNews',[]);
    }

    return {
        isset: isset,
        get: get,
        set: set,
        saveForLater: saveForLater,
        deleteSavedNews: deleteSavedNews,
        savingCheck: savingCheck,
        createNews: createNews,
        deleteCreatedNews: deleteCreatedNews,
        getCreatedNewsDetails: getCreatedNewsDetails
    }

});