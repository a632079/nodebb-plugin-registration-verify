"use strict";
/*global utils, app*/

$(function () {
    $(window).on('action:ajaxify.end', function (data) {
        console.log(utils.param('error'));
        if (data.url === 'register' && utils.param('error') === 'wrong-code') {
            console.log("wrong-code");
            require(['translator'], function (translator) {
                translator.translate('[[verify-code:client-wrong-code]]', function (translated) {
                    console.log('Translated string:', translated);
                    app.alertError(translated);
                });
            });
            
        }
    });
});