export default function ({type: t}) {
  return {
    pre (state) {
      this.catch = new Map()
    },
    visitor: {
      StringLiteral(path) {
        this.catch.set(path.node.value, 1)
      }
    },
    post(state) {
      console.log(this.catch)
    }
  }
}