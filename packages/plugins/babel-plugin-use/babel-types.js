const babylon = require("babylon");
const traverse = require("babel-traverse");
const t = require("babel-types");

const code = `function suqare (n) {
  return n * n;
}`;

const ast = babylon.parse(code);


traverse.default(ast, {
  enter (path) {
    if ( t.isIdentifier(path.node, {name: 'n'})) {
      path.node.name = "x";
    }
  }
})



// Builders
let res = t.binaryExpression("*", t.identifier("a"), t.identifier("b"))

console.log(res)


// Validators
console.log(t.isBinaryExpression(res, { operator: "*" }))

console.log(t.assertBinaryExpression(res))

// console.log(ast.program.body[0].body.body[0].argument.left)