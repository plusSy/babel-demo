const template = require("babel-template");
const generate = require("babel-generator");
const t = require("babel-types");

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE)
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
})


let result = generate.default(ast).code;

console.log(result)