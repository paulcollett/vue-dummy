var VueDummy = (function () {
'use strict';

var rand = function (min, max) {
  if(!min || !max) { return min; }
  min = Math.floor(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
};

// repeat polyfill
var repeat = function (str, count) {
  return ''.repeat ? ('' + str).repeat(count) : (function (str, count, rpt) {
    for (var i = 0; i < count; i++) { rpt += str; }

    return rpt;
  })(str + '', Math.floor(count), '');
};

// array.from polyfill (!IE)
var arr = function (nodelist) {
  return Array.from ? Array.from(nodelist) : Array.prototype.slice.call(nodelist);
};

var Utils = {rand: rand, repeat: repeat, arr: arr};

var text = function (argString) {
  var wordCount = (argString + '').split(',');
  wordCount = Utils.rand(wordCount[0], wordCount[1]) || 10;

  var lib = 'lorem ipsum dolor sit amet consectetur adipiscing elit nunc euismod vel ' +
    'dolor nec viverra nullam auctor enim condimentum odio laoreet libero ' +
    'libero tincidunt est sagittis curabitur vitae';

  if(wordCount > 3) { lib += (' ' + 'a in id id at'); }

  var libRepeat = Math.ceil(wordCount/lib.split(' ').length);

  lib = Utils.repeat(lib, libRepeat).split(' ').sort(function () { return 0.5 - Math.random(); }).slice(0, wordCount).join(' ');

  return lib.charAt(0).toUpperCase() + lib.slice(1);
};

var src = function (argString, el) {
  var size = '404';

  if(argString) {
    size = argString;
  } else if(el) {
    size = [parseInt(el.getAttribute('width') || el.offsetWidth), parseInt(el.getAttribute('height') || el.offsetHeight)].filter(function (v) {return !!v}).join('x');
    size =  size || (el.parentNode && el.parentNode.offsetWidth) || '404';
  }

  // split size to allow for random ranges
  size = (size + '').split('x').map(function (a){ return Utils.rand(a.split(',')[0], a.split(',')[1]); });

  var w = size[0];
  var h = (size[1]||size[0]);
  var text = (el && el.getAttribute('data-text') || (w + '×' + h));
  var bgColor = (el && el.getAttribute('data-color') || '#ccc');
  var textColor = (el && el.getAttribute('data-text-color') || '#888');
  var fontSize = (w / 3.5 / (text.length * 0.3)) - text.length;

  return 'data:image/svg+xml,'
    + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+ w + 'px" height="' + h + 'px">'
    + '<rect x="0" y="0" width="100%" height="100%" fill="' + bgColor + '"/>'
    + '<line opacity="0.5" x1="0%" y1="0%" x2="100%" y2="100%" stroke="' + textColor + '" stroke-width="2" />'
    + '<line opacity="0.5" x1="100%" y1="0%" x2="0%" y2="100%" stroke="' + textColor + '" stroke-width="2" />'
    + '<text stroke="' + bgColor + '" stroke-width="2em" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="'+fontSize+'">' + text + '</text>'
    + '<text fill="' + textColor + '" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="'+fontSize+'" font-family="sans-serif">' + text + '</text>'
    + '</svg>');
};

var Dummy$1 = {
  text: text,
  src: src
};

var Plugin = function () {};

Plugin.install = function (Vue, options) {
  if (Plugin.installed) {
    return;
  }

  var directive = function (el, binding) {
    if(!el) {
      return;
    }

    var args = binding.arg // v-dummy:args
      || Object.keys(binding.modifiers).join(',') // v-dummy.args
      || (typeof binding.value == 'string' ? binding.value : binding.expression)
      || '';
    var nodeName = el.nodeName.toLowerCase();

    if(nodeName === 'img') {
      el.src = Dummy$1.src(args, el);
    } else if(nodeName === 'table') {
      var tableRow = function () { return ("<tr><td>" + (Dummy$1.text(3)) + "</td><td>" + (Dummy$1.text(3)) + "</td><td>" + (Dummy$1.text(3)) + "</td></tr>"); };
      el.innerHTML = "<thead>" + (tableRow().replace(/<td/g, '<th')) + "</thead><tbody>" + (tableRow()) + (tableRow()) + (tableRow()) + "</tbody>";
    } else if(nodeName === 'ul' || nodeName === 'ol') {
      el.innerHTML += "<li>" + (Dummy$1.text(3)) + "</li><li>" + (Dummy$1.text(3)) + "</li><li>" + (Dummy$1.text(3)) + "</li>";
    } else {
      el.innerHTML += Dummy$1.text(args);
    }
  };

  Vue.directive('dummy', {
    // called when the bound element has been inserted into its parent node
    inserted: directive
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

return Plugin;

}());
