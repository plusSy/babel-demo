var babel = require('babel-core');

var res = babel.transform("code();", {});

console.log('re', res);