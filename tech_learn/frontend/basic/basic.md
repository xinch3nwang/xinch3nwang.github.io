# 前端基础知识

- HTML（HyperText Markup Language）：超文本标记语言。从**语义**的角度描述页面的**结构**。相当于人的身体组织结构。
- CSS（Cascading Style Sheets）：层叠样式表。从**审美**的角度美化页面的**样式**。相当于人的衣服和打扮。
- JS：JavaScript。从**交互**的角度描述页面的**行为**。相当于人的动作，让人有生命力。



## 浏览器

![img](http://img.smyhvae.com/20180124_1700.png)

**渲染引擎**也称之为「浏览器内核」，用来解析 HTML与CSS。渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。

**JS 引擎**也称为 JS 解释器。 用来解析网页中的JavaScript代码，对其处理后再运行。





## HTML



```html
html:5

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

##### **文档声明头**

告知浏览器文档使用哪种 HTML 或 XHTML 规范

##### **页面语言** `lang`

用于指定页面的语言类型

##### **`<head>`标签** 

- **meta 标签**表示基本的配置项目。
- - 字符集 charset
  - 视口 name="viewport"  content=""
  - 关键词 name="Keywords"  content=""
  - 页面描述 name="Description"  content=""
  - http-equiv 属性
- **title 标签**用于设置网页标题
- **base 标签**用于指定基础的路径

##### **`<body>`标签**

###### 属性

- `bgcolor`：设置整个网页的背景颜色。
- `background`：设置整个网页的背景图片。
- `text`：设置网页中的文本颜色。
- `leftmargin`：网页的左边距。IE浏览器默认是8个像素。
- `topmargin`：网页的上边距。
- `rightmargin`：网页的右边距。
- `bottommargin`：网页的下边距。

###### 标签

**排版标签**

```html
<h1 align="left/center/right">head</h1>

<p align="left/center/right">paragraphy</p>


<hr size="" width="" align="" color="" noshade/>	<!--分割线-->

<br />	<!--换行-->


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



**字体标签**

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



**超链接**

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
_top：在顶级窗口中显示



**图片**

```html
<img src="" height="" width="" alt="" title="" align=""/>
```

align: 与文字对齐方式



**列表**

```html
无序列表
<ul type="属性值">
	<li type="属性值"><b>北京市</b>
		<ul>
			<li>海淀区</li>
			<li>朝阳区</li>
		</ul>
	</li>
	<li><b>广州市</b>
		<ul>
			<li>天河区</li>
			<li>越秀区</li>
		</ul>
	</li>
</ul>

有序列表
<ol></ol>同

定义列表
<dl>
	<dt>购物指南</dt>
	<dd>
		<a href="#">购物流程</a>
		<a href="#">常见问题</a>
		<a href="#">联系客服</a>
	</dd>
</dl>
<dl>
	<dt>配送方式</dt>
	<dd>
		<a href="#">上门自提</a>
		<a href="#">211限时达</a>
	</dd>
</dl>
```

ul里只能是li。但是li是一个容器级标签，里面什么都能放，甚至可以再放一个ul。



**表格**

```html
<table border="1" style="border-collapse:collapse;">
    <caption>singer</caption>
	<tr>
		<td>许嵩</td>
		<td>29</td>
		<td>男</td>
		<td>安徽</td>
	</tr>
	<tr>
		<td>邓紫棋</td>
		<td>23</td>
		<td>女</td>
		<td>香港</td>
	</tr>
</table>
```

table的属性：

- `border`：边框。像素为单位。
- `style="border-collapse:collapse;"`：单元格的线和表格的边框线合并（表格的两边框合并为一条）
- `width`：宽度。像素为单位。
- `height`：高度。像素为单位。
- `bordercolor`：表格的边框颜色。
- `align`：**表格**的水平对齐方式。属性值可以填：left right center。 注意：这里不是设置表格里内容的对齐方式，如果想设置内容的对齐方式，要对单元格标签`<td>`进行设置）
- `cellpadding`：单元格内容到边的距离，像素为单位。默认情况下，文字是紧挨着左边那条线的，即默认情况下的值为0。 注意不是单元格内容到四条边的距离哈，而是到一条边的距离，默认是与左边那条线的距离。如果设置属性`dir="rtl"`，那就指的是内容到右边那条线的距离。
- `cellspacing`：单元格和单元格之间的距离（外边距），像素为单位。默认情况下的值为0
- `bgcolor="#99cc66"`：表格的背景颜色。
- `background="路径src/..."`：背景图片。 背景图片的优先级大于背景颜色。
- `bordercolorlight`：表格的上、左边框，以及单元格的右、下边框的颜色
- `bordercolordark`：表格的右、下边框，以及单元格的上、左的边框的颜色 这两个属性的目的是为了设置3D的效果。
- `dir`：公有属性，单元格内容的排列方式(direction)。 可以 取值：`ltr`：从左到右（left to right，默认），`rtl`：从右到左（right to left） 既然说`dir`是共有属性，如果把这个属性放在任意标签中，那表明这个标签的位置可能会从右开始排列。

`<tr>`：行

一个表格就是一行一行组成的。

**属性：**

- dir：公有属性，设置这一行单元格内容的排列方式。可以取值：
  - `ltr`：从左到右（left to right，默认）
  - `rtl`：从右到左（right to left）
- `bgcolor`：设置这一行的单元格的背景色。 注：没有background属性，即：无法设置这一行的背景图片，如果非要设置，可以用css实现。
- `height`：一行的高度
- `align="center"`：一行的内容水平居中显示，取值：left、center、right
- `valign="center"`：一行的内容垂直居中，取值：top、middle、bottom

`<td>`：单元格

**属性：**

- `align`：内容的横向对齐方式。属性值可以填：left right center。如果想让每个单元格的内容都居中，这个属性太麻烦了，以后用css来解决。
- `valign`：内容的纵向对齐方式。属性值可以填：top middle bottom
- `width`：绝对值或者相对值(%)
- `height`：单元格的高度
- `bgcolor`：设置这个单元格的背景色。
- `background`：设置这个单元格的背景图片。
- `colspan`：横向跨度。例如`colspan="2"`表示当前单元格在水平方向上要占据两个单元格的位置。
- `rowspan`：纵向跨度。例如`rowspan="2"`表示当前单元格在垂直方向上要占据两个单元格的位置。

表格的`<thead></thead>`标签、`<tbody>`标签、`<tfoot>`标签

这三个标签有与没有的区别：

- 1、如果写了，那么这三个部分的代码顺序可以任意，浏览器显示的时候还是按照thead、tbody、tfoot的顺序依次来显示内容。如果不写thead、tbody、tfoot，那么浏览器解析并显示表格内容的时候是从按照代码的从上到下的顺序来显示。
- 2、当表格非常大内容非常多的时候，如果用thead、tbody、tfoot标签的话，那么**数据可以边获取边显示**。如果不写，则必须等表格的内容全部从服务器获取完成才能显示出来。

**框架标签**

`<body>`标签代表的只是一个页面，而框架标签代表的是多个页面。于是：`<frameset>`和`<body>`只能二选一。

```
	
```

`<frameset>`：框架的集合

一个框架的集合可以包含多个框架或框架的集合。

**属性：**

- `rows`：水平分割，将框架分为上下部分。

- `cols`：垂直分割，将框架分为左右部分。



`<frame>`：框架

一个框架显示一个页面。

**属性：**

- `scrolling="no"`：是否需要滚动条。默认值是true。
- `noresize`：不可以改变框架大小。默认情况下，单个框架的边界是可以拖动的，这样的话，框架大小就不固定了。如果用了这个属性值，框架大小将固定。

- `bordercolor="#00FF00"`：给框架的边框定义颜色。这个属性在框架集合`<frameset>`中同样适用。
- `frameborder="0"`或`frameborder="1"`：隐藏或显示边框（框架线）。
- `name`：给框架起一个名字。利用`name`这个属性，我们可以在框架里进行超链。



`<iframe>`:内嵌框架

`<iframe>`是`<body>`的子标记。

**属性：**

- `src="subframe/the_second.html"`：内嵌的那个页面
- `width=800`：宽度
- `height=“150`：高度
- `scrolling="no"`：是否需要滚动条。默认值是true。
- `name="mainFrame"`：窗口名称。公有属性。



**表单Form**

**`<input>`：输入标签**

```html
	<form>
		名字：<input type="text" value="name" disabled=""><br>
		密码：<input type="password" value="pwd" size="50"><br>
		性别：<input type="radio" name="gender" id="radio1" value="male" checked="">男
			  <input type="radio" name="gender" id="radio2" value="female" >女<br>
		爱好：<input type="checkbox" name="love" value="eat">吃饭
			  <input type="checkbox" name="love" value="sleep">睡觉
			  <input type="checkbox" name="love" value="bat">打豆豆
	</form>
```

**属性：**

- **`type="属性值"`**：文本类型。属性值可以是：

  - `text`（默认）

  - `password`：密码类型

  - `radio`：单选按钮，名字相同的按钮作为一组进行单选（单选按钮，天生是不能互斥的，如果想互斥，必须要有相同的name属性。name就是“名字”。 ）。非常像以前的收音机，按下去一个按钮，其他的就抬起来了。所以叫做radio。

  - `checkbox`：多选按钮，**name 属性值相同的按钮**作为一组进行选择。name 的属性值可以相同，但是 **id 的属性值必须是唯一的**

  - 对于`radio checkbox`，只有点击框才可以选中，点击文字时是无法选中的；于是，

    ```html
    <input type="radio" name="sex" id="nan" /> <label for="nan">男</label>
    ```

    

  - `checked`：将单选按钮或多选按钮默认处于选中状态。当`<input>`标签设置为`type="radio"`或者`type=checkbox`时，可以用这个属性。属性值也是checked，可以省略。

  - `hidden`：隐藏框，在表单中包含不希望用户看见的信息

  - `button`：普通按钮，结合js代码进行使用。

  - `submit`：提交按钮，传送当前表单的数据给服务器或其他程序处理。这个按钮不需要写value自动就会有“提交”文字。这个按钮真的有提交功能。点击按钮后，这个表单就会被提交到form标签的action属性中指定的那个页面中去。

  - `reset`：重置按钮，清空当前表单的内容，并设置为最初的默认值

  - `image`：图片按钮，和提交按钮的功能完全一致，只不过图片按钮可以显示图片。

  - `file`：文件选择框。 提示：如果要限制上传文件的类型，需要配合JS来实现验证。对上传文件的安全检查：一是扩展名的检查，二是文件数据内容的检查。

- **`value="内容"`**：文本框里的默认内容（已经被填好了的）

- `size="50"`：表示文本框内可以显示**五十个字符**。一个英文或一个中文都算一个字符。 注意**size属性值的单位不是像素哦**。

- `readonly`：文本框只读，不能编辑。因为它的属性值也是readonly，所以属性值可以不写。 用了这个属性之后，在google浏览器中，光标点不进去；在IE浏览器中，光标可以点进去，但是文字不能编辑。

- `disabled`：文本框只读，不能编辑，光标点不进去。属性值可以不写。

`<select>`：下拉列表标签

`<select>`标签里面的每一项用`<option>`表示。select就是“选择”，option“选项”。

select标签和ul、ol、dl一样，都是组标签。

**`<select>`标签的属性：**

- `multiple`：可以对下拉列表中的选项进行多选。属性值为 multiple，也可以没有属性值。也就是说，既可以写成 `multiple=""`，也可以写成`multiple="multiple"`。
- `size="3"`：如果属性值大于1，则列表为滚动视图。默认属性值为1，即下拉视图。

**`<option>`标签的属性：**

- `selected`：预选中。没有属性值。

`<textarea>`标签：多行文本输入框

text 就是“文本”，area 就是“区域”。

**属性：**

- `rows="4"`：指定文本区域的行数。
- `cols="20"`：指定文本区域的列数。
- `readonly`：只读。







**`<marquee>`滚动字幕标签**

如果在这个标签里设置了内容，那么，打开网页时，内容会像弹幕一样自动移动。 **属性：**

- `direction="right"`：移动的目标方向。属性值可以是：`left`（从右向左移动，默认值）、`right`（从左向右移动）、`up`（从下向上移动）、`down`（从上向下移动）。
- `behavior="slide"`：行为方式。属性值可以是：`slide`（只移动一次）、`scroll`（循环移动，默认值）、`alternate`（循环移动）、。 `alternate`和`scroll`属性值都是循环移动，区别在于：假设在`direction="right"`的情况下，`behavior="scroll"`表示从左到右、从左到右、从左到右···`behavior="alternate"`表示从左到右、从右到左、从左到右···
- `scrollamount="30"`：移动的速度
- `loop="3"`: 循环多少圈。负值表示无限循环
- `scrolldelay="1000"`：移动一次休息多长时间。单位是毫秒。

```html
<marquee behavior="alternate" direction="down"  width="300" height="200" bgcolor="#8c5dc1">我来了</marquee>
```



**多媒体标签**

```html
<bgsound src="" loop=""></bgsound>
<embed></>

<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="778" height="202">
 	 <param name="movie" value="images/banner.swf">
      <param name="quality" value="high">
      <param name="wmode" value="transparent">
      <embed src="images/banner.swf" width="778" height="202" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed>
</object>
                   
```



## HTML5

### H5中新增的语义标签

- `<section>` 表示区块

- `<article>` 表示文章。如文章、评论、帖子、博客

- `<header>` 表示页眉

- `<footer>` 表示页脚

- `<nav>` 表示导航

- `<aside>` 表示侧边栏。如文章的侧栏

- <figure> 表示媒介内容分组。

- `<mark>` 表示标记 (用得少)

- `<progress>` 表示进度 (用得少)

- `<time>` 表示日期

### H5中新增的表单类型

- `email` 只能输入email格式。自动带有验证功能。
- `tel` 手机号码。
- `url` 只能输入url格式。
- `number` 只能输入数字。
- `search` 搜索框
- `range` 滑动条
- `color` 拾色器
- `time` 时间
- `date` 日期
- `datetime` 时间日期
- `month` 月份
- `week` 星期