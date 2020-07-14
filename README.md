# babel 初识

## 配置类型

babel 有两种文件配置类型, 这两种可以同时使用也可以单独使用.

+ 项目拓展配置
  + 创建 `babel.config.json`  文件, 进行拓展配置
+ 文件内的配置
  + 创建 `.babelrc.json` 文件, 进行拓展配置
  + 在 `project.json` 文件里 添加 `"babel"` 属性,进行配置

### 项目拓展配置

在 Babel 7.x 版本, babel 新加了根目录 `root` 这个理念, 默认是当前工作目录. 对项目级拓展配置来说,babel 首先会找 `babel.config.json` 文件,或者是根目录里同级别的可支持的拓展,亦或是,开发者可以使用一个明确的 配置文件`configFile` ,去重写配置文件内容.


### [配置解读](https://github.com/plusSy/babel-demo/blob/master/README.userHandbook.md)

如何安装／配置 Babel 及相关内容。

### [插件解读](https://github.com/plusSy/babel-demo/blob/master/README.pluginHandbook.md)

Babel 是一个通用的多功能的 JavaScript 编译器. 此外他还拥有众多模块可用于不同形式的静态分析.

> 静态分析是在不需要执行代码的前提下对代码进行分析的处理过程(执行代码的同时进行代码分析即是动态分析).静态分析的目的是多种多样的,可以用于语法检查,编译,代码高亮,代码转换,优化,压缩等场景.

你可以使用Babel创建多种类型的工具来帮助你更有效率并且写出更高的程序

> 在 Twitter 上关注 [@thejameskyle](https://twitter.com/thejameskyle)，第一时间获取更新。

### 自定义 preset
配置解读 -> 制作自己的预设(preset)
### 自定义 plugin
插件解读 -> 编写你的第一个Babel插件


