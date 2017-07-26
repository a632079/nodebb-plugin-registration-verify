"use strict";
/*global utils, app*/

$(function () {
    $(window).on('action:ajaxify.end', function (err,data) {
        //console.log(utils.param('error'));
        if (data.tpl_url === 'register' && utils.param('error') === 'wrong-code') {
            require(['translator'], function (translator) {
                translator.translate('[[verify-code:client-wrong-code]]', function (translated) {
                    //console.log('Translated string:', translated);
                    //utils.param('error') = translated;
                    app.alertError(translated);
                });
            });
            
        }
    });
});