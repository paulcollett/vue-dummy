import Dummy from 'dummyjs'

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
      el.src = Dummy.src(args, el);
    } else {
      el.innerHTML += Dummy.text(args);
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
