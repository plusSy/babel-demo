const babylon = require("babylon");
const generate = require("babel-generator");

const code = `function square (n) {
  return n * n;
}`;

const ast = babylon.parse(code);


const result = generate.default(ast, {
  retainLines: false,
  compact: "auto",
  concise: false,
  quotes: "double"
}, code)

console.log(result)