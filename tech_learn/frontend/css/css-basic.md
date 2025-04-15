# 层叠样式表Cascading Style Sheets



## 使用

- 外部 CSS

  在 head 部分的 <link> 元素内包含对外部样式表文件的引用

  ```html
  <link rel="stylesheet" type="text/css" href="mystyle.css">
  ```

- 内部 CSS

  在 head 部分的 <style> 元素中进行定义

- 行内 CSS

  也称内联样式，在相关单个元素应用唯一的样式，具有最高优先级。



## --------




## 语法:选择器+声明块(属性+值)

CSS 规则集（rule-set）由选择器和声明块组成：

![image-20241202192814436](D:\Learning\Frontend\Note\image-20241202192814436.png)





## 选择器Selector

- 简单选择器（根据元素名称 、id 、类来选取元素）
- [组合器选择器](https://www.w3school.com.cn/css/css_combinators.asp)（根据它们之间的特定关系来选取元素）
- [伪类选择器](https://www.w3school.com.cn/css/css_pseudo_classes.asp)（根据特定状态选取元素）
- [伪元素选择器](https://www.w3school.com.cn/css/css_pseudo_elements.asp)（选取元素的一部分并设置其样式）
- [属性选择器](https://www.w3school.com.cn/css/css_attribute_selectors.asp)（根据属性或属性值来选取元素）



### 简单选择器

![image-20241202193705757](D:\Learning\Frontend\Note\image-20241202193705757.png)

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            p.center {
              text-align: center;
              color: red;
            }
            p.large {
              font-size: 300%;
            }
        </style>
    </head>
    <body>
        <h1 class="center">这个标题不受影响</h1>
        <p class="center">本段将是红色并居中对齐。(指定只有特定的 HTML 元素会受类的影响)</p>
        <p class="center large">本段将是红色、居中对齐，并使用大字体。(引用多个类)</p> 
    </body>
</html>
```

### 组合器选择器

![image-20241202194517511](D:\Learning\Frontend\Note\image-20241202194517511.png)

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            div > p {
              background-color: yellow;
            }
            
        </style>
    </head>
    <body>
        <h1>子选择器</h1>
        <p>子选择器 (>) 选择属于指定元素子元素的所有元素。</p>
        <div>
          <p>div 中的段落 1。</p>
          <p>div 中的段落 2。</p>
          <section><p>div 中的段落 3。</p></section> <!-- 非子但属后代 -->
          <p>div 中的段落 4。</p>
        </div>
        <p>段落 5。不在 div 中。</p>
        <p>段落 6。不在 div 中。</p>
    </body>
</html>
```

### 伪类选择器

伪类用于定义元素的特殊**状态**

```html
<style>
    selector:pseudo-class {
      property: value;
    }

    <!-- 所有p的首个i -->
    p i:first-child {
      color: blue;
    } 

    <!-- 首个p的所有i -->
    p:first-child i {
      color: blue;
    } 
</style>
```

### 伪元素选择器

伪元素用于设置元素**指定部分**的样式

```html
<style>
    selector::pseudo-element {
      property: value;
    }
</style>
```

[所有 CSS 伪类与伪元素](https://www.w3school.com.cn/css/css_pseudo_classes.asp)

### 属性选择器

```html
<style>
    element[attribute] {
      property: value;
    }
    [attribute...] {
      property: value;
    }
</style>
```

![image-20241202202005365](D:\Learning\Frontend\Note\image-20241202202005365.png)





## 属性Attribute

### 背景Background

- background-color
- background-image: url(...)
  - `background-size`：.../ contain(宽度和高度<=内容区域)/ cover(宽度和高度>=内容区域)	指定背景图像的大小
  - `background-origin`: padding-box/ content-box/ border-box 指定**背景图像**的位置
  - `background-clip`: padding-box/ content-box/ border-box 指定**背景**的**绘制**区域
- background-repeat: repeat-x/ repeat-y/ no-repeat/ ...;      某些图像应只适合水平或垂直方向上重复
- background-attachment: scroll/ fixed/ inherit/ ...;      指定背景图像是应该滚动还是固定的
- background-position: right top;
- ...
- **简写属性**  background: #ffffff url("tree.png") no-repeat right top;
- **多重背景**  用逗号隔开，图像会彼此堆叠，前面的设置最靠近观看者



### 边框Border

- border-style: dotted solid double dashed

- border-width: px pt em cm   （**pixels/16=em**）

- border-color

- **单独设置**  

  - border-bottom...
  - border-bottom-color...

- **简写属性**  border

  *上右下左*

- border-radius: 5px   设置圆角

- border-image     设置图像用作围绕元素的边框

  - `border-image-source`
  - `border-image-slice`
  - `border-image-width`
  - `border-image-outset`
  - `border-image-repeat`



### 外边距Margin

在任何定义的边框之外

**简写属性**  margin

**单独设置**  margin-bottom...

- auto - 浏览器来计算外边距
- *length* - 以 px、pt、cm 等单位指定外边距
- % - 指定以包含元素宽度的百分比计的外边距
- inherit - 指定应从父元素继承外边距



**外边距合并**：当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

- 当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并。
- 当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上 和/或 下外边距也会发生合并。
- 有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并。

**水平居中对齐元素**    margin: auto;



### 内边距Padding

*类似margin*



### 高度height 宽度width

height 和 width 属性设置的是**内容区域**（元素内边距、边框以及外边距内的区域）的高度或宽度，不包括内边距、边框或外边距。

`height` 和 `width` 属性可设置如下值：

- `auto` - 默认。浏览器计算高度和宽度。
- `*length*` - 以 px、cm 等定义高度/宽度。
- `%` - 以包含块的百分比定义高度/宽度。
- `initial` - 将高度/宽度设置为默认值。
- `inherit` - 从其父值继承高度/宽度。

`max-width/ ...: ` 可以改善浏览器对小窗口的处理





### 盒(框)模型Box Model

所有 HTML 元素都可以视为方框

![image-20241202234447635](D:\Learning\Frontend\Note\image-20241202234447635.png)

`width` 属性指定元素内容区域的宽度。内容区域是元素（盒模型）的内边距、边框和外边距内的部分。如果元素拥有指定的宽度，则添加到该元素的内边距会添加到元素的总宽度中。

#### box-sizing

```css
<div> 元素的宽度为 300px。但<div> 元素的实际宽度将是 350px（300px + 左内边距 25px + 右内边距 25px + 边框 0px）
div {
  width: 300px;
  padding: 25px;
}

若要将宽度保持为 300px，无论填充量如何，那么您可以使用 box-sizing 属性。这将导致元素保持其宽度。如果增加内边距，则可用的内容空间会减少。
div {
  width: 300px;
  padding: 25px;
  box-sizing: border-box;
}
```





### 轮廓Outline

与边框不同之处在于：轮廓是在元素边框之外绘制的，并且可能与其他内容重叠。同样，轮廓也不是元素尺寸的一部分；元素的总宽度和高度不受轮廓线宽度的影响。

- `outline-style`
  - `dotted` - 定义点状的轮廓。
  - `dashed` - 定义虚线的轮廓。
  - `solid` - 定义实线的轮廓。
  - `double` - 定义双线的轮廓。
  - `groove` - 定义 3D 凹槽轮廓。
  - `ridge` - 定义 3D 凸槽轮廓。
  - `inset` - 定义 3D 凹边轮廓。
  - `outset` - 定义 3D 凸边轮廓。
  - `none` - 定义无轮廓。
  - `hidden` - 定义隐藏的轮廓。
- `outline-color`
  - invert - 执行颜色反转（确保轮廓可见，无论是什么颜色背景）
  - ...
- `outline-width`
  - thin（通常为 1px）
  - medium（通常为 3px）
  - thick （通常为 5px）
  - 特定尺寸（以 px、pt、cm、em 计）
- **简写属性**    `outline`:`outline-width``outline-style`（必需）`outline-color`
- `outline-offset`属性在轮廓与元素的边缘边框之间添加空间



### Style

```css
style="attr:value; attr:value; ..."
```

[改变光标](https://www.w3school.com.cn/tiy/t.asp?f=css_cursor)    `style="cursor:..."`



### Display/Visibility 

#### display

不会占用空间

- none/ block/ inline
- inline-block   允许在元素上设置宽度和高度，将保留上下外边距/内边距, 但不换行

#### visibility

hidden、 visible;    占用空间



### 位置

#### 定位 position

- static

- relative    设置相对定位的元素的 top、right、bottom 和 left 属性将导致其偏离其正常位置进行调整

- fixed    相对于视口定位的top、right、bottom 和 left 属性，即使滚动页面也始终位于同一位置

- absolute    相对于最近的定位祖先(非static)元素top、right、bottom 和 left 属性进行定位（而不是相对于视口定位fixed）

- sticky    根据滚动位置在相对（`relative`）和固定（`fixed`）之间切换。起先它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）

```
  position: sticky;
  top: 0;
```

  

#### 重叠元素 z-index

较高堆叠顺序的元素始终位于具有较低堆叠顺序的元素之前

#### 剪裁 clip

剪裁绝对定位的元素	clip: rect(0px,60px,200px,0px)

#### 边界偏移bottom/ top/ left/ right


#### 浮动float

- left - 元素浮动到其容器的左侧
- right - 元素浮动在其容器的右侧
- none - 元素不会浮动（将显示在文本中刚出现的位置）。默认值。
- inherit - 元素继承其父级的 float 值

#### 清除浮动clear

- none - 允许两侧都有浮动元素。默认值
- left - 左侧不允许浮动元素
- right- 右侧不允许浮动元素
- both - 左侧或右侧均不允许浮动元素
- inherit - 元素继承其父级的 clear 值

如果一个元素比包含它的元素(clearfix)高，并且它是浮动的，它将“溢出”到其容器之外, 解决：

```css
.clearfix {
  overflow: auto;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
```



### 不透明度Opacity

取值范围为 0.0-1.0	值越低，越透明

使用 opacity 属性为元素背景添加透明度时，其所有子元素也将变为透明



### 溢出Overflow

- `visible` - (默认)溢出没有被剪裁 内容在元素框外渲染
- `hidden` - 溢出被剪裁 其余内容将不可见
- `scroll` - 溢出被剪裁 **添加滚动条**以查看其余内容
- `auto` - 与 `scroll` 类似，但仅在必要时添加滚动条



### 阴影Shadow

- `text-shadow`: h-shadow v-shadow blur color;
- `box-shadow`: h-shadow v-shadow blur spread color inset;



### 转换transforms

#### 2D转换

- `translate()`从其当前位置移动元素（根据为 X 轴和 Y 轴指定的参数）

- `rotate()`根据给定的角度顺时针或逆时针旋转元素

- `scale()`增加或减少元素的大小（根据给定的宽度和高度参数）

- `scaleX()`

- `scaleY()`

- `skew()`使元素沿 X 和 Y 轴倾斜给定角度

- `skewX()`

- `skewY()`

- `matrix()`把所有 2D 变换方法组合为一个

  ```css
  /*从其当前位置向右移动 50 个像素，并向下移动 100 个像素*/
  transform: translate(50px, 100px);
  /*顺时针旋转 20 度*/
  transform: rotate(20deg);
  /*增大为其原始宽度的两倍和其原始高度的三倍*/
  transform: scale(2, 3)
  /*沿 X 轴倾斜 20 度，同时沿 Y 轴倾斜 10 度*/
  transform: skew(20deg, 10deg);
  
  transform: matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  ```



#### 3D转换

- `rotateX()使元素绕其 X 轴旋转给定角度`
- `rotateY()`
- `rotateZ()`

![image-20241205234603301](D:\Learning\Frontend\Note\image-20241205234603301.png)



`transform-style `

规定如何在 3D 空间中呈现被嵌套的元素	flat~子元素将不保留其 3D 位置	preserve-3d~子元素将保留其 3D 位置



### 过渡Transition

- `transition`

```css
div {
  width: 100px;
  height: 100px;
  background: red;
  transition: width 2s, height 2s, transform 2s;	/* transition-duration  transition-property */
}

div:hover {
  width: 300px;
  height: 300px;
  transform: rotate(180deg);
}
```

- `transition-duration`

- `transition-property`

- `transition-delay`    规定过渡效果的延迟（以秒计）

  ```css
  div {
    transition-delay: 1s;
  }
  ```

- `transition-timing-function`    规定过渡效果的速度曲线

  - `ease` - 规定过渡效果，先缓慢地开始，然后加速，然后缓慢地结束（默认）
  - `linear` - 规定从开始到结束具有相同速度的过渡效果
  - `ease-in` -规定缓慢开始的过渡效果
  - `ease-out` - 规定缓慢结束的过渡效果
  - `ease-in-out` - 规定开始和结束较慢的过渡效果
  - `cubic-bezier(n,n,n,n)` - 允许您在三次贝塞尔函数中定义自己的值



### 动画Animation

- `@keyframes`
- `animation-name`
- `animation-duration`
- `animation-delay`
- `animation-iteration-count`
- `animation-direction` (需要animation-iteration-count)
  - `normal` - 动画正常播放（向前）。默认值
  - `reverse` - 动画以反方向播放（向后）
  - `alternate` - 动画先向前播放，然后向后
  - `alternate-reverse` - 动画先向后播放，然后向前
- `animation-timing-function`
- `animation-fill-mode`
  - `none` - 默认值。动画在执行之前或之后不会对元素应用任何样式。
  - `forwards` - 元素将保留由最后一个关键帧设置的样式值（依赖 animation-direction 和 animation-iteration-count）。
  - `backwards` - 元素将获取由第一个关键帧设置的样式值（取决于 animation-direction），并在动画延迟期间保留该值。
  - `both` - 动画会同时遵循向前和向后的规则，从而在两个方向上扩展动画属性。
- `animation`


  ```css
  /* 动画代码 */
  @keyframes example {
    0%   {background-color:red; left:0px; top:0px;}
    25%  {background-color:yellow; left:200px; top:0px;}
    50%  {background-color:blue; left:200px; top:200px;}
    75%  {background-color:green; left:0px; top:200px;}
    100% {background-color:red; left:0px; top:0px;}
  }
  
  /* 应用动画的元素 */
  div {
    width: 100px;
    height: 100px;
    position: relative;
    background-color: red;
    animation-name: example;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
  ```



###  object-fit 

告诉内容以不同的方式填充容器。比如“保留长宽比”或者“展开并占用尽可能多的空间”

- `fill` - 默认值。调整替换后的内容大小，以填充元素的内容框。如有必要，将拉伸或挤压物体以适应该对象。
- `contain` - 缩放替换后的内容以保持其纵横比，同时将其放入元素的内容框。
- `cover` - 调整替换内容的大小，以在填充元素的整个内容框时保持其长宽比。该对象将被裁剪以适应。
- `none` - 不对替换的内容调整大小。
- `scale-down` - 调整内容大小就像没有指定内容或包含内容一样（将导致较小的具体对象尺寸）



### 多列

- `column-count`属性规定元素应被划分的列数

- `column-gap`属性规定列之间的间隔

- `column-rule-style`属性规定列之间的规则(分割符)样式

- `column-rule-width`属性规定列之间的规则(分割符)宽度

- `column-rule-color`属性规定列之间的规则的颜色

- `column-rule`属性规定元素应跨越多少列

- `column-span`
   ```css
  /*规定了<h2> 元素应跨所有列*/
  h2 {
    column-span: all;
  }
  ```


- `column-width`属性为列指定建议的最佳宽度
- `columns`    用于设置 column-width 和 column-count 的简写属性










## --------



## 元素Element

元素里的**特别属性**



### 文本Text

<>...<>

![image-20241203001251899](D:\Learning\Frontend\Note\image-20241203001251899.png)

##### 文字溢出text-overflow

规定应如何向用户呈现未显示的溢出内容	clip/ ellipsis

##### 字换行word-wrap

允许长单词被打断并换行到下一行 break-word

##### 换行规则word-break

连字符处打断 keep-all 	任何字符处打断 break-all

##### writing-mode

规定文本行是水平放置还是垂直放置	horizontal-tb/ vertical-rl /vertical-lr(left right)





### 字体Font

![image-20241203001734087](D:\Learning\Frontend\Note\image-20241203001734087.png)



### 链接Link

四种链接状态分别是：

- `a:link` - 正常的，未访问的链接
- `a:visited` - 用户访问过的链接
- `a:hover` - 用户将鼠标悬停在链接上时
- `a:active` - 链接被点击时

hover 必须 link 和 visited 之后；active 必须在 hover 之后



### 列表List

- `list-style-type=none/circle/...` 属性指定列表项标记的类型
- `list-style-image` 属性将图像指定为列表项标记
- `list-style-position=inside/outside` 属性指定列表项标记（项目符号）的位置
- **简写属性**   list-style



### 表格Table

- `border-collapse` 属性设置是否将表格边框折叠为单一边框
- border-spacing 属性设置相邻单元格的边框间的距离（仅用于`border-collapse=separate`）
- empty-cells: show|hide|initial|inherit属性设置是否显示表格中的空单元格（仅用于`border-collapse=separate`）
- **响应式表格**:在 <table> 元素周围添加带有 `overflow-x:auto` 的容器元素（例如 <div>）
- caption{caption-side: top|bottom|initial|inherit;}设置表格标题的位置
- tableLayout: auto|fixed|initial|inherit; 属性用来显示表格单元格、行、列的算法规则



### 图片picture

```html
<picture>
  <source srcset="img_smallflower.jpg" media="(max-width: 400px)">
  <source srcset="img_flowers.jpg">
  <img src="img_flowers.jpg" alt="Flowers">
</picture>
```



## --------



### 计数器counter

- `counter-reset` - 创建或重置计数器
- `counter-increment` - 递增计数器值
- `content` - 插入生成的内容
- `counter()` 或 `counters()` 函数 - 将计数器的值添加到元素

```css
body {
  counter-reset: section;
}

h1 {
  counter-reset: subsection;
}

h1::before {
  counter-increment: section;
  content: "Section " counter(section) ". ";
}

h2::before {
  counter-increment: subsection;
  content: counter(section) "." counter(subsection) " ";
}
```



### 渐变gradient

- *线性渐变*（向下/向上/向左/向右/对角线）

  ```css
  background-image: [repeating-]linear-gradient(direction/angle, color-stop1, color-stop2, ...);
  /*
  direction~to bottom right/...
  angle~-90deg
  */
  ```

- *径向渐变*（由其中心定义）

  ```css
  background-image: [repeating-]radial-gradient(shape size at position, start-color, ..., last-color);
  /*
  shape~circle/ellipse
  size~closest-side/farthest-side/closest-corner/farthest-corner
  */
  ```

  

### 变量var

全局变量可以在整个文档中进行访问/使用，而局部变量只能在声明它的选择器内部使用。

如需创建具有全局作用域的变量，请在 :root 选择器中声明它。 :root 选择器匹配文档的根元素。

如需创建具有局部作用域的变量，请在将要使用它的选择器中声明它。

局部的变量会覆盖全局

```css
:root {
  --blue: #6495ed;
  --white: #faf0e6;
}

body { background-color: var(--blue); }

h2 { border-bottom: 2px solid var(--blue); }

.container {
  color: var(--blue);
  background-color: var(--white);
  padding: 15px;
}

button {
  background-color: var(--white);
  color: var(--blue);
  border: 1px solid var(--blue);
  padding: 5px;
}
```



## --------

## 响应式网页设计



### 媒体查询@media

```css
@media not|only mediatype and (expressions=mediafeature) and|,|or|not mediafeature) {
  CSS-Code;
}
```

**mediatype**

| all    | 用于所有媒体类型设备。                   |
| ------ | ---------------------------------------- |
| print  | 用于打印机。                             |
| screen | 用于计算机屏幕、平板电脑、智能手机等等。 |
| speech | 用于大声“读出”页面的屏幕阅读器。         |

**expressions=mediafeature**

`orientation: landscape`	横屏（仅在浏览器窗口的宽度大于其高度时才适用）

有关所有媒体类型和特性/表达式的完整概述，请在 [CSS 参考手册中参阅 @media 规则](https://www.w3school.com.cn/cssref/pr_mediaquery.asp)。





### 构建响应式视图

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
* {
  box-sizing: border-box;
}

/* 针对手机： */
[class*="col-"] {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  /* 针对平板电脑： */
  .col-s-1 {width: 8.33%;}
  .col-s-2 {width: 16.66%;}
  .col-s-3 {width: 25%;}
  .col-s-4 {width: 33.33%;}
  .col-s-5 {width: 41.66%;}
  .col-s-6 {width: 50%;}
  .col-s-7 {width: 58.33%;}
  .col-s-8 {width: 66.66%;}
  .col-s-9 {width: 75%;}
  .col-s-10 {width: 83.33%;}
  .col-s-11 {width: 91.66%;}
  .col-s-12 {width: 100%;}
}

@media only screen and (min-width: 768px) {
  /* 针对桌面： */
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}
}
</style>
<body>
  <div class="col-3 col-s-3 menu">

  <div class="col-6 col-s-9">

  <div class="col-3 col-s-12">
</body>
```






## --------



## 网站布局



### 弹性盒子Flexbox  一维布局

#### 父元素（容器）

`.flex-container {display:flex;}`

flex 容器属性(与display=flex并列)：

- `flex-direction:column/ column-reverse/ row/ ...`定义容器要在哪个方向上堆叠 flex 项目（主轴方向）
- `flex-wrap:wrap/ nowrap/ wrap-reverse`是否应该对 flex 项目换行
- `flex-flow`用于同时设置 flex-direction 和 flex-wrap 属性的简写属性
- `justify-content:center/ flex-start/ flex-end/ space-around/space-between`用于水平对齐 flex 项目
- `align-items:center/ flex-start/ flex-end/ stretch/ baseline `用于垂直对齐 flex 项目
- `align-content`用于垂直对齐 多行flex 项目

#### 子元素（项目）

- `order`
- `flex-grow`规定某个 flex 项目相对于其余 flex 项目将增长多少
- `flex-shrink`规定某个 flex 项目相对于其余 flex 项目将收缩多少
- `flex-basis`规定 flex 项目的初始长度
- `flex`  flex-grow、flex-shrink 和 flex-basis 属性的简写属性
- `align-self` flex-grow、flex-shrink 和 flex-basis 属性的简写属性, 将覆盖容器的 align-items 属性所设置的默认对齐方式



### 网格Grid 二维布局

#### 父元素（容器）

`.grid-container {display: grid/ inline-grid;}`

**网格间隙**

- `grid-column-gap`
- `grid-row-gap`
- `grid-gap`

**网格行**

![image-20241207124738535](D:\Learning\Frontend\Note\image-20241207124738535.png)



`grid-template-columns|rows`定义网格布局中的列数，并可定义每列的宽度

```css
/*生成包含四列的网格*/
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
```



#### 子元素（项目）

`grid-column` 属性定义将项目放置在哪一列上

```css
/*把网格项目放在列线 1，并在列线 3 结束它*/
.item {
  grid-column-start: 1;
  grid-column-end: 5;
}

grid-column: 1 / 5;
grid-column: 1 / span 4;
```

`grid-area` 属性可以用作 `grid-row-start、grid-column-start、grid-row-end 和 grid-column-end` 属性的简写属性。

```css
/*从 row-line 2 和 column-line 1 开始，并跨越 2 行和 3 列*/
.item {
  grid-area: 2 / 1 / span 2 / span 3;
}

grid-area: 2 / 1 / 4 / 4;
```

`grid-area` 属性也可以用于为网格项目分配名称。

可以通过网格容器的 `grid-template-areas` 属性来引用命名的网格项目。

```css
/*item1 的名称是 "myArea"，并跨越五列网格布局中的所有五列*/
.item1 {
  grid-area: myArea;
}
.grid-container {
  grid-template-areas: 'myArea myArea myArea myArea myArea';
}
```

每行由撇号`' '`定义。每行中的列都在撇号内定义，并以空格分隔。句号`.`表示没有名称的网格项目。

```css
/*使 "item1" 跨越两列和两行*/
.grid-container {
  grid-template-areas: 'myArea myArea . . .' 'myArea myArea . . .';
} 
```



```css
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
} 
```




## --------

## 示例

```html
<!DOCTYPE html>
<html>
<head>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
}

/* 页眉/Blog 标题 */
.header {
  padding: 30px;
  text-align: center;
  background: white;
}

.header h1 {
  font-size: 50px;
}

/* 设置上导航栏的样式 */
.topnav {
  overflow: hidden;
  background-color: #333;
}

/* 设置 topnav 链接的样式 */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* 改变鼠标悬停时的颜色 */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* 创建两个不相等的彼此并排的浮动列 */
/* 左列 */
.leftcolumn {   
  float: left;
  width: 75%;
}

/* 右列 */
.rightcolumn {
  float: left;
  width: 25%;
  background-color: #f1f1f1;
  padding-left: 20px;
}

/* 伪图像 */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* 为文章添加卡片效果 */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

/* 清除列之后的浮动 */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* 页脚 */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
  margin-top: 20px;
}

/* 响应式布局 - 当屏幕的宽度小于 800 像素时，使两列堆叠而不是并排 */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {   
    width: 100%;
    padding: 0;
  }
}

/* 响应式布局 - 当屏幕的宽度小于 400 像素时，使导航链接堆叠而不是并排 */
@media screen and (max-width: 400px) {
  .topnav a {
    float: none;
    width: 100%;
  }
}
</style>
</head>
<body>

<div class="header">
  <h1>My Website</h1>
  <p>Resize the browser window to see the effect.</p>
</div>

<div class="topnav">
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#" style="float:right">Link</a>
</div>

<div class="row">
  <div class="leftcolumn">
    <div class="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Dec 7, 2017</h5>
      <div class="fakeimg" style="height:200px;">Image</div>
      <p>Some text..</p>
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
    <div class="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Sep 2, 2017</h5>
      <div class="fakeimg" style="height:200px;">Image</div>
      <p>Some text..</p>
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
  </div>
  <div class="rightcolumn">
    <div class="card">
      <h2>About Me</h2>
      <div class="fakeimg" style="height:100px;">Image</div>
      <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    </div>
    <div class="card">
      <h3>Popular Post</h3>
      <div class="fakeimg"><p>Image</p></div>
      <div class="fakeimg"><p>Image</p></div>
      <div class="fakeimg"><p>Image</p></div>
    </div>
    <div class="card">
      <h3>Follow Me</h3>
      <p>Some text..</p>
    </div>
  </div>
</div>

<div class="footer">
  <h2>Footer</h2>
</div>

</body>
</html>

```

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

/* 设置 body 元素的样式 */
body {
  font-family: Arial;
  margin: 0;
}

/* 标题 / LOGO */
.header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: white;
}

/* 设置顶部导航栏样式 */
.navbar {
  display: flex;
  background-color: #333;
}

/* 设置导航条链接演示 */
.navbar a {
  color: white;
  padding: 14px 20px;
  text-decoration: none;
  text-align: center;
}

/* 更改鼠标悬停时的颜色 */
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/* 列容器 */
.row {  
  display: flex;
  flex-wrap: wrap;
}

/* 创建并排的非等列 */
/* 侧栏 / 左侧列 */
.side {
  flex: 30%;
  background-color: #f1f1f1;
  padding: 20px;
}

/* 主列 */
.main {
  flex: 70%;
  background-color: white;
  padding: 20px;
}

/* 伪图像，仅供示例 */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* 页脚 */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
}

/* 响应式布局 - 当屏幕小于 700 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 700px) {
  .row, .navbar {   
    flex-direction: column;
  }
}
</style>
</head>
<body>

<!-- 注释 -->
<div style="background:yellow;padding:5px">
  <h4 style="text-align:center">请调整浏览器窗口来查看响应效果。</h4>
</div>

<!-- Header -->
<div class="header">
  <h1>我的网站</h1>
  <p>拥有 <b>弹性</b> 布局。</p>
</div>

<!-- 导航栏 -->
<div class="navbar">
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
</div>

<!-- 弹性网格（内容） -->
<div class="row">
  <div class="side">
    <h2>关于我</h2>
    <h5>我的照片：</h5>
    <div class="fakeimg" style="height:200px;">图像</div>
    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    <h3>More Text</h3>
    <p>Lorem ipsum dolor sit ame.</p>
    <div class="fakeimg" style="height:60px;">图像</div><br>
    <div class="fakeimg" style="height:60px;">图像</div><br>
    <div class="fakeimg" style="height:60px;">图像</div>
  </div>
  <div class="main">
    <h2>标题</h2>
    <h5>标题描述，2021 年 1 月 1 日</h5>
    <div class="fakeimg" style="height:200px;">图像</div>
    <p>一些文本..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <br>
    <h2>标题</h2>
    <h5>标题描述，2021 年 1 月 2 日</h5>
    <div class="fakeimg" style="height:200px;">图像</div>
    <p>一些文本..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
  </div>
</div>

<!-- Footer -->
<div class="footer">
  <h2>页脚</h2>
</div>

</body>
</html>
```

