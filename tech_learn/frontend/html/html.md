# HTML基础知识

## 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

## 常用标签
1. 标题标签 `<h1>` 到 `<h6>`
2. 段落标签 `<p>`
3. 链接标签 `<a href="">`
4. 图片标签 `<img src="" alt="">`
5. 列表标签 `<ul>`, `<ol>`, `<li>`

## 排版标签
```html
<h1 align="left/center/right">head</h1>
<p align="left/center/right">paragraphy</p>
<hr size="" width="" align="" color="" noshade/>
<br />
<div>单独占据一行 容器级标签</div>
<span>不单独占据一行 文本级标签</span>
<center>
    <p>都居中</p>
</center>
<pre>
预
格
式
化
</pre>
```

## 字体标签
```html
转义字符&
    &nbsp; 空格non-breaking spacing
    &lt; 小于号<
    &gt; 大于号>
    &amp; 符号&
    &#32464; 文字绐。其实，#32464是汉字绐的unicode编码。
    
<u></u> 下划线标记
<s></s>或<del></del> 删除线标记
<i></i>或<em></em> 斜体标记
    
上标<sup></sup>
下标<sub></sub>
```

## 超链接
```html
外部链接
锚链接
<a name="top" id="top"></a>
<a href="#top">回到顶部</a>
邮箱链接
```
href：目标URL
title：悬停文本。
name/id：主要用于设置一个锚点的名称。
target：告诉浏览器用什么方式来打开目标页面。target属性有以下几个值：
_self：在同一个网页中显示（默认值）
_blank：在新的窗口中打开。
_parent：在父窗口中显示

## 表单元素
```html
<form action="/submit" method="post">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name">
    
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">提交</button>
</form>
```

## 语义化标签
1. `<header>` 页眉
2. `<nav>` 导航栏
3. `<main>` 主要内容
4. `<article>` 独立内容
5. `<section>` 文档中的节
6. `<aside>` 侧边栏
7. `<footer>` 页脚

## 表格
```html
<table>
  <thead>
    <tr>
      <th>表头1</th>
      <th>表头2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据1</td>
      <td>数据2</td>
    </tr>
  </tbody>
</table>
```

## 多媒体
```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  您的浏览器不支持音频元素。
</audio>

<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  您的浏览器不支持视频元素。
</video>
```

## HTML5新特性
1. 语义化标签：`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
2. 表单增强：新增`<input>`类型（email, url, number, range, date等）
3. 多媒体支持：`<audio>`和`<video>`标签
4. 本地存储：localStorage和sessionStorage
5. Web Workers：后台运行JavaScript
6. WebSocket：全双工通信
7. 地理位置：Geolocation API
8. Canvas和SVG：图形绘制

## HTML5表单验证
```html
<input type="email" required>
<input type="url" required>
<input type="number" min="1" max="10">
<input type="date" min="2023-01-01">
<input type="text" pattern="[A-Za-z]{3}">
```

## Web存储
```javascript
// localStorage
localStorage.setItem('key', 'value');
let data = localStorage.getItem('key');

// sessionStorage
sessionStorage.setItem('key', 'value');
let sessionData = sessionStorage.getItem('key');
```

## Web Workers
```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage('Start working');

worker.onmessage = function(e) {
  console.log('Message received from worker:', e.data);
};

// worker.js
self.onmessage = function(e) {
  console.log('Message received from main:', e.data);
  self.postMessage('Work done');
};
```

## Web组件
1. Custom Elements：创建自定义HTML元素
2. Shadow DOM：封装样式和行为
3. HTML Templates：定义可重用的HTML模板
4. HTML Imports：导入HTML文档

## Canvas
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, 150, 75);
</script>
```

## SVG
```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

## 多媒体
```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  您的浏览器不支持音频元素。
</audio>

<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  您的浏览器不支持视频元素。
</video>
```

## 框架
```html
<iframe src="https://example.com" width="600" height="400"></iframe>
```