var fs = require('fs');
var rollup = require('rollup');
var buble = require('rollup-plugin-buble');

//https://github.com/rollup/rollup-plugin-node-resolve
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs'); // needed as dummyjs is commonjs, not a module

rollup.rollup({
  input: 'src/index.js',
  plugins: [buble(), resolve(), commonjs()]
})
.then(bundle =>
  bundle.generate({
    format: 'umd',
    name: 'VueDummy'
  }).then(({code}) => write('dist/vue-dummy.js', code, bundle))
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
