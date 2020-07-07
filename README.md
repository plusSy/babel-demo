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



