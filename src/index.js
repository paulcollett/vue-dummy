// Future Support
//import DummyJs from 'dummyjs'

const DummyJS = (() => {

  const _rand = (min, max) => {
    if(!min || !max) return min;
    min = Math.floor(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // repeat polyfill
  const _repeat = (str, count) => {
    return ''.repeat ? ('' + str).repeat(count) : ((str, count, rpt) => {
      for (let i = 0; i < count; i++) rpt += str;

      return rpt;
    })(str + '', Math.floor(count), '');
  };

  const text = (argString) => {
    let wordCount = argString.split(',');
    wordCount = _rand(wordCount[0], wordCount[1]) || 10;

    let lib = 'lorem ipsum dolor sit amet consectetur adipiscing elit nunc euismod vel ' +
      'dolor nec viverra nullam auctor enim condimentum odio laoreet libero ' +
      'libero tincidunt est sagittis curabitur vitae';

    if(wordCount > 3) lib += (' ' + 'a in id id at');

    const libRepeat = Math.ceil(wordCount/lib.split(' ').length);

    lib = _repeat(lib, libRepeat).split(' ').sort(() => 0.5 - Math.random()).slice(0, wordCount).join(' ');

    return lib.charAt(0).toUpperCase() + lib.slice(1);
  };

  const src = (argString, el) => {
    let size = '404';

    if(argString) {
      size = argString;
    } else if(el) {
      size = [parseInt(el.getAttribute('width') || el.offsetWidth), parseInt(el.getAttribute('height') || el.offsetHeight)].filter((v) => {return !!v}).join('x');
      size =  size || (el.parentNode && el.parentNode.offsetWidth) || '404';
    }

    // split size to allow for random ranges
    size = (size + '').split('x').map((a)=> _rand(a.split(',')[0], a.split(',')[1]));

    const w = size[0];
    const h = (size[1]||size[0]);
    const text = (el.getAttribute('data-text') || (w + '×' + h));
    const bgColor = (el.getAttribute('data-color') || '#ccc');
    const textColor = (el.getAttribute('data-text-color') || '#888');
    const fontSize = (w / 3.5 / (text.length * 0.3)) - text.length;

    return 'data:image/svg+xml,'
      + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+ w + 'px" height="' + h + 'px">'
      + '<rect x="0" y="0" width="100%" height="100%" fill="' + bgColor + '"/>'
      + '<line opacity="0.5" x1="0%" y1="0%" x2="100%" y2="100%" stroke="' + textColor + '" stroke-width="2" />'
      + '<line opacity="0.5" x1="100%" y1="0%" x2="0%" y2="100%" stroke="' + textColor + '" stroke-width="2" />'
      + '<text stroke="' + bgColor + '" stroke-width="2em" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="'+fontSize+'">' + text + '</text>'
      + '<text fill="' + textColor + '" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="'+fontSize+'" font-family="sans-serif">' + text + '</text>'
      + '</svg>');
  }

  return {
    text: text,
    src: src
  };
})();


const Plugin = function () {}

Plugin.install = function (Vue, options) {
  if (Plugin.installed) {
    return;
  }

  const directive = (el, binding) => {
    if(!el) {
      return;
    }

    const args = (typeof binding.value == 'string' ? binding.value : binding.expression) || '';

    if(el.nodeName.toLowerCase() === 'img') {
      el.src = DummyJS.src(args, el);
    } else {
      el.innerHTML += DummyJS.text(args);
    }
  };

  Vue.directive('dummy', {
    // called when the bound element has been inserted into its parent node
    inserted: directive
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

export default Plugin;
