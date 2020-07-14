export default function ({types: t}) {
  // plugin contents
  return {
    visitor: {
      FunctionDeclaration (path, state) {
        console.log(state.opts)
      },
      // visitor contents
      BinaryExpression(path, state) {
        // ...
        if (path.node.operator !== "===") return
        
        // path.node.left = t.stringLiteral("bar");
        path.node.right = t.stringLiteral("foo");

      }
    }
  }
}