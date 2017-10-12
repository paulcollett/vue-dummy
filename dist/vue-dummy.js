(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueDummy = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dummy = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () { 'use strict';

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

var Utils = {rand: rand, repeat: repeat};

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
  var text = (el.getAttribute('data-text') || (w + '×' + h));
  var bgColor = (el.getAttribute('data-color') || '#ccc');
  var textColor = (el.getAttribute('data-text-color') || '#888');
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

var updateDom = function() {
  // copy element support
  for (var i = 0; i < 3; i++) { Array.from(document.querySelectorAll('[data-copy]'))
    .sort(function (a, b) { return a.compareDocumentPosition(b) & 2 ? 1 : -1; }) // inner first then parents
    .forEach(function (el) {
      var selector = el.getAttribute('data-copy');
      var elToCopy = document.querySelector(selector) || document.getElementById(selector) || document.getElementsByClassName(selector)[0];

      if(!elToCopy) {
        elToCopy = {outerHTML: 'data-copy="' + selector + '" element not found'};
      }

      el.outerHTML = (elToCopy.tagName == 'SCRIPT' || elToCopy.tagName == 'TEMPLATE') ? elToCopy.innerHTML : elToCopy.outerHTML;
  }); }

  // kitchen sink
  document.querySelectorAll('[data-dummy=sink]').forEach(function (el) {
    el.removeAttribute('data-dummy');

    var tags = 'h1,h2,h3,h4,h5,ul,ol,table,blockquote'.split(',').join(',p,').split(',');

    tags = tags.map(function (tag) { return ("<" + tag + " data-dummy></" + tag + ">"); }).join('')
      + '<hr /><p data-dummy="150">This <strong>is a longer</strong> <em>paragraph</em> <a href="#">with a link</a>. </p>'
      + '<img data-dummy="800" /><p data-dummy="70" data-repeat=4></p>';

    el.innerHTML += tags;
  });

  // list support
  document.querySelectorAll('ul[data-dummy], ol[data-dummy]').forEach(function (el) {
    el.removeAttribute('data-dummy');

    el.innerHTML += Utils.repeat('<li data-dummy></li>', 4);
  });

  // table support
  document.querySelectorAll('table[data-dummy]').forEach(function (el) {
    el.removeAttribute('data-dummy');

    el.innerHTML = "<thead><tr><th data-dummy=2 data-repeat=3><th></tr></thead>\n      <tbody><tr data-repeat=3><td data-dummy=4 data-repeat=3></td></tr></tbody>";
  });

  // repeater support
  Array.from(document.querySelectorAll('[data-repeat]'))
    .sort(function (a, b) { return a.compareDocumentPosition(b) & 2 ? -1 : 1; })
    .forEach(function (el) {
      var amount = el.getAttribute('data-repeat');
      el.outerHTML = Utils.repeat(el.outerHTML, Utils.rand(amount.split(',')[0], amount.split(',')[1]) || 4);
    });

  // image support
  document.querySelectorAll('img[data-dummy]').forEach(function (el) {
    el.src = Dummy$1.src(el.getAttribute('data-dummy'), el);

    el.removeAttribute('data-dummy');
  });

  var dummyTextEls = Array.from(document.querySelectorAll('[data-dummy]'));

  // prevent page translation to latin containing majority dummy text
  var meta = document.createElement('meta');
  meta.name = 'google';
  meta.content = 'notranslate';
  dummyTextEls.length && document.querySelector('head').appendChild(meta);

  // text support
  dummyTextEls
    .sort(function (a, b) { return a.compareDocumentPosition(b) & 2 ? -1 : 1; })
    .forEach(function (el) {
      el.innerHTML += Dummy$1.text(el.getAttribute('data-dummy'));
    });

};

if(document && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', updateDom);
}

Dummy$1.updateDom = updateDom;

return Dummy$1;

})));
});

var Plugin = function () {};

Plugin.install = function (Vue, options) {
  if (Plugin.installed) {
    return;
  }

  var directive = function (el, binding) {
    if(!el) {
      return;
    }

    var args = (typeof binding.value == 'string' ? binding.value : binding.expression) || '';

    if(el.nodeName.toLowerCase() === 'img') {
      el.src = dummy.src(args, el);
    } else {
      el.innerHTML += dummy.text(args);
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

})));
