const babylon = require('babylon');
const traverse = require('babel-traverse');

const code = `function suqare (n) {
  return n * n;
}`;

const ast = babylon.parse(code);


traverse.default(ast, {
  enter (path) {
    if (
      path.node.type === "Identifier" &&
      path.node.name === "n"
    ) {
      path.node.name = "x";
    }
  }
})

// console.log(ast.program.body[0].body.body[0].argument.left)