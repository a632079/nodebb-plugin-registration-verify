"use strict";
var Canvas = module.require('canvas');
/*
 * get random float value amount [start, end)
 */
var randFloat = function (start, end) {
  if (end < start) {
    var mid = end;
    end = start;
    start = mid;
  }
  return start + Math.random() * (end - start);
};
function randColor(min, max) {
  var r = randInt(min, max);
  var g = randInt(min, max);
  var b = randInt(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}
/*
 * get random integer value amount [start, end)
 */
var randInt = function (start, end) {
  if (end < start) {
    var mid = end;
    end = start;
    start = mid;
  }
  return Math.floor(Math.random() * (end - start)) + start;
}
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
function Generate(settings) {
  var W = settings.width;
  var H = settings.height;
  var canvas = createCanvas(W, H);
  var ctx = canvas.getContext('2d');
  var items = uuid(settings.leng, 16).split('');
  var vcode = '';

  //set background
  ctx.fillStyle = '#f3fbfe';
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = .8;
  ctx.font = '15px sans-serif';

  //generate background font
  for (var i = 0; i < settings.leng; i++) {
    ctx.fillStyle = 'rgb(' + randInt(150, 225) + ',' + randInt(150, 225) + ',' + randInt(150, 225) + ')';
    ctx.fillText(items[randInt(0, items.length)], randFloat(-10, W + 10), randFloat(-10, H + 10));
  }

  //generate vcode
  var color = 'rgb(' + randInt(1, 120) + ',' + randInt(1, 120) + ',' + randInt(1, 120) + ')';
  ctx.font = 'bold ' + settings.font_size + 'px ' + settings.font_style;
  for (var i = 0; i < settings.leng; i++) {
    ctx.fillStyle = color;
    //Font rotation
    var x = (settings.font_size * 0.3) + i * (settings.font_size * 0.8);
    var y = randInt(settings.font_size - 10, H);
    //var y = 50;
    console.log(x, y);
    var deg = randInt(-45, 45);
    //change x,y & deg
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.fillText(items[i], 0, 0);
    //recover x,y & deg
    ctx.rotate(-deg * Math.PI / 180);
    ctx.translate(-x, -y);

    vcode += items[i];
  }

  //generate line
  ctx.beginPath();
  ctx.strokeStyle = color;
  var A = randFloat(10, H / 2);
  var b = randFloat(H / 4, 3 * H / 4);
  var f = randFloat(H / 4, 3 * H / 4);
  var T = randFloat(H * 1.5, W);
  var w = 2 * Math.PI / T;
  var S = function (x) {
    return A * Math.sin(w * x + f) + b;
  }
  ctx.lineWidth = 5;
  for (var x = -20; x < 200; x += 4) {
    ctx.moveTo(x, S(x));
    ctx.lineTo(x + 3, S(x + 3));
  }
  ctx.closePath();
  ctx.stroke();

  //generate point
  for (var i = 0; i < settings.point; i++) {
    ctx.fillStyle = randColor(0, 255);
    ctx.beginPath();
    ctx.arc(randInt(0, settings.width), randInt(0, settings.height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
  let ret = {
    code: vcode.toLowerCase(),
    dataURL: canvas.toDataURL()
  };
  console.log(ret);
  return ret;
};



//Main
var plugin = {},
  meta = module.parent.require('./meta');
var translator = require.main.require('./public/src/modules/translator');

plugin.init = function (params, callback) {
  var app = params.router,
    middleware = params.middleware,
    controllers = params.controllers;

  app.get('/admin/plugins/verify-code', middleware.admin.buildHeader, renderAdmin);
  app.get('/api/admin/plugins/verify-code', renderAdmin);

  callback();
};

plugin.addAdminNavigation = function (header, callback) {
  header.plugins.push({
    route: '/plugins/verify-code',
    icon: 'fa-tint',
    name: 'Verify Code'
  });

  callback(null, header);
};

plugin.addCaptcha = function (params, callback) {
  var settings = {
    width: (meta.config['v-code:width']) ? meta.config['v-code:width'] : 100,
    height: (meta.config['v-code:height']) ? meta.config['v-code:height'] : 40,
    leng: (meta.config['v-code:leng']) ? meta.config['v-code:leng'] : 4,
    point: (meta.config['v-code:point']) ? meta.config['v-code:point'] : 100,
    font_size: (meta.config['v-code:font_size']) ? meta.config['v-code:font_size'] : "30",
    font_style: (meta.config['v-code:font_style']) ? meta.config['v-code:font_style'] : "sans-serif"
  };


  var v_code = Generate(settings);
  var MobileDetect = require('mobile-detect'),
    md = new MobileDetect(params.req.headers['user-agent']);
  params.req.session.vcode = v_code.code;
  //console.log(params.req.session);
  var ret;
  if (!md.mobile) {
    ret = {
      label: '[[verify-code:register-label]]',
      html: '<div class="well"><input class="form-control" name="verify-code" id="verify-code" placeholder="[[verify-code:register-placeholder]]" style="width:auto;display:inline-block" /><img style="float:right;display:inline-block;" src="' + v_code.dataURL + '"/></div>'
    };
  } else {
    //mobile friendly
    ret = {
      label: '[[verify-code:register-label]]',
      html: '<div class="well"><input class="form-control" name="verify-code" id="verify-code" placeholder="[[verify-code:register-placeholder]]" style="width:auto;display:inline-block;padding:5px;" /><img style="float:right;display:inline-block;" src="' + v_code.dataURL + '"/></div>'
    };
  }


  if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
    params.templateData.regFormEntry.push(ret);
  } else {
    params.templateData.captcha = ret;
  }

  callback(null, params);
};

plugin.checkRegister = function (params, callback) {
  var v_code = params.req.session.vcode;
  if (v_code.toLowerCase() !== params.req.body['verify-code'].toLowerCase()) {
    callback({ source: 'verify-code', message: 'wrong-code' }, params);
  } else {
    callback(null, params);
  }
};

function renderAdmin(req, res, next) {
  res.render('admin/plugins/verify-code', {});
}

module.exports = plugin;