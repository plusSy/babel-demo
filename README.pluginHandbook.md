# babel plugin handbook
> 如何为 Babel 创建插件。

## 介绍

Babel 是一个通用的多功能的 JavaScript 编译器. 此外他还拥有众多模块可用于不同形式的静态分析.

> 静态分析是在不需要执行代码的前提下对代码进行分析的处理过程(执行代码的同时进行代码分析即是动态分析).静态分析的目的是多种多样的,可以用于语法检查,编译,代码高亮,代码转换,优化,压缩等场景.

你可以使用Babel创建多种类型的工具来帮助你更有效率并且写出更高的程序

> 在 Twitter 上关注 [@thejameskyle](https://twitter.com/thejameskyle)，第一时间获取更新。

## 基础

Babel 是 JavaScript 编译器，更确切地说是源码到源码的编译器，通常也叫做“转换编译器（transpiler）”。 意思是说你为 Babel 提供一些 JavaScript 代码，Babel 更改这些代码，然后返回给你新生成的代码。

### 抽象语法树(AST)

这个处理过程中的每一步都涉及到或者操作 抽象语法树 也称 AST

> Babel 使用一个基于 [ESTree](https://github.com/estree/estree) 并修改过的 AST，它的内核说明文档可以在[这里]([https://github](https://github/). com/babel/babel/blob/master/doc/ast/spec. md)找到。

```js
function square (n) {
    return n * n;
}
```

[AST Explorer](http://astexplorer.net/) 可以让你对 AST 节点有一个更好的感性认识。 [这里](http://astexplorer.net/#/Z1exs6BWMq)是上述代码的一个示例链接。

这个程序可以被表示成如下的一棵树：

```js
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```

或是如下所示的 JavaScript Object(对象)

```js
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```

你会留意到AST每一层都拥有相同的结构:

```js
{
    type: "FunctionDeclaration",
    id: {...},
    params: [...],
    body: {...}
}
```

```js
{
    type: "Identifier",
    name: ...
}
```

```js
{
    type: "BinaryExpression",
    operator: ...,
    left: {...},
    right: {...}
}
```

> **注意:** 出于简化的目的移除了某些属性

这样的每一层结构也被叫做**节点(Node)** .一个AST可以由单一的节点或是成百上千的节点构成.他们组合在一起可以描述用于静态分析的程序语法.

每一个节点都有如下所示的接口(Interface):

```js
interface Node {
    type: string;
}
```

字符串形式的`type` 字段表示节点的类型(如: `"FunctionDeclaratio"`,`"Identifier"`,或 `"BinaryExpression"`).每一种类型的节点定义了一些附加属性用来进一步描述该节点的类型.

Babel 还为每个节点额外生成了一些属性,用于描述该节点在原始代码中的位置.

```js
{
    type: ...,
    start: 0,
    end: 38,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 3,
            column: 1
        }
    },
    ...
}
```

每一个节点都会有 `start`和`end`和`loc`这几个属性.

### Babel的处理步骤

Babel 的三个主要处理步骤分别是: **解析（parse）**,**转换（transform）**,**生成（generate）**.

#### 解析

**解析**步骤接收代码并输出AST.  这个步骤分为两个阶: [**词法分析（Lexical Analysis） **](https://en.wikipedia.org/wiki/Lexical_analysis)和 [**语法分析（Syntactic Analysis）**](https://en.wikipedia.org/wiki/Parsing).

##### 词法分析























