# [生产部署](https://cn.vuejs.org/guide/best-practices/production-deployment.html#production-deployment)







## 模块打包器module bundler

### [Vite](https://cn.vitejs.dev/)

#### 安装和初始化项目

```bash
npm create vite@latest
npm init @vitejs/app
```

#### 项目结构

```bash
my-vite-vue-app/
├── node_modules/             # 项目依赖
├── public/                   # 静态资源（不会被 Vite 处理）
│   └── favicon.ico           # 网站图标
├── src/                      # 项目源代码
│   ├── views/                # 页面组件
│   │   └── HomeView.vue      # 首页
│   │   └── AboutView.vue     # 关于页面
│   │   └── UserView.vue      # 用户页面
│   │   └── SettingsView.vue  # 设置页面
│   ├── assets/               # 静态资源（会被 Vite 处理）
│   │   └── logo.png          # 图片等资源
│   ├── components/           # 通用组件
│   │   └── Navigation.vue    # 导航组件
│   ├── App.vue               # 根组件
│   ├── main.js               # 项目入口文件
│   └── style.css             # 全局样式
├── index.html                # 项目入口 HTML 文件
├── vite.config.js            # Vite 配置文件
├── package.json              # 项目依赖和脚本
└── README.md                 # 项目说明文件
```

#### **运行项目**

- 启动开发服务器：

  ```bash
  npm run dev
  ```

- 构建生产环境代码：

  ```bash
  npm run build
  ```

#### **基本配置**

- 修改 `vite.config.js` 文件，配置开发服务器、构建选项等。

  ```js
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  
  export default defineConfig({
    plugins: [vue()],
    server: {
      port: 3000,
      open: true,
    },
    resolve: {	// 配置路径别名，简化导入路径
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {	// 配置 CSS 预处理器
      preprocessorOptions: {
        scss: {	
          additionalData: `@import "src/styles/variables.scss";`, // 全局引入变量
        },
      },
    },
  });
  ```

- 修改 `package.json` 文件，定义项目的元数据、依赖、脚本等。

  ```json
  {
    "name": "my-vite-project",
    "version": "1.0.0",
    "description": "A Vite project",
    "scripts": {
      // 定义环境变量
      "dev": "vite", // 启动开发服务器 npm run dev
      "build": "vite build", // 构建生产环境代码 npm run build
      "preview": "vite preview", // 预览生产环境构建结果
      // 代码检查和格式化
      "lint": "eslint . --ext .vue,.js",	// 指定检查 .vue 和 .js 文件。
      "format": "prettier --write ." // 格式化当前目录下的所有文件，并直接写入更改
    },
    "dependencies": {	// 项目运行时依赖的包
      "vue": "^3.2.0"
    },
    "devDependencies": { // 项目开发时依赖的包
      "vite": "^4.0.0",
      "@vitejs/plugin-vue": "^4.0.0",
      "eslint": "^8.0.0",
      "eslint-plugin-vue": "^9.0.0",
      "prettier": "^2.0.0"
    }
  }
  ```

#### **环境变量**

- 使用 `.env` 文件管理环境变量。或在 `package.json` 的脚本中直接传递环境变量：`"dev": "VITE_API_URL=https://api.example.com vite",`

  ```
  VITE_API_URL=https://api.example.com
  ```

- 在代码中访问环境变量：

  ```js
  console.log(import.meta.env.VITE_API_URL);
  ```







## 代码检查ESLint&代码格式化Prettier



## 1. **基础阶段**

### 目标：掌握 ESLint 和 Prettier 的基本用法，能够配置和使用它们。

#### （1）**ESLint**

- **作用**：用于检查 JavaScript 代码的语法错误和风格问题。

- **安装**：

  bash

  复制

  ```
  npm install eslint --save-dev
  ```

- **初始化配置**：

  bash

  复制

  ```
  npx eslint --init
  ```

  根据提示选择配置（如使用 Vue、React、TypeScript 等）。

- **配置文件**：生成 `.eslintrc.js` 或 `.eslintrc.json`。

  javascript

  复制

  ```
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  };
  ```

- **运行 ESLint**：

  bash

  复制

  ```
  npx eslint .
  ```

#### （2）**Prettier**

- **作用**：用于格式化代码，确保代码风格一致。

- **安装**：

  bash

  复制

  ```
  npm install prettier --save-dev
  ```

- **配置文件**：创建 `.prettierrc.js` 或 `.prettierrc.json`。

  javascript

  复制

  ```
  module.exports = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };
  ```

- **运行 Prettier**：

  bash

  复制

  ```
  npx prettier --write .
  ```

------

## 2. **中级阶段**

### 目标：掌握 ESLint 和 Prettier 的高级配置，能够解决冲突并优化工作流。

#### （1）**解决 ESLint 和 Prettier 的冲突**

- **安装插件**：

  bash

  复制

  ```
  npm install eslint-config-prettier eslint-plugin-prettier --save-dev
  ```

- **修改 ESLint 配置**：

  javascript

  复制

  ```
  module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended', // 添加 Prettier 插件
    ],
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 规则作为 ESLint 错误
    },
  };
  ```

#### （2）**集成到编辑器**

- **VSCode 配置**：

  1. 安装 ESLint 和 Prettier 插件。

  2. 在 `.vscode/settings.json` 中添加以下配置：

     json

     复制

     ```
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "eslint.validate": ["javascript", "vue"],
       "eslint.alwaysShowStatus": true
     }
     ```

#### （3）**自动化脚本**

在 `package.json` 中添加脚本：

json

复制

```
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js",
    "format": "prettier --write ."
  }
}
```

------

## 3. **高级阶段**

### 目标：深入理解 ESLint 和 Prettier 的工作原理，能够编写自定义规则和优化性能。

#### （1）**自定义 ESLint 规则**

- **编写自定义规则**：
  1. 创建一个 ESLint 插件。
  2. 在插件中定义自定义规则。
  3. 在项目中应用自定义规则。

#### （2）**优化 ESLint 性能**

- **忽略文件**：在 `.eslintignore` 中指定需要忽略的文件。

  复制

  ```
  node_modules/
  dist/
  ```

- **缓存**：启用 ESLint 缓存。

  bash

  复制

  ```
  npx eslint . --cache
  ```

#### （3）**Prettier 高级配置**

- **支持更多语言**：配置 Prettier 支持 HTML、CSS、JSON 等文件。

  json

  复制

  ```
  {
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "html"
        }
      }
    ]
  }
  ```