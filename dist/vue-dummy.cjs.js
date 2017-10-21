'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Dummy = _interopDefault(require('dummyjs'));

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
      el.src = Dummy.src(args, el);
    } else if(nodeName === 'table') {
      var tableRow = function () { return ("<tr><td>" + (Dummy.text(3)) + "</td><td>" + (Dummy.text(3)) + "</td><td>" + (Dummy.text(3)) + "</td></tr>"); };
      el.innerHTML = "<thead>" + (tableRow().replace(/td>/g, 'th>')) + "</thead><tbody>" + (tableRow()) + (tableRow()) + (tableRow()) + "</tbody>";
    } else if(nodeName === 'ul' || nodeName === 'ol') {
      el.innerHTML += "<li>" + (Dummy.text(3)) + "</li><li>" + (Dummy.text(3)) + "</li><li>" + (Dummy.text(3)) + "</li>";
    } else {
      el.innerHTML += Dummy.text(args);
    }
  };

  Vue.directive('dummy', {
    // called when the bound element has been inserted into its parent node
    inserted: directive
  });

  Vue.directive('dummy-self', {
    inserted: function (el, binding) {
      el.outerHTML = Dummy.text(typeof binding.value == 'string' ? binding.value : binding.expression);
    }
  });

  var componentProps = 'i,img,image,t,txt,text'.split(',');
  var componentPropsObj = componentProps.reduce(function (c, v, i) { c[v] = true; return c }, {});

  Vue.component('dummy', {
    render: function (createElement) {
      var this$1 = this;

      var value = '';
      var renderImage = false;

      for (var i = 0; i < componentProps.length; i++) {
        if(typeof this$1[componentProps[i]] !== 'undefined') {
          value = this$1[componentProps[i]] + '';
          renderImage = componentProps[i][0] === 'i' || value.indexOf('x') > 0;
        }
      }

      return createElement(renderImage ? 'img' : 'span', {
        directives: [{
          name: renderImage ? 'dummy' : 'dummy-self',
          value: value
        }]
      });
    },
    props: componentPropsObj
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

module.exports = Plugin;
