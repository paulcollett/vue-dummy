var fs = require('fs');
var rollup = require('rollup');
var buble = require('rollup-plugin-buble');

//https://github.com/rollup/rollup-plugin-node-resolve
var resolve = require('rollup-plugin-node-resolve');
//var commonjs = require('rollup-plugin-commonjs'); // needed as dummyjs is commonjs, not a module

rollup.rollup({
  input: 'src/index.js',
  plugins: [buble(), resolve()]
})
.then(bundle =>
  bundle.generate({
    format: 'iife',
    name: 'VueDummy'
  }).then(({code}) => write('dist/vue-dummy.js', code, bundle))
);

rollup.rollup({
  input: 'src/index.js',
  plugins: [buble()]
})
//https://github.com/rollup/rollup/wiki/pkg.module
.then(bundle =>
  bundle.generate({
    format: 'es'
  }).then(({code}) => write('dist/vue-dummy.es2015.js', code, bundle))
)
.then(bundle =>
  bundle.generate({
    format: 'cjs'
  }).then(({code}) => write('dist/vue-dummy.cjs.js', code, bundle))
);

function write(dest, code, bundle) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
