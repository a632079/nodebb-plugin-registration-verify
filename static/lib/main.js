"use strict";
/*global utils, app*/

$(function() {
	$(window).on('action:ajaxify.end', function(e, data) {
		if (data.url === 'register' && utils.param('error') === 'wrong-code') {
			app.alertError('您填写的验证码错误。请刷新页面以重试！');
		}
	});
});