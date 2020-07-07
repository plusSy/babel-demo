# babel demo

## 安装babel

### babel-cli

> Babel 的 CLI 是一种在命令行下使用Babel编译文件的简单方法

全局安装一下

```$ npm install --global bable-cli  ```
我们试着来编译一下第一个文件

```$ babel my-file.js```

这将把编译后的结果直接输出到终端. 使用`--out-file`或者`-o`可以将结果写入到指定的文件

```javascript
$ babel my-file.js --out-file out-file.js
或者
$ babel my-file.js -o out-file.js
```

如果 我们想把一个目录整个编译成一个新的目录,可以使用 `--out-dir` 或者 `-d`

```javascript
$ babel src --out-dir lib
或者
$ babel src -d lib
```

### 项目内运行 babel cli

> 在项目中安装babel cli 的好处
>
> 1. 在同一台机器上的不同项目或许会依赖不同版本的Babel 并允许有选择的更新
> 2. 这意味着你对工作环境没有隐式依赖,这让你的项目有很好的的可移植性并且易于安装

需要在项目跟目录安装 Babel cli 可以运行

```javascript
$ npm install --save-dev babel-cli
```

> **注意** : 如果你想卸载全局安装的Babel的话,可以执行
>
> ```javascript
> $ npm uninstall -g babel-cli
> ```

安装完成后, 你的`package.json` 应该如下所示:

```json
{
  "name": "babel-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0"
  }
}
```

现在,我们不直接从命令行运行Babel了, 取而代之我们将把运行命令写在j`package.json`里面的 ` scripts` 属性里面,这样我们可以使用本地版本. 代码如下:

```json
"scripts": {
    "build": "babel src -d lib",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

现在 可以在终端里运行:

```javascript
$ npm run build
```

这将以与之前同样的方式运行Babel,但这一次我们是用的是本地Babel

### babel-register

> 下一个常用的运行Babel的方法是通过 `babel-register`.这种方法只需要引入文件就可以运行Babel,或许能更好的融入你的项目设置.
>
> 但请注意这种方法不并不适合正式产品环境使用.直接部署用此方式编译不是好的做法.在部署之前预先编译会更高.不过用在构建脚本或是其他本地运行的脚本中是非常合适的.

让我们现在项目中创建`index.js` 文件.

```javascript
console.log('Hello word!');
```

如果我们用`node index.js` 来运行他是不会使用Babel来编译的.所以我们要设置 `babel-register`.

首先我们安装 `babel-register`

```javascript
$ npm install --save-dev babel-register
```

接着在项目中创建 `register.js`文件 并添加如下代码

```javascript
require('babel-register');
require('./index.js');
```

这样就可以把Babel注册到Node的模块系统中并开始编译其中`require`的所有文件.

现在我们可以使用`register.js`来代替 `node index.js` 来运行

```javascript
$ node register.js
```

> **注意:** 你不能再要编译的文件内同时注册Babel,因为 node 会在Babel编译它之前就将它执行
>
> ```javascript
> require("babel-register"); // 未编译的: console.log("Hello Word!");
> ```

### babel-node

如果要使用 `node` CLI 来运行代码,那么整合Babel最简单的方式就是使用`babel-node`  cli, 它是 `node` cli 的替代品.

但请注意这种方法并不适合正式产品环境使用.直接部署用此方式编译的代码不是好的做法,在部署之前预先编译好.不过用在构建脚本或是其他本地运行的脚本中是非常合适的.

首先,确保 `babel-node` 已经安装了.

```javascript
$ npm install --save-dev babel-node
```

然后用`babel-node` 来替换`node` 运行所有的代码.

如果用 `npm scripts` 的话只需要这样做:

```json
{
    "scripts": {
        "script-name": "babel-node scripts.js"
    }
}
```

要不然的话你需要写全`babel-node` 的路径

```javascript
+ ./node_modules/.bin/babel-node scripts.js
```

> **提示:** 你可以使用 `npm run`

### babel-core

> 如果你需要以编程的方式来使用 Babel，可以使用 `babel-core` 这个包。

首先安装 `babel-core`

```javascript
$ npm install --save-dev babel-core
```

```js
var babel = require("babel-core");
```

字符串形式的`JavaScript` 代码可以直接使用 `babel.transform` 来编译

```js
babel.transform("code();", options);

// => {code, map, ast}
```

如果是文件的话,可以使用异步api:

```js
babel.transformFile("filename.js", options, function (err, result) {
    result; // => {code, map, ast}
})
```

或者是同步api:

```js
babel.transformSync("filename.js", options);

// => {code, map, ast}
```

要是已经有一个Babel AST了就可以直接从AST 进行转换:

```js
babel.transformFormAst(ast, code, options)

// => {code, map, ast}
```

对于上述所有方法, `options` 指的都是 [ http://babeljs.io/docs/usage/options/]( http://babeljs.io/docs/usage/options/)



## 配置 Babel

到目前为止,通过运行 Babel我们并没能"翻译"代码,而仅仅是把代码从一处拷贝到另一处,这是因为我们还没有对Babel进行配置

> 由于Babel 是一个可以通过各种花样去使用的通用编译器,因此默认情况下它反而什么都不做.你必须明确地告诉Babel应该要做什么.

你可以通过安装插件(plugins)或预设(presets, 也就是一组插件)来指示 Babel去做什么事情.

### .babelrc

在我们告诉 Babel 该做什么之前，我们需要创建一个配置文件。你需要做的就是在项目的根路径下创建 `.babelrc` 文件。然后输入以下内容作为开始：

```js
{
    "presets": [],
    "plugins": []
}
```

这个文件就是用来让 Babel 做你要它做的事情的配置文件

> **注意: ** 尽管你也可以用其他方式给 Babel 传递选项，但 `.babelrc` 文件是约定也是最好的方式

### babel-preset-es2015

我们先从让 Babel 把 ES2015（最新版本的 JavaScript 标准，也叫做 ES6）编译成 ES5（现今在大多数 JavaScript 环境下可用的版本）开始吧。

我们需要安装 "es2015" Babel 预设：

```js
$ npm install --save-dev babel-preset-es2015
```

我们来修改

```js
{
    "presets": [
        "es2015"
    ],
    "plugins": []
}
```

### babel-preset-react

设置 React 一样,只需要安装这个预设

```js
$ npm install --save-dev babel-preset-react
```

然后在 `.babelrc` 文件里补充:

```js
{
    "presets": [
        "es2015",
        "react"
    ],
    "plugins": []
}
```

### babel-preset-stage-X

JavaScript 还有一些提案，正在积极通过 TC39（ECMAScript 标准背后的技术委员会）的流程成为标准的一部分。

这个流程分为 5（0－4）个阶段。 随着提案得到越多的关注就越有可能被标准采纳，于是他们就继续通过各个阶段，最终在阶段 4 被标准正式采纳。

以下是4 个不同阶段的（打包的）预设：

+ `babel-preset-stage-0`
+ `babel-preset-stage-1`
+ `babel-preset-stage-2`
+ `babel-preset-stage-3`

> 注意 stage-4 预设是不存在的因为它就是上面的 `es2015` 预设.

以上每种预设都依赖于紧随的后期阶段预设。例如，`babel-preset-stage-1` 依赖 `babel-preset-stage-2`，后者又依赖 `babel-preset-stage-3`。.

使用的时候只需要安装你想要的阶段就可以了：`

```js
$ npm install --save-dev babel-preset-stage-2
```

然后添加到 `.babelrc` 配置文件

```js
{
    "presets": [
        "es2015",
        "react",
        "stage-2"
    ]
}
```



## 执行Babel生成的代码

即便你已经用Babel编译了你的代码,但这还不算完.

### babel-polyfill

babel 几乎可以编译所有时新的 JavaScript 语法,但对于 APIS 来说并非如此.

比方说,下列含有箭头函数的需要编译的代码

```js
function addAll () {
    return Array.from(arguments).redece((a, b) => a + b)
}
```

解析后会变成这样

```js
"use strict";

function addAll() {
  return Array.from(arguments).redece(function (a, b) {
    return a + b;
  });
}
```

然而,它依然无法随处可用因为不是所有的JavaScript环境都支持 `Array.from`.

```js
Uncaught TypeError: Array.from is not a function
```

为了解决这个问题，我们使用一种叫做 [Polyfill（代码填充，也可译作兼容性补丁）](https://remysharp.com/2010/10/08/what-is-a-polyfill) 的技术。 简单地说，polyfill 即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。 能让你提前使用还不可用的 APIs，`Array.from` 就是一个例子。

Babel 用了优秀的 [core-js](https://github.com/zloirock/core-js) 用作 polyfill，并且还有定制化的 [regenerator](https://github.com/facebook/regenerator) 来让 generators（生成器）和 async functions（异步函数）正常工作。

要使用 Babel polyfill，首先用 npm 安装它：

```js
$ npm install --save-dev babel-polyfill
```

然后只需要在文件顶部导入 `polyfill` 就可以了

```js
import "bobel-polyfill";
```

### babel-runtime

为了实现 ECMAScript 规范的细节，Babel 会使用“助手”方法来保持生成代码的整洁。

由于这些助手方法可能会特别长并且会被添加到每一个文件的顶部，因此你可以把它们统一移动到一个单一的“运行时（runtime）”中去。

通过安装 `babel-plugin-transform-runtime` 和 `babel-runtime` 来开始。

```js
$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime
```

现在,Babel会把这样的代码

```js
class Foo {
    method () {}
}
```

编译成:

```js
"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Foo = function () {
  function Foo() {
    (0, _classCallCheck3.default)(this, Foo);
  }

  (0, _createClass3.default)(Foo, [{
    key: "method",
    value: function method() {}
  }]);
  return Foo;
}();
```

这样就不需要把 `_classCallCheck` 和 `_createClass` 这两个助手方法放进每一个需要的文件里去了。

## 配置 Babel(进阶)

大多数人使用Babel的内建预设就足矣, 但是Babel提供了更多更细粒度的能力.

### 手动指定插件

Babel预设就是一些预先配置好的插件的集合,如果想做一些不一样的事情你会手动去设定插件,这和使用预设几乎完全相同.

首先安装插件

```js
$ npm install --save-dev babel-plugin-transform-es2015-classes
```

然后往 `.babelrc`文件添加`plugins`字段

```js
{
    "plugins": [
        "transfrom-es2015-classes"
    ]
}
```

这能让你对正在使用的转换器进行更细致的控制。

完整的官方插件列表请见 [Babel 插件页面](http://babeljs.io/docs/plugins/)。.

同时也别忘了看看[由社区构建的其他插件](https://www.npmjs.com/search?q=babel-plugin)。 如果你想学习如何编写自己的插件可以阅读 [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。

### 插件选项

很多插件也有选项用于配置他们自身的行为。 例如，很多转换器都有“宽松”模式，通过放弃一些标准中的行为来生成更简化且性能更好的代码。

要为插件添加选项，只需要做出以下更改：

```js
{
    "plugins": [
		["transform-es2015-calsses", {"loose": true}]
    ]
}
```

> **TODO:** 完善选项

### 基于环境自定义Babel

Babel 插件解决许多不同的问题。 其中大多数是开发工具，可以帮助你调试代码或是与工具集成。 也有大量的插件用于在生产环境中优化你的代码。

因此，想要基于环境来配置 Babel 是很常见的。你可以轻松的使用 `.babelrc` 文件来达成目的.

```js
{
    "presets": [
        "es2015"
    ],
    "plugins": [],
    "env": {
        "development": {
           	"plugins": [...]
        },
        "production": {
        	"plugins": [...]
        }
    }
}
```

Babel 将根据当前环境来开启 `env` 下的配置。

当前环境可以使用 `process.env.BABEL_ENV` 来获得. 如果`BABEL_ENV`不可用,将会替换成 `NODE_ENV`, 并且如果后者没有设置,那么缺省值是 `"development"`

#### Unix

```js
$ BABEL_ENV=production [COMMAND]
$ NODE_ENV=production [COMMAND]
```

#### Windows

```js
$ SET BABEL_ENV=production
$ [COMMAND]
```

> **注意:** [COMMAND] 指的是任意一个用来运行 Babel的命令 (如: `babel` , `babel-node` , 或者 `node` ,如果你使用了 register 钩子的话).
>
> **提示**: 如果你想要的让命令能后跨 unix 和 windows 平台的话,可以使用 `cross-env`

## 制作自己的预设(preset)

手动指定插件? 插件选项?环境特定设置?所有这些配置都会在你的项目里产生大量的重复工作.

为此,我们鼓励社区创建自己的预设,这可能是一个针对 node 版本的预设,或是适用于你整个公司的预设.

创建预设非常容易. 比方说你这样一个`.babelrc` 文件:

```js
{
    "presets": [
        "es2015",
        "react"
    ],
    "plugins": [
		"transform-flow-strip-types"
    ]
}
```

你要做的就是依循命名约定`babel-preset-*` 来创建一个新项目(请务必对这个命名约定保持责任心,也就是说不要滥用这个命名空间), 然后创建两个文件.

首先,创建一个`package.json`, 包括针对预设所必要的 `dependencies`

```json
{
  "name": "babel-preset-my-awesome-preset",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {},
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-plugin-transform-flow-strip-types": "^6.22.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1"
  }
}
```

然后创建`index.js` 文件用于导出`.babelrc` 的内容,使用对应的`require` 调用来替换`plugins`/`presets` 字符串

```js
module.exports = {
    presets: [
        require('babel-preset-es2015'),
        require('babel-preset-react')
    ],
    plugins: [
        require('babel-plugin-transform-flow-strip-types')
    ]
}
```

然后只需要发布到 npm 于是你就可以像其它预设一样来使用你的预设了。或者使用以下命令来建立连接

```js
$ npm install --save-dev <path>
```

创建连接后

```js
{
  "name": "babel-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "",
    "core": "babel-node ./babel-core.js",
    "build": "babel src -d lib",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-plugin-transform-es2015-classes": "^6.24.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-my-awesome-preset": "file:packages/preset/babel-preset-my-awesome-preset",
    "babel-register": "^6.26.0",
    "babel-runtime": "^6.26.0"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0"
  }
}
```

## Babel 和其他工具

一旦你掌握的窍门，安装 Babel 还是十分简明的，不过和其他工具搭配在一起就会变得困难多了。 不过我们一直在与其他项目密切合作以确保这种体验尽可能简单。

### 静态分析工具

新标准为语言带来了许多新的语法，静态分析工具正在将此利用起来。

#### 语法检查(Linting)

[ESLint](http://eslint.org/) 是最流行的语法检查工具之一，因此我们维护了一个官方的 [`babel-eslint`](https://github.com/babel/babel-eslint) 整合软件包。

首先安装 `eslint` 和 `babel-eslint`

```js
$ npm install --save-dev eslint babel-eslint
```

然后创建或使用项目现有的 `.eslintrc` 文件并设置 `parser` 为 `babel-eslint`。



