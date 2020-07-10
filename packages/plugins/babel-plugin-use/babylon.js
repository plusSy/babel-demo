import * as babylon from "babylon"
// let babylon  = require("babylon");

const code = `function suqare (n) {
  return n * n;
}`;

const result = babylon.parse(code, {
  sorceType: 'module'
});

console.log(result);
