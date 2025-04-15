## JavaScript HTML DOM

当网页被加载时，浏览器会创建页面的文档对象模型（*D*ocument *O*bject *M*odel）。*HTML DOM* 模型被结构化为*对象树*

HTML DOM 是 HTML 的标准*对象*模型和*编程接口*。它定义了：

- 作为*对象*的 HTML 元素
- 所有 HTML 元素的*属性*
- 访问所有 HTML 元素的*方法*
- 所有 HTML 元素的*事件*

**Document 对象**	HTML DOM 文档对象是网页中所有其他对象的拥有者





### 操作HTML 元素

#### 查找HTML 元素

| 方法                                        | 描述                   |
| :------------------------------------------ | :--------------------- |
| [**element=**]document.getElementById(*id*) | 通过元素 id 来查找元素 |
| document.getElementsByTagName(*tagName*)       | 通过标签名来查找元素 |
| document.getElementsByClassName(*className*)     | 通过类名来查找元素     |
| document.querySelectorAll(*selector*)     | 通过CSS选择器来查找元素     |
| --------------HTML 对象选择器-------------- | ------------------------------------------ |
| document.anchors             | 返回拥有 name 属性的所有 <a> 元素。         |
| document.applets             | 返回所有 <applet> 元素（HTML5 不建议使用）  |
| document.baseURI             | 返回文档的绝对基准 URI                      |
| document.body                | 返回 <body> 元素                            |
| document.cookie              | 返回文档的 cookie                           |
| document.doctype             | 返回文档的 doctype                          |
| document.documentElement     | 返回 <html> 元素                            |
| document.documentMode        | 返回浏览器使用的模式                        |
| document.documentURI         | 返回文档的 URI                              |
| document.domain              | 返回文档服务器的域名                        |
| document.domConfig           | 废弃。返回 DOM 配置                         |
| document.embeds              | 返回所有 <embed> 元素                       |
| document.forms        | 返回所有 <form> 元素                        |
| document.head                | 返回 <head> 元素                            |
| document.images              | 返回所有 <img> 元素                         |
| document.implementation      | 返回 DOM 实现                               |
| document.inputEncoding       | 返回文档的编码（字符集）                    |
| document.lastModified        | 返回文档更新的日期和时间                    |
| document.links               | 返回拥有 href 属性的所有 <area> 和 <a> 元素 |
| document.readyState          | 返回文档的（加载）状态                      |
| document.referrer            | 返回引用的 URI（链接文档）                  |
| document.scripts             | 返回所有 <script> 元素                      |
| document.strictErrorChecking | 返回是否强制执行错误检查                    |
| document.title               | 返回 <title> 元素                           |
| document.URL                 | 返回文档的完整 URL                          |

`getElementsByTagName()` 方法返回 *HTMLCollection* 对象。该集合中的元素可通过索引号进行访问。`length` 属性定义了 HTMLCollection 中元素的数量。





#### 改变 HTML 元素

| 方法                                       | 描述                   |
| :----------------------------------------- | :--------------------- |
| element.innerHTML = *new html content*     | 改变元素的 inner HTML  |
| element.*attribute* = *new value*          | 改变 HTML 元素的属性值 |
| element.setAttribute(*attribute*, *value*) | 改变 HTML 元素的属性值 |
| element.style.*property* = *new property*  | 改变 HTML 元素的样式   |

#### 添加和删除HTML 元素

| 方法                                                      | 描述             |
| :-------------------------------------------------------- | :--------------- |
| document.createElement(*"element"*)                       | 创建 HTML 元素   |
| document.createTextNode(*node*)                           |                  |
| document.removeChild(*element*) / element.remove()        | 删除 HTML 元素   |
| document/elem.appendChild(*element/node*)                 | 添加 HTML 元素   |
| parentElement/Node.insertBefore(newElement, childElement) |                  |
| document.replaceChild(*element*)                          | 替换 HTML 元素   |
| document.write(*text*)                                    | 写入 HTML 输出流 |

#### 表单

```js
function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

<form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
Name: <input type="text" name="fname">
<input type="submit" value="Submit">
</form>
```

### 节点间导航

![DOM HTML 树](https://www.w3school.com.cn/i/ct_htmltree.gif)

可以使用以下节点属性在节点之间导航：

- parentNode
- childNodes[*nodenumber*]
- firstChild
- lastChild
- nextSibling
- previousSibling

**nodeValue**

`nodeValue` 属性规定节点的值。

- 元素节点的 nodeValue 是 undefined
- 文本节点的 nodeValue 是文本文本
- 属性节点的 nodeValue 是属性值

```js
// 元素节点不包含文本, 文本节点的值能够通过节点的 innerHTML 属性进行访问：
var myTitle = document.getElementById("demo").innerHTML;
// 访问 innerHTML 属性等同于访问首个子节点的 nodeValue：
var myTitle = document.getElementById("demo").firstChild.nodeValue;
var myTitle = document.getElementById("demo").childNodes[0].nodeValue;
```

**nodeName**

`nodeName` 属性规定节点的名称。

- nodeName 是只读的
- 元素节点的 nodeName 等同于标签名
- 属性节点的 nodeName 是属性名称
- 文本节点的 nodeName 总是 #text
- 文档节点的 nodeName 总是 #document

**NodeList 对象**

*NodeList* 对象是从文档中提取的节点列表（集合）。NodeList 对象与 HTMLCollection 对象几乎相同。

如使用 `getElementsByClassName()` 方法，某些（老的）浏览器会返回 NodeList 对象而不是 HTMLCollection。所有浏览器都会为 `childNodes` 属性返回 NodeList 对象。大多数浏览器会为 `querySelectorAll()` 方法返回 NodeList 对象。

`length` 属性定义节点列表中的节点数。



### DOM 事件

| 事件        | 描述                                        |
| ----------- | ------------------------------------------- |
| onclick     | 当用户单击元素时触发                        |
| onload      | 当页面完全加载完成时触发(可用于处理 cookie) |
| onunload    | 当页面离开时触发(可用于处理 cookie)         |
| onchange    | 当表单中的值发生变化时触发                  |
| onmouseover | 当用户将鼠标移动到元素上方时触发            |
| onmouseout  | 当用户将鼠标从元素移开时触发                |
| onmousedown | 当用户按下鼠标按钮时触发                    |
| onmouseup   | 当用户释放鼠标按钮时触发                    |
| onfocus     | 当元素获得焦点触发                          |

**事件监听程序**

```js
element.addEventListener(event, function, useCapture);
```

第一个参数是事件的类型（比如 "click" "mousedown""resize"...）。

第二个参数是当事件发生时我们需要调用的函数。

第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。在冒泡（默认`false`）中，最内侧元素的事件先被处理然后外侧; 在捕获中先外后内。

```js
// removeEventListener() 方法会删除已通过 addEventListener() 方法附加的事件处理程序
element.removeEventListener("mousemove", myFunction);
```





## JQuery

```html
<!-- 引入JQuery -->
<script src="地址"></script>
```

**DOM 选择器**

```js
// id
var myElement = $("#id01");
// tag
var myElement = $("p");
// class
var myElement = $(".className");

// 返回包含 class="intro" 的所有 <p> 元素的列表。
$("p.intro")
```

**HTML 元素**

```js
// 设置 HTML 元素的内部文本
myElement.text("Hello World");
// 获取 HTML 元素的内部文本
var myText = myElement.text();
// 设置元素的 HTML 内容
myElement.html("<p>Hello World</p>");
// 获取元素的 HTML 内容
var content = myElement.html();

// 删除 HTML 元素：element.parentNode.removeChild(element);
element.remove();
// 返回 HTML 元素的父元素: var myParent = myElement.parentNode;
var myParent = myElement.parent();
```

**CSS 样式**

```js
// 隐藏一个 HTML 元素：myElement.style.display = "none";
myElement.hide();
// 显示一个 HTML 元素：myElement.style.display = "";
myElement.show();

// 样式化 HTML 元素
// 更改 HTML 元素的字体尺寸： myElement.style.fontSize = "35px";
myElement.css("font-size","35px");
```







## Web API

Web API 是 Web 的应用程序编程接口。浏览器 API 可以扩展 Web 浏览器的功能。服务器 API 可以扩展 Web 服务器的功能。

### Fetch API

[Fetch API MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Fetch API 利用 [Promise](https://www.javascripttutorial.net/es6/javascript-promises/)，提供了一种更简洁、更灵活的方式来与服务器交互。它有助于更直观地处理异步请求和响应。

这是[全局 window 对象的](https://www.javascripttutorial.net/javascript-globalthis/)一种方法，它允许您使用单个命令将 HTTP 请求发送到 URL。无论您是检索数据、提交表单还是与 API 交互，Fetch API 都有助于简化整个过程，使您的代码更具可读性。

```js
fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    });

// Response 实例是在 fetch() 处理完 promise 之后返回的
// 检测请求是否成功
if (response.status === 200) {	// 状态码
   // success
}
// or:
if (!response.ok) {	// 检查 response 的状态是否在 200 - 299（包括 200 和 299）这个范围内 该属性返回一个布尔值
    throw new Error(`HTTP error! Status: ${response.status}`);
}
```

```js
(async () => {
    try{
        const response = await fetch(url, {
            // Default options are marked with *
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
        const data = await response.json();   // json() Response text() blob() formData() arrayBuffer()
    } catch(err){
        ... = err.message;
    } finally {
        ...
    }
})();
```





### Form API

**约束验证 DOM 方法**

| 属性                | 描述                                       |
| :------------------ | :----------------------------------------- |
| checkValidity()     | 如果 input 元素包含有效数据，则返回 true。 |
| setCustomValidity() | 设置 input 元素的 validationMessage 属性。 |

```html
<input id="id1" type="number" min="100" max="300" required>
<button onclick="myFunction()">OK</button>
<p id="demo"></p>
<script>
function myFunction() {
  const inpObj = document.getElementById("id1");
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  }
}
</script>
```

**约束验证 DOM 属性**

| 属性              | 描述                                        |
| :---------------- | :------------------------------------------ |
| validity          | 包含与输入元素有效性相关的布尔属性。        |
| validationMessage | 包含当有效性为 false 时浏览器将显示的消息。 |
| willValidate      | 指示是否将验证 input 元素。                 |

**有效性validity属性**

| 属性            | 描述                                                  |
| :-------------- | :---------------------------------------------------- |
| customError     | 如果设置了自定义有效性消息，则设置为 true。           |
| patternMismatch | 如果元素的值与其 pattern 属性不匹配，则设置为 true。  |
| rangeOverflow   | 如果元素的值大于其 max 属性，则设置为 true。          |
| rangeUnderflow  | 如果元素的值小于其 min 属性，则设置为 true。          |
| stepMismatch    | 如果元素的值对其 step 属性无效，则设置为 true。       |
| tooLong         | 如果元素的值超过其 maxLength 属性，则设置为 true。    |
| typeMismatch    | 如果元素的值对其 type 属性无效，则设置为 true。       |
| valueMissing    | 如果元素（具有 required 属性）没有值，则设置为 true。 |
| valid           | 如果元素的值有效，则设置为 true。                     |

```html
<input id="id1" type="number" max="100">
<button onclick="myFunction()">OK</button>
<p id="demo"></p>
<script>
function myFunction() {
  let text = "Value OK";
  if (document.getElementById("id1").validity.rangeOverflow) {
    text = "Value too large";
  }
}
</script>
```



### History API

**History 对象属性**

| 属性                                                         | 描述                        |
| :----------------------------------------------------------- | :-------------------------- |
| [length](https://www.w3school.com.cn/jsref/prop_his_length.asp) | 返回历史列表中的 URL 数量。 |

**History 对象方法**

| 方法                                                         | 描述                         |
| :----------------------------------------------------------- | :--------------------------- |
| [back()](https://www.w3school.com.cn/jsref/met_his_back.asp) | 加载历史列表中的上一个 URL。 |
| [forward()](https://www.w3school.com.cn/jsref/met_his_forward.asp) | 加载历史列表中的下一个 URL。 |
| [go()](https://www.w3school.com.cn/jsref/met_his_go.asp)     | 从历史列表中加载特定的 URL。 |

```js
// back() 方法加载 windows.history 列表中的前一个 URL
window.history.back();
// go() 方法从历史列表中加载一个特定的 URL
window.history.go(-2);
```



### Storage API

| 属性                                                         | 描述                                                     |
| :----------------------------------------------------------- | :------------------------------------------------------- |
| [window.localStorage](https://www.w3school.com.cn/jsref/prop_win_localstorage.asp) | 允许在 Web 浏览器中保存键/值对。存储没有到期日期的数据。 |
| [window.sessionStorage](https://www.w3school.com.cn/jsref/prop_win_sessionstorage.asp) | 允许在 Web 浏览器中保存键/值对。存储一个会话的数据。     |

**Storage 对象属性和方法**

| 属性/方法                                                    | 描述                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------- |
| [key(n)](https://www.w3school.com.cn/jsref/met_storage_key.asp) | 返回存储中第 n 个键的名称。                            |
| [length](https://www.w3school.com.cn/jsref/prop_storage_length.asp) | 返回存储在 Storage 对象中的数据项数。                  |
| [getItem(keyname)](https://www.w3school.com.cn/jsref/met_storage_getitem.asp) | 返回指定的键名的值。                                   |
| [setItem(keyname, value)](https://www.w3school.com.cn/jsref/met_storage_setitem.asp) | 将键添加到存储中，或者如果键已经存在，则更新该键的值。 |
| [removeItem(keyname)](https://www.w3school.com.cn/jsref/met_storage_removeitem.asp) | 从存储中删除该键。                                     |
| [clear()](https://www.w3school.com.cn/jsref/met_storage_clear.asp) | 清空所有键。                                           |

```js
// localStorage对象提供对特定网站的本地存储的访问, 允许存储、读取、添加、修改和删除该域的数据项; 存储的数据没有到期日期并且在浏览器关闭时不会被删除
localStorage.setItem("name", "Bill Gates");
localStorage.getItem("name");

// sessionStorage 对象与 localStorage 对象相同, 不同之处在于 sessionStorage 对象存储会话的数据, 当浏览器关闭时，数据会被删除。
```



### Worker API

在 HTML 页面中执行脚本时，页面在脚本完成之前是无响应的。Web Worker 是在后台运行的 JavaScript，独立于其他脚本，不会影响页面的性能。你可以继续做任何你想做的事情：点击、选取内容等，同时 web worker 在后台运行。

```js
function startWorker() {
    if (typeof(Worker) !== "undefined") {  // 检查 Web Worker 浏览器
        w = new Worker("demo_workers.js");	// 外部文件
    } else {
      // Sorry! No Web Worker support..
    }
    w.onmessage = function(event) {	// 当 Web Worker 发布消息时，将执行事件侦听器中的代码
        document.getElementById("result").innerHTML = event.data;
    };
}

function stopWorker() {
  w.terminate();	// 终止 Web Worker
  w = undefined;	// 重用 Web Worker
}	
```

由于 Web Worker 位于外部文件中，因此他们无法访问以下 JavaScript 对象：

- window 对象
- document 对象
- parent 对象



### Geolocation API

```js
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
```



## AJAX

*A*synchronous *J*avaScript *A*nd *X*ML

- 不刷新页面更新网页
- 在页面加载后从服务器请求数据
- 在页面加载后从服务器接收数据
- 在后台向服务器发送数据

![image-20241214191040736](D:\Learning\Frontend\Note\image-20241214191040736.png)

### XMLHttpRequest

**XMLHttpRequest 对象是 AJAX 的基石**

1. 创建 XMLHttpRequest 对象
2. 定义回调函数
3. 打开 XMLHttpRequest 对象
4. 向服务器发送请求

```js
// 创建 XMLHttpRequest 对象
const xhttp = new XMLHttpRequest();

// 定义回调函数
xhttp.onload = function() {
  // 您可以在这里使用数据
}

// 发送请求
xhttp.open("GET", "ajax_info.txt");
xhttp.send();
```



#### XMLHttpRequest 对象

**XMLHttpRequest 对象方法**

| 方法                                          | 描述                                                         |
| :-------------------------------------------- | :----------------------------------------------------------- |
| new XMLHttpRequest()                          | 创建新的 XMLHttpRequest 对象。                               |
| abort()                                       | 取消当前请求。                                               |
| getAllResponseHeaders()                       | 返回头部信息。                                               |
| getResponseHeader()                           | 返回特定的头部信息。                                         |
| open(*method*, *url*, *async*, *user*, *psw*) | 规定请求。*method*：请求类型 GET 或 POST*url*：文件位置*async*：true（异步）或 false（同步）*user*：可选的用户名*psw*：可选的密码 |
| send()                                        | 向服务器发送请求，用于 GET 请求。                            |
| send(string)                                  | 向服务器发送请求，用于 POST 请求。                           |
| setRequestHeader()                            | 将标签/值对添加到要发送的标头。                              |

**XMLHttpRequest 对象属性**

| 属性               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| onload             | 定义接收到（加载）请求时要调用的函数。                       |
| onreadystatechange | 定义当 readyState 属性发生变化时调用的函数。                 |
| readyState         | 保存 XMLHttpRequest 的状态。0：请求未初始化1：服务器连接已建立2：请求已收到3：正在处理请求4：请求已完成且响应已就绪 |
| responseText       | 以字符串形式返回响应数据。                                   |
| responseXML        | 以 XML 数据返回响应数据。                                    |
| status             | 返回请求的状态号200: "OK"403: "Forbidden"404: "Not Found"如需完整列表请访问 [Http 消息参考手册](https://www.w3school.com.cn/tags/html_ref_httpmessages.asp) |
| statusText         | 返回状态文本（比如 "OK" 或 "Not Found"）                     |



#### 向服务器请求

| 方法                           | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| open(*method*, *url*, *async*) | 规定请求的类型*method*：请求的类型：GET 还是 POST*url*：服务器（文件）位置*async*：true（异步）或 false（同步） |
| send()                         | 向服务器发送请求（用于 GET）                                 |
| send(*string*)                 | 向服务器发送请求（用于 POST）                                |

如需像 HTML 表单那样 POST 数据，请通过 `setRequestHeader()` 添加一个 HTTP 头部。请在 `send()` 方法中规定您需要发送的数据：

```js
xhttp.open("POST", "ajax_test.asp", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("fname=Bill&lname=Gates");
```

#### 服务器响应

**onreadystatechange 属性**

`readyState` 属性保存 XMLHttpRequest 的状态。

`onreadystatechange` 属性定义了一个回调函数，当 readyState 改变时执行该函数。

`status` 属性和 `statusText` 属性保存 XMLHttpRequest 对象的状态。

| 属性               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| onreadystatechange | 定义当 readyState 属性改变时调用的函数。                     |
| readyState         | 保存 XMLHttpRequest 的状态。0：请求未初始化1：服务器连接已建立2：请求已收到3：正在处理请求4：请求已完成且响应已就绪 |
| status             | 返回请求的状态号200: "OK"403: "Forbidden"404: "Not Found"如需完整列表请访问 [Http 消息参考手册](https://www.w3school.com.cn/tags/html_ref_httpmessages.asp) |
| statusText         | 返回状态文本（比如 "OK" 或 "Not Found"）。                   |

每次 readyState 改变时都会调用 onreadystatechange 函数。

```js
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt");
  xhttp.send();
```

