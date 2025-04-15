# CSS-advanced



## 项目配置

### 基本配置

在项目根目录下创建 `postcss.config.js`：

```js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 versions', '> 1%'], // 浏览器兼容性范围
    }),
    require('cssnano')({
      preset: 'default', // 使用默认的压缩配置
    }),
  ],
};
```

在 `package.json` 中添加以下脚本：

```json
{
  "scripts": {
    "build": "sass src/styles/main.scss dist/styles/main.css && postcss dist/styles/main.css -o dist/styles/main.css"
  }
}
```

运行以下命令，一次性完成 Sass 编译和 PostCSS 处理：

```bash
npm run build
```



### Vite

配置 `vite.config.js`：

在项目根目录下创建 `.browserslistrc` 文件：

```
last 2 versions
> 1%
```

or：在 `package.json` 中定义在 `package.json` 中添加 `browserslist` 字段：

```json
{
  "browserslist": [
    "last 2 versions",
    "> 1%"
  ]
}
```

```js
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables" as *;`, // 全局引入变量
      },
    },
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano(),
      ],
    },
  },
});
```

运行 Vite：

```
npm run dev
```



## Sass

Sass 是一个 CSS 预处理器, 扩展了 CSS3，增加了变量variables、嵌套nested rules、混合mixins、继承extend、模块化等特性。Sass 文件后缀为 **.scss**。

### 变量$

变量用于存储一些信息以重复使用：字符串、数字、颜色值、布尔值、列表、null 值

```scss
$variablename: value;
```

Sass 变量的作用域只能在当前的层级上有效果, 可以使用 `!global` 关键词来设置变量是全局的

```scss
// scss
$myColor: red;
h1 {
  $myColor: green;   // 只在 h1 里头有用，局部作用域
  color: $myColor;
}
h2 {
  color: $myColor;
  $myColor: blue !global;  // 全局作用域
}
p {
  color: $myColor;
}

// css
h1 {
  color: green;
}
h1 {
  color: red;
}
p {
  color: blue;
}
```

### 嵌套

Sass 允许你以遵循 HTML 相同视觉层次结构的方式嵌套 CSS 选择器。

```scss
// scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {	// 注意在nav里而不是ul
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

// css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

很多 CSS 属性都有同样的前缀，例如：font-family, font-size 和 font-weight ， text-align, text-transform 和 text-overflow。在 Sass 中，我们可以使用嵌套属性来编写它们.

```scss
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```

### 模块化@import/use/foward

可以安装不同的属性来创建一些代码文件，如：变量定义的文件、颜色相关的文件、字体相关的文件等。

```scss
@import filename;
// 如:
@import "variables";
@import "colors";
@import "reset";
```

如果你不希望将一个 Sass 的代码文件编译到一个 CSS 文件，你可以在文件名的开头添加一个下划线(**Partials**)。但是，在导入语句中我们不需要添加下划线。带下划线(模块化)与不带下划线(入口文件)的同名文件不能同时存在于同一个目录下，否则带下划线的文件将会被忽略。

```
styles/
├── _variables.scss
├── _mixins.scss
├── _buttons.scss
└── main.scss
```

`@use` 是 Sass 的新模块系统，旨在解决 `@import` 的全局作用域问题, 通过 `@use` 引入的文件中的变量、混合、函数等会被封装在模块的命名空间中，避免全局污染。

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;
body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';		// @import 'base'
.inverse {
  background-color: base.$primary-color;	// $primary-color
  color: white;
}

// styles.css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
.inverse {
  background-color: #333;
  color: white;
}
```

`@forward` 是 Sass 的一个模块系统功能，用于将多个模块的成员（变量、混合、函数等）集中到一个文件中，方便其他文件统一引入。它与 `@use` 类似，但更适用于模块的重新导出和组合。

```
styles/
├── _colors.scss
├── _typography.scss
├── _layout.scss
├── _index.scss
└── main.scss
```

```scss
// _index.scss
@forward 'colors';
@forward 'typography';
@forward 'layout';

// main.scss
@use 'index';
body {
  color: index.$primary-color;
  font-size: index.$base-font-size;
}
```





### 混入@mixin&include

@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。@include 指令可以将混入（mixin）引入到文档中。(类似函数)

```scss
// scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}

// css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
}
.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
}
.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
}
```



### 继承@extend

@extend 指令告诉 Sass 一个选择器的样式从**另一选择器**继承。如果一个样式与另外一个样式几乎相同，只有少量的区别，则使用 @extend 就显得很有用。

```scss
// scss
.button-basic  {
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
}
.button-report  {
  @extend .button-basic;
  background-color: red;
}
.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}

// css
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
}
.button-report  {
  background-color: red;
}
.button-submit  {
  background-color: green;
  color: white;
}
```



### 运算

```scss
// scss
@use "sass:math";

.container {
  display: flex;
}
article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}
aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}

// css
.container {
  display: flex;
}
article[role=main] {
  width: 62.5%;
}
aside[role=complementary] {
  width: 31.25%;
  margin-left: auto;
}
```



### 函数

```scss
// scss
@function calculate-rem($px) {
  @return $px / 16 * 1rem;
}
body {
  font-size: calculate-rem(16);
}

// css
body {
  font-size: 1rem;
}
```
```scss
// scss
@mixin responsive($min: null, $max: null) {
  @if $min and $max {
    @media (min-width: $min) and (max-width: $max) {
      @content;
    }
  } @else if $min {
    @media (min-width: $min) {
      @content;
    }
  } @else if $max {
    @media (max-width: $max) {
      @content;
    }
  }
}

.container {
  @include responsive(768px, 1024px) {
    width: 100%;
  }
}

// css
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 100%;
  }
}
```
```scss
// scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 100px * $i;
  }
}

// css
.item-1 {
  width: 100px;
}
.item-2 {
  width: 200px;
}
.item-3 {
  width: 300px;
}
```





## PostCSS

PostCSS 是一种使用 JavaScript 插件转换 CSS 的工具。它允许开发人员通过自动执行重复性任务、添加供应商前缀和实施未来的 CSS 功能来增强其 CSS 工作流程。PostCSS 用作预处理器，但与 Sass 或 Less 不同的是，它是高度模块化和可定制的。用户可以从广泛的插件中进行选择，也可以创建自己的插件以满足特定需求。

- **Autoprefixer**：自动添加浏览器前缀。

  ```js
  module.exports = {
    plugins: [
      require('autoprefixer')({
        overrideBrowserslist: ['last 2 versions', '> 1%'],
      }),
    ],
  };
  ```

- **CSSNano**：压缩 CSS 代码。

  ```js
  module.exports = {
    plugins: [
      require('cssnano')({
        preset: 'default',
      }),
    ],
  };
  ```

- **PostCSS Preset Env**：允许使用未来的 CSS 语法。

  ```js
  module.exports = {
    plugins: [
      require('postcss-preset-env')({
        stage: 3, // 使用 Stage 3 的 CSS 特性
        features: {
          'nesting-rules': true, // 启用嵌套规则
        },
      }),
    ],
  };
  ```

- **自定义插件**

  ```js
  // 创建一个将 `px` 转换为 `rem` 的插件：
  const plugin = require('postcss').plugin;
  
  module.exports = plugin('px-to-rem', (options = {}) => {
    return (root) => {
      root.walkDecls((decl) => {
        if (decl.value.includes('px')) {
          decl.value = decl.value.replace(/(\d+)px/g, (match, p1) => `${p1 / 16}rem`);
        }
      });
    };
  });
  ```