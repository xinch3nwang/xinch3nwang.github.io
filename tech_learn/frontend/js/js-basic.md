

# JavaScript

[现代 JavaScript 教程](https://zh.javascript.info/)



## 基础知识



- 可以使用一个 `<script>` 标签将 JavaScript 代码添加到页面中
- 外部脚本可以通过 `<script src="path/to/script.js">此内容会被忽略</script>` 的方式插入



**严格模式**

```javascript
"use strict"; // 处于脚本文件的顶部时 代码以现代模式工作
```



**交互**

```javascript
/* 输出 */
document.getElementByID("...").innerHTML = ...
document.write(...)仅用于测试
window.alert(...)
console.log(...)
            
/* 输入 */
prompt("question", "<default>")		// 点击确定返回文本，点击取消或按下 Esc 键返回 null
confirm("question")		// 点击确定返回 true，点击取消或按下 Esc 键返回 false
```



**标识符命名规则**

首字符必须是字母、下划线（-）或美元符号（$），连串的字符可以是字母、数字、下划线或美元符号



**事件event**

| 事件        | 描述                         |
| :---------- | :--------------------------- |
| onchange    | HTML 元素已被改变            |
| onclick     | 用户点击了 HTML 元素         |
| onmouseover | 用户把鼠标移动到 HTML 元素上 |
| onmouseout  | 用户把鼠标移开 HTML 元素     |
| onkeydown   | 用户按下键盘按键             |
| onload      | 浏览器已经完成页面加载       |



### 声明

[现代 JavaScript 教程](https://zh.javascript.info/)



#### 变量var

```javascript
var a = 1, b = 2;
var name; // undefined
var a; // 允许在程序的任何位置使用 var 重新声明, 且不会丢它的值

// 通过 var 声明的变量会提升到顶端（可以在声明变量之前就使用它）(严格模式不可使用)
// 只提升声明(var x)，而非初始化(var x = 7)
```

#### 变量let

```javascript
/* 块作用域变量
 	之前只有两种类型的作用域：全局作用域和函数作用域
*/

{ 
  var x = 10; 
}
// 此处可以使用 x
-------------------
{ 
  let x = 10;
}
// 此处不可以使用 x
-------------------
-------------------
var x = 10;
// 此处 x 为 10
{ 
  var x = 6;
  // 此处 x 为 6
}
// 此处 x 为 6
-------------------
var x = 10;
// 此处 x 为 10
{ 
  let x = 6;
  // 此处 x 为 6
}
// 此处 x 为 10

/* 如果在块外声明声明，那么 var 和 let 也很相似，它们都拥有全局作用域
   在相同的作用域，或在相同的块中，通过 let 重新声明一个 var 变量是不允许的
   在相同的作用域，或在相同的块中，通过 let 重新声明一个 let 变量是不允许的
   在相同的作用域，或在相同的块中，通过 var 重新声明一个 let 变量是不允许的
*/

/* 通过 let 定义的变量不会被提升到顶端。在声明 let 变量之前就使用它会导致 ReferenceError。 */
```
#### 常量const

```javascript
const MAX = 18;

/* 块作用域 */

var x = 10;
// 此处，x 为 10
{ 
  const x = 6;
  // 此处，x 为 6
}
// 此处，x 为 10

/* 必须在声明时赋值 */

/* 不能更改常量原始值（赋值），但我们可以更改 常量对象、常量数组 的属性 */

/* 在另外的作用域或块中重新声明 const 是允许的 */
const x = 2;       // 允许
{
  const x = 3;   // 允许
}
{
  const x = 4;   // 允许
}

/* 通过 const 定义的变量不会被提升到顶端 */
```



### 数据类型

`typeof x`运算符来确定 JavaScript 变量的数据类型

- NaN 的数据类型是数字
- 数组的数据类型是对象
- 日期的数据类型是对象
- null 的数据类型是 object
- 未定义变量的数据类型为 undefined
- 未赋值的变量的数据类型也是 undefined

`x.constructor` 属性返回所有 JavaScript 变量的构造函数





#### 字符串string

```javascript
"Hello"
'Hello'

/* 字符串模板 */
`Hello`
// 可以在字符串中同时使用单引号和双引号
// 允许多行字符串

// 允许通过将变量和表达式包装在字符串插值 `${…}` 中
let header = "Templates Literals";
let tags = ["template literals", "javascript", "es6"];
let html = `<h2>${header}</h2><ul>`;
for (const x of tags) {
  html += `<li>${x}</li>`;
}
html += `</ul>`;
document.getElementById("demo").innerHTML = html;
```



```js
var str = "\"ABCD\"";

// 返回字符串的长度 6
str.length;

// 返回字符串中指定文本首次出现的索引3, 如果未找到文本返回 -1
str.indexOf("CD"[, start]);  
str.lastIndexOf("CD"[, [start]) 方法返回指定文本在字符串中最后一次出现的索引
str.search("CD")	
// search() 方法无法设置第二个开始位置参数; indexOf() 方法无法设置更强大的搜索值（正则表达式）

// 提取部分字符串
str.slice(start[, end])
str.substring(start[, end])  // 无法接受负的索引
str.substr(start[, length])

// 提取字符串字符
str.charAt(position)	// 返回字符串中指定下标（位置）的字符串
str.charCodeAt(position)	// 返回字符串中指定索引的字符 unicode 编码

// 替换字符串内容
var s1 = str.replace("<old>", "<new>");// 不会改变调用它的字符串,返回的是新字符串; 默认只替换首个匹配

// 转换为大写和小写
var text2 = text1.toUpperCase();
var text2 = text1.toLowerCase();

// 连接两个或多个字符串
var text3 = text1.concat("...",text2);

// 删除字符串两端的空白符
var s1 = str.trim();

// 把字符串转换为数组
var txt = "a,b,c,d,e";   // 字符串
var arr = txt.split(",");  // [a,b,c,d,e]
var arr = txt.split("");  // [a,,,b,,c,,,d,,,e]

// 根据正则表达式在字符串中搜索匹配项，并将匹配项作为 Array 对象返回
let text = "The rain in SPAIN stays mainly in the plain";
text.match(/ain/g)    // 返回数组 [ain,ain,ain]

string.includes(searchvalue, start)  // 如果字符串包含指定值，返回 true

string.startsWith(searchvalue, start)  // 如果字符串以指定值开头，返回 true
string.endsWith(searchvalue, length)  // 如果字符串前length个字母以指定值结尾，返回 true
```



#### 数字类型number&bigint

*number* 类型代表整数和浮点数。数字可以有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括特殊数值：`Infinity`、`-Infinity` 和 `NaN`

| 数字方法                                                     | 描述                         |
| :----------------------------------------------------------- | :--------------------------- |
| [toString()](https://www.w3school.com.cn/jsref/jsref_tostring_number.asp) | 将数字作为字符串返回。       |
| [toExponential()](https://www.w3school.com.cn/jsref/jsref_toexponential.asp) | 返回以指数表示法书写的数字。 |
| [toFixed(n)](https://www.w3school.com.cn/jsref/jsref_tofixed.asp) | 返回带小数位数n的数字。      |
| [toPrecision(n)](https://www.w3school.com.cn/jsref/jsref_toprecision.asp) | 返回指定长度n的数字。        |
| [ValueOf()](https://www.w3school.com.cn/jsref/jsref_valueof_number.asp) | 以数字形式返回数字。         |

| Number对象方法                                               | 描述                              |
| :----------------------------------------------------------- | :-------------------------------- |
| [Number.isInteger()](https://www.w3school.com.cn/jsref/jsref_isinteger.asp) | 如果参数是整数则返回 true。       |
| [Number.isSafeInteger()](https://www.w3school.com.cn/jsref/jsref_issafeinteger.asp) | 如果参数是安全整数，则返回 true。 |
| [Number.parseFloat()](https://www.w3school.com.cn/jsref/jsref_number_parsefloat.asp) | 将字符串转换为数字。              |
| [Number.parseInt()](https://www.w3school.com.cn/jsref/jsref_number_parseint.asp) | 将字符串转换为整数。              |

| 属性                                                         | 描述                          |
| :----------------------------------------------------------- | :---------------------------- |
| [Number.EPSILON](https://www.w3school.com.cn/jsref/jsref_number_epsilon.asp) | 1 和大于 1 的最小数之间的差。 |
| [Number.MAX_VALUE](https://www.w3school.com.cn/jsref/jsref_max_value.asp) | JavaScript 中可能的最大数。   |
| [Number.MIN_VALUE](https://www.w3school.com.cn/jsref/jsref_min_value.asp) | JavaScript 中可能的最小数。   |
| [Number.MAX_SAFE_INTEGER](https://www.w3school.com.cn/jsref/jsref_max_safe_integer.asp) | 最大安全整数 (253 - 1)。      |
| [Number.MIN_SAFE_INTEGER](https://www.w3school.com.cn/jsref/jsref_min_safe_integer.asp) | 最小安全整数 -(253 - 1)。     |
| [Number.POSITIVE_INFINITY](https://www.w3school.com.cn/jsref/jsref_positive_infinity.asp) | 无穷大（溢出时返回）。        |
| [Number.NEGATIVE_INFINITY](https://www.w3school.com.cn/jsref/jsref_negative_infinity.asp) | 负无穷大（溢出时返回）。      |
| [Number.NaN](https://www.w3school.com.cn/jsref/jsref_number_nan.asp) | “非数字”值。                  |



#### 布尔类型boolean

所有具有“真实”值的即为 True: 100, 3.14, -15, "Hello", "false", 7 + 1 + 3.14, 5 < 6 

所有不具有“真实”值的即为 False: 0, -0 , "", undefined, null, NaN



#### undefined

具有单个值 `undefined` 的类型，表示“未分配（未定义）

#### null

具有单个值 `null` 的类型，表示“空”或“不存在”

#### symbol

创建对象的唯一标识符



#### 类型转换

![image-20241209153353768](D:\Learning\Frontend\Note\image-20241209153353768.png)



#### --------



#### 函数function



```javascript
/* 函数声明 */
function myFunc(param1, param2, ...){
    ...
    return ...;
}
// myFunc 引用的是函数对象， myFunc() 引用的是函数结果

/* 函数表达式 */
let myFunc = function(param1, param2, ...){
    ...
    return ...;
}

/* 箭头函数 */
let myFunc = (param1, param2, ...) => param1 ... param2

// 对于常规函数，this 表示调用该函数的对象; 对于箭头函数，则 `this` 表示函数的拥有者
```

```javascript
// 自调用函数
(function () {
    var x = "Hello!!";
})();
```

```js
// 函数有一个名为 arguments 对象的内置对象, arguments 对象包含函数调用时使用的参数数组
// arguments.length 会返回函数被调用时收到的参数数目
function myFunction(a, b) {
    return arguments.length;
}

// toString() 方法将函数作为字符串返回
function myFunction(a, b) {
    return a * b;
}
var txt = myFunction.toString();	// function myFunction(a, b) { return a * b; }
```

参数通过值传递, 对象是由引用传递的

```js
// 如果函数调用的前面是 new 关键字，那么这是一个构造函数调用。看起来像创建一个新的函数，但由于 JavaScript 函数是对象，实际上创建一个新对象
// 这是函数构造器：
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// 创建了一个新对象：
var x = new myFunction("Bill", "Gates");
x.firstName;                             // 会返回 "Bill"
```

##### 方法重用call&apply

使用 `call()` 方法，可以编写能够在不同对象上使用的方法, 能够使用属于另一个对象的方法

```js
var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
var person2 = {
    firstName:"Steve",
    lastName: "Jobs",
}
person.fullName.call(person1);  // 将返回 "Bill Gates"


var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"Bill",
  lastName: "Gates"
}
person.fullName.call(person1, "Seattle", "USA");  // Bill Gates,Seatle,USA
```

all() 和 apply() 之间的不同之处是：

`call()` 方法分别接受参数。

`apply()` 方法接受数组形式的参数。

如果要使用数组而不是参数列表，则 `apply()` 方法非常方便

```js
var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"Bill",
  lastName: "Gates"
}
person.fullName.apply(person1, ["Oslo", "Norway"]);


// 由于 JavaScript 数组没有 max() 方法，因此您可以应用 Math.max() 方法
Math.max.apply(null, [1,2,3]); // 也会返回 3
```

##### 函数借用bind

通过使用 bind() 方法，一个对象可以从另一个对象借用一个方法

```js
const person = {
  firstName:"Bill",
  lastName: "Gates",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}
const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}
let fullName = person.fullName.bind(member);
fullName()  // Bill Gates


// 有时必须使用 bind() 方法来防止丢失 this
const person = {
  firstName:"Bill",
  lastName: "Gates",
  display: function () {
    let x = document.getElementById("demo");
    x.innerHTML = this.firstName + " " + this.lastName;
  }
}
setTimeout(person.display, 3000);   // undefined undefined

let display = person.display.bind(person);
setTimeout(display, 3000);	// Bill Gates
```

##### 闭包

JavaScript 变量属于本地或全局作用域； 全局变量能够通过闭包实现局部（私有）

```js
// 初始化计数器
var counter = 0;
// 递增计数器的函数
function add() {
  counter += 1;
}

// 有一个问题：页面上的任何代码都可以更改计数器，而无需调用 add()

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
// 这个自调用函数只运行一次。它设置计数器为零（0），并返回函数表达式给add, 且add能够访问父作用域中的计数器
```

##### 异步Async

回调是作为参数传递给另一个函数的函数

```js
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}
function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}
myCalculator(5, 5, myDisplayer);
```

```js
// setTimeout() 可以指定超时时执行的回调函数
setTimeout(function() { myFunction("I love You !!!"); }, 3000);
// setInterval() 可以指定每个间隔执行的回调函数
setInterval(myFunction, 1000);
function myFunction() {
  let d = new Date();
  document.getElementById("demo").innerHTML=
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();
}
```

```js
// 如果您创建函数来加载外部资源（如脚本或文件），则在内容完全加载之前无法使用这些内容。这是使用回调的最佳时机。
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}
function getFile(myCallback) {
  let req = new XMLHttpRequest();
  req.open('GET', "mycar.html");
  req.onload = function() {
    if (req.status == 200) {
      myCallback(this.responseText);
    } else {
      myCallback("Error: " + req.status);
    }
  }
  req.send();
}
getFile(myDisplayer);
```

**Promise** 对象包含生产代码和对消费代码的调用

```js
let myPromise = new Promise(function(myResolve, myReject) {
  /* "Producing Code"（可能需要一些时间）*/
  myResolve(); // 成功时
  myReject();  // 出错时
});

/* "Consuming Code" （必须等待一个兑现的承诺）*/

myPromise.then(
  function(value) { /* 成功时的代码 */ },
  function(error) { /* 出错时的代码 */ }
);
```

当执行代码获得结果时，它应该调用两个回调之一：

| 结果 | 调用                    |
| :--- | :---------------------- |
| 成功 | myResolve(result value) |
| 出错 | myReject(error object)  |

Promise 对象支持两个属性：*state* 和 *result*。

| myPromise.state | myPromise.result |
| :-------------- | :--------------- |
| "pending"       | undefined        |
| "fulfilled"     | 结果值           |
| "rejected"      | error 对象       |

```js
let myPromise = new Promise(function(myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open('GET', "mycar.htm");
  req.onload = function() {
    if (req.status == 200) {
      myResolve(req.response);
    } else {
      myReject("File not Found");
    }
  };
  req.send();
});

myPromise.then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);
```

函数前的关键字 `async` 使函数返回 promise

```js
async function myFunction() {
  return "Hello";
}
// 等同于：
async function myFunction() {
  return Promise.resolve("Hello");
}

myFunction().then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);
```

函数前的关键字 `await` 使函数等待 promise（`await` 关键字只能在 `async` 函数中使用。）

```js
async function myDisplay() {
  let myPromise = new Promise(function(myResolve, myReject) {
    myResolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}
myDisplay()

async function getFile() {
  let myPromise = new Promise(function(myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open('GET', "mycar.html");
    req.onload = function() {
      if (req.status == 200) {myResolve(req.response);}
      else {myResolve("File not Found");}
    };
    req.send();
  });
  document.getElementById("demo").innerHTML = await myPromise;
}
getFile();
```








#### 对象object

```javascript
var person = {
  firstName: "Bill",
  lastName : "Gates",
  id       : 678,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};

var x = person;  // 这不会创建 person 的副本, x 和 person 是同一个对象, 对 x 的任何改变都将改变 person。
```

```js
// 访问对象属性的语法是：
objectName.property           // person.age
// 或者：
objectName["property"]       // person["age"]

// 可以通过简单的赋值，向已存在的对象添加新属性/方法
person.nationality = "English";
person.name = function () {
    return this.firstName + " " + this.lastName;
};

// delete 关键词会同时删除属性的值和属性本身
delete person.age;
```



##### **this**

在 JavaScript 中，`this` 关键字引用拥有该 JavaScript 代码的*对象*。

引用*哪个*对象取决于调用（使用或调用）的方式。

根据其使用方式，关键字 `this` 引用不同的对象：

- 在对象方法中，`this` 引用该*对象*。
- 单独使用时，`this` 引用*全局对象*。
- 在函数中，`this` 引用*全局对象*。
- 在函数中，在严格模式下，`this` 是 `undefined`。
- 在事件中，`this` 引用接收事件的*元素*。
- call()、apply() 和 bind() 等方法可以将 `this` 引用到*任何对象*。



##### 显示Object对象

```js
/* 
    按名称显示对象属性
    循环显示对象属性
    使用 Object.values() 显示对象
    使用 JSON.stringify() 显示对象	(不会对函数进行字符串化, 可先.toString())
*/
const myArray = Object.values(person);	// myArray 现在是 JavaScript 数组
let myString = JSON.stringify(person);	// myString 现在是 JavaScript 字符串
```

##### 访问器Getter & Setter

```js
var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "en",
  get lang() {
    return this.language.toUpperCase();
  }
};
// 使用 getter 来显示来自对象的数据：
document.getElementById("demo").innerHTML = person.lang;


var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "",
  set lang(lang) {
    this.language = lang.toUpperCase();
  }
};
// 使用 setter 来设置对象属性：
person.lang = "en";


// Object.defineProperty() 方法也可用于添加 Getter 和 Setter
var obj = {counter : 0};
// 定义 setters
Object.defineProperty(obj, "reset", {
  get : function () {this.counter = 0;}
});
Object.defineProperty(obj, "increment", {
  get : function () {this.counter++;}
});
```



##### 对象构造器

```js
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}
var myMother = new Person("Steve", "Jobs", 56, "green");
// 与向已有对象添加新属性/方法不同，您无法为对象构造器添加新属性/方法。

// 使用 prototype 属性允许您为对象构造器添加新属性/方法
Person.prototype.nationality = "English";
Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
};
```



##### 可迭代对象

```js
// 创建对象
myNumbers = {};
// 使其可迭代
myNumbers[Symbol.iterator] = function() {
  let n = 0;
  done = false;
  return {
    next() {
      n += 10;
      if (n == 100) {done = true}
      return {value:n, done:done};
    }
  };
}

let text = ""
for (const num of myNumbers) {
  text += num +"<br>"
}
```



##### Set

Set（集合）是一组唯一值的集合

![image-20241212195552105](D:\Learning\Frontend\Note\image-20241212195552105.png)

```js
// values() 方法返回包含 Set 中所有值的 Iterator 对象, keys() 返回与 values() 相同的结果
letters.values()   // 返回 [object Set Iterator]

// entries() 方法返回的是 [value,value] 值值对，而不是 [key,value] 键值对。
const iterator = new Set(["a","b","c"]).entries();
for (const entry of iterator) {
  text += entry + "<br>";	// a,a \n b,b \n c,c
}

// 对于一般对象 ES6 引入了 Object.keys(), Object.values(), 和 Object.entries() 方法，可以用来获取键、值或键值对的数组，然后可以对其进行迭代。
```



##### Map

Map 保存键值对，其中键可以是任何数据类型。Map 会记住键的原始插入顺序。

![image-20241212205042499](D:\Learning\Frontend\Note\image-20241212205042499.png)

JavaScript 对象与映射之间的差异：

| Object（对象）             | Map（映射）          |
| :------------------------- | :------------------- |
| 不可直接迭代               | 可直接迭代           |
| 无 size 属性               | 有 size 属性         |
| 键必须是字符串（或Symbol） | 键可以是任何数据类型 |
| 键不排序                   | 键按插入排序         |
| 有默认键                   | 没有默认键           |



##### ES5对象方法

**管理对象**

```js
// 以现有对象为原型创建对象
Object.create()

// 添加或更改对象属性
Object.defineProperty(object, property, <descriptor>{value : value})

// 添加或更改对象属性
Object.defineProperties(object, descriptors)

// 访问属性
Object.getOwnPropertyDescriptor(object, property)

// 以数组返回所有属性
Object.getOwnPropertyNames(object)

// 访问原型
Object.getPrototypeOf(object)

// 以数组返回可枚举属性
Object.keys(object)
```

**保护对象**

```js
// 防止向对象添加属性
Object.preventExtensions(object)

// 如果属性可以添加到对象，则返回 true
Object.isExtensible(object)

// 防止更改对象属性（不是值）
Object.seal(object)

// 如果对象被密封，则返回 true
Object.isSealed(object)

// 防止对对象进行任何更改
Object.freeze(object)

// 如果对象被冻结，则返回 true
Object.isFrozen(object)
```

**更改元数据**

ES5 允许更改以下属性元数据：

```js
writable : true      // 属性值可更改
enumerable : true    // 属性可枚举
configurable : true  // 属性可重新配置
```



##### 日期Date

```js
var d = new Date();
var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
var d = new Date(milliseconds);
var d = new Date(dateString);

d.toString();
d.toUTCString();
d.toDateString();
```

![image-20241210001026680](D:\Learning\Frontend\Note\image-20241210001026680.png)

![image-20241210001119098](D:\Learning\Frontend\Note\image-20241210001119098.png)





##### 数组Array

```javascript
var array-name = [item1, item2, ...];
```

可以在相同数组中存放不同类型的变量

**方法**

```js
/* toString()把数组转换为数组值（逗号分隔）的字符串; 如果需要原始值，会自动把数组转换为字符串*/
var fruits = ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits.toString();		// "Banana,Orange,Apple,Mango"

/* join()可将所有数组元素结合为一个字符串 */
var fruits = ["Banana", "Orange","Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits.join("*"); 	// "Banana*Orange*Apple*Mango"

/* pop() 方法从数组中删除最后一个元素并返回“被弹出”的值 */
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var x = fruits.pop();      // x 的值是 "Mango", fruits的值是["Banana", "Orange", "Apple"]

/* push() 方法（在数组结尾处）向数组添加一个新的元素并返回新数组的长度 */ 
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var x =  fruits.push("Kiwi");   //  x 的值是 5

/* shift() 方法会删除首个数组元素并返回被“位移出”的字符串 */
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift();             // 返回 "Banana", fruits的值是["Orange", "Apple", "Mango"]

/* unshift() 方法（在开头）向数组添加新元素并返回新数组的长度 */
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.unshift("Lemon");    // 返回 5

/* 通过使用它们的索引号来访问数组元素 */
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits[0] = "Kiwi";        // 把 fruits 的第一个元素改为 "Kiwi"
fruits[fruits.length] = "Kiwi";          // 向 fruits 追加 "Kiwi"

/* 既然 JavaScript 数组属于对象，其中的元素就可以使用 JavaScript delete 运算符来删除 */
var fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[0];           // 把 fruits 中的首个元素改为 undefined

/* splice() 方法可用于向数组添加新项, 返回一个包含已删除项的数组 */
fruits.splice(start, delNum[, item1, item2, ...]);

/* concat() 方法通过合并（连接）现有数组来创建一个新数组 */
var arr = arr1.concat(arr2, arr3, ...);
                  
/* slice() 方法用数组的某个片段切出新数组,不会从源数组中删除任何元素 */
var arr1 = arr2.slice(start[, end])

```

```js
/* 以字母顺序 sort()方法对数组进行排序 reverse()方法反转数组中的元素*/
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();            // 对 fruits 中的元素进行排序
fruits.reverse();         // 反转元素顺序

/* 数字排序 */
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});	// 升序<-负数
points.sort(function(a, b){return b - a});  // 降序

/* 以随机顺序排序数组 */
points.sort(function(a, b){return 0.5 - Math.random()}); 

/* 可以使用 Math.max.apply 来查找数组中的最高值 */
function myArrayMax(arr) {
    return Math.max.apply(null, arr);
}

/* 排序对象数组 */
var cars = [
{type:"Volvo", year:2016},
{type:"Saab", year:2001},
{type:"BMW", year:2010}];

cars.sort(function(a, b){return a.year - b.year});

cars.sort(function(a, b){
	  var x = a.type.toLowerCase();
	  var y = b.type.toLowerCase();
	  if (x < y) {return -1;}
	  if (x > y) {return 1;}
	  return 0;
});
```

```javascript
/* forEach() 方法为每个数组元素调用一次函数（回调函数） */
var txt = "";
var numbers = [45, 4, 9, 16, 25];
numbers.forEach(myFunction);
function myFunction(value[, index, array]) {
  txt = txt + value + "<br>"; 
}

/* map() 方法通过对每个数组元素执行函数来创建新数组 */
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(myFunction);
function myFunction(value[, index, array]) {
  return value * 2;
}

/* filter() 方法创建一个包含通过测试的数组元素的新数组 */
var numbers = [45, 4, 9, 16, 25];
var over18 = numbers.filter(myFunction);
function myFunction(value[, index, array]) {
  return value > 18;
}

/* reduce() 方法在每个数组元素上从左到右运行函数，以生成单个值; reduceRight()从右到左 */
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduce(myFunction);
function myFunction(total, value[, index, array]) {		// 总数(先前返回的值) 项目值 项目索引 数组本身
  return total + value;
}

/* every() 方法检查所有数组值是否通过测试 */
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);
function myFunction(value[, index, array]) {
  return value > 18;	// false	
}

/* some() 方法检查某些数组值是否通过了测试 */
var numbers = [45, 4, 9, 16, 25];
var someOver18 = numbers.some(myFunction);
function myFunction(value[, index, array]) {
  return value > 18;    // true
}

/* indexOf() 方法在数组中搜索元素值并返回其位置; indexOf() 方法在数组中搜索元素值并返回其位置 */
array.indexOf(item[, start])
array.lastIndexOf(item[, start])

/* find() 方法返回通过测试函数的第一个数组元素的值; findIndex() 方法返回通过测试函数的第一个数组元素的索引 */
var numbers = [4, 9, 16, 25, 29];
var first = numbers.find(myFunction);
function myFunction(value[, index, array]) {
  return value > 18;
}
```

```js
const cars = ["Saab", "Volvo", "BMW"];
cars = ["Toyota", "Volvo", "Audi"];    // ERROR
// const不定义常量数组, 定义的是对数组的常量引用, 因此仍然可以更改常量数组的元素。
// 可以更改元素：
cars[0] = "Toyota";
// 可以添加元素：
cars.push("Audi");
```

**数组和对象的区别** 	在 JavaScript 中，*数组*使用*数字索引*。在 JavaScript 中，*对象*使用*命名索引*。





### 运算符

#### 数学运算符 

**二进制加号** `+` 可以连接字符串。如果任何一个操作数是一个字符串，那么另一个操作数也将被转换为字符串：

```javascript
alert( '1' + 2 ); // '12'，字符串
alert( 1 + '2' ); // '12'，字符串
alert( 1 + 1 + '2' ); // '22'，字符串
alert( '1' + 1 + 2 ); // '112'，字符串
```



#### 三元运算符

唯一具有三个参数的操作：`cond ? resultA : resultB`。如果 `cond` 为真，则返回 `resultA`，否则返回 `resultB`。



#### 逻辑运算符 

逻辑与 `&&` 和或 `||` 执行短路运算，**然后返回运算停止处的值**（`true`/`false` 不是必须的）。逻辑非 `!` 将操作数转换为布尔值并返回其相反的值。



#### 比较运算符

对不同类型的值进行相等检查时，运算符 `==` 会将不同类型的值转换为数字（除了 `null` 和 `undefined`，它们彼此相等而没有其他情况），所以下面的例子是相等的：

```javascript
alert( 0 == false ); // true
alert( 0 == '' ); // true
```

其他比较也将转换为数字。

严格相等(值与类型都相等)运算符 `===` 不会进行转换：不同的类型总是指不同的值。

值 `null` 和 `undefined` 是特殊的：它们只在 `==` 下相等，且不相等于其他任何值。

大于/小于比较，在比较字符串时，会按照字符顺序逐个字符地进行比较。如果将字符串与数字进行比较，那么在做比较时 JavaScript 会把字符串转换为数值。空字符串将被转换为 0。非数值字符串将被转换为始终为 `false` 的 `NaN`。



#### 空值合并运算符 

`a ?? b` 的结果是：

- 如果 `a` 是已定义的，则结果为 `a`，
- 如果 `a` 不是已定义的，则结果为 `b`。







### 数学Math

![image-20241209000550549](D:\Learning\Frontend\Note\image-20241209000550549.png)

![image-20241209000607408](D:\Learning\Frontend\Note\image-20241209000607408.png)



### 条件&循环语句

#### 条件

```js
if (条件 1) {
    条件 1 为 true 时执行的代码块
} else if (条件 2) {
    条件 1 为 false 而条件 2 为 true 时执行的代码块
 } else {
    条件 1 和条件 2 同时为 false 时执行的代码块
}

switch(表达式) {
     case n:	// case 使用严格比较
        代码块
        break;
     case n:
        代码块
        break;
     default:
        默认代码块
} 
```

#### 循环

```js
for (语句 1; 语句 2; 语句 3) {	// 语句 1 在循环开始之前执行 语句 2 定义运行循环的条件 语句 3 会在每次循环被执行后执行
     要执行的代码块
}


// for/in 语句遍历对象的属性（键）；遍历数组的属性(index)
for (key/index in object/array) {
  // code block to be executed
}


// for of 语句循环遍历可迭代对象(数组、字符串、映射、节点列表)的值
for (variable of iterable) {
  // code block to be executed
}


while (条件) {
    要执行的代码块
}

do {
    要执行的代码块
}
while (条件);
```

#### 标签

```js
label: statements
break labelname;
continue labelname;

var cars = ["BMW", "Volvo", "porsche", "Ford"];
var text = "";
list: {
  text += cars[0] + " "; 
  text += cars[1] + " "; 
  break list; // 结果："BMW Volve"		若 break; 结果：""
  text += cars[2] + " "; 
  text += cars[3] + " "; 
}
document.getElementById("demo").innerHTML = text;	
```



### 异常

**`try` 语句使您能够测试代码块中的错误。**

**`catch` 语句允许您处理错误。**

**`throw` 语句允许您创建自定义错误。**

**`finally` 使您能够执行代码，在 try 和 catch 之后，无论结果如何。**

```js
function myFunction() {
    var message, x;
    message = document.getElementById("message");
    message.innerHTML = "";
    x = document.getElementById("demo").value;
    try { 
        if(x == "") throw "是空的";
        if(isNaN(x)) throw "不是数字";
         x = Number(x);
        if(x >  10) throw "太大";
        if(x <  5) throw "太小";
    }
    catch(err) {
        message.innerHTML = "错误：" + err + ".";
    }
    finally {
        document.getElementById("demo").value = "";
    }
}
```

Error 对象提供两个属性：`name` 和 `message`

name 属性可返回六个不同的值：

| 错误名         | 描述                             |
| :------------- | :------------------------------- |
| ~~EvalError~~  | ~~已在 eval() 函数中发生的错误~~ |
| RangeError     | 已发生超出数字范围的错误         |
| ReferenceError | 已发生非法引用                   |
| SyntaxError    | 已发生语法错误                   |
| TypeError      | 已发生类型错误                   |
| URIError       | 在 encodeURI() 中已发生的错误    |





### 正则表达式

正则表达式是构成*搜索模式（search pattern）*的字符序列, 常用于两个*字符串方法*：`search()` 和 `replace()`

```js
/pattern/modifiers;
```

![image-20241210154036244](D:\Learning\Frontend\Note\image-20241210154036244.png)

![image-20241210154058074](D:\Learning\Frontend\Note\image-20241210154058074.png)

#### RegExp 对象

```js
// test() 通过模式来搜索字符串，然后根据结果返回 true 或 false
/e/.test("The best things in life are free!");	// true

// exec() 通过指定的模式（pattern）搜索字符串，并返回已找到的文本
var obj = /e/.exec("The best things in life are free!");
obj[0]	// e
obj.index	// 2
obj.input	// "The best things in life are free!"
```



### 类

#### 定义

JavaScript 类是 JavaScript 对象的模板。

```js
class ClassName {
  constructor() { ... }
  method_1() { ... }
  method_2() { ... }
  method_3() { ... }
}
```

构造方法是一种特殊的方法：

- 它必须拥有确切名称的“构造函数”
- 创建新对象时自动执行
- 用于初始化对象属性
- 如果未定义构造函数方法，JavaScript 会添加空的构造函数方法。

#### 继承

如需创建类继承，请使用 `extends` 关键字，使用类继承创建的类继承了另一个类的所有方法

`super()` 方法引用父类，通过在 constructor 方法中调用 `super()` 方法，我们调用了父级的 constructor 方法，获得了父级的属性和方法的访问权限。

```js
// 为 "carname" 属性创建 getter 和 setter
class Car {
  constructor(brand) {
    this._carname = brand;
  }
  get carname() {
    return this._carname;
  }
  set carname(x) {
    this._carname = x;
  }
}
let myCar = new Car("Ford");
document.getElementById("demo").innerHTML = myCar.carname;  // 不带括号
```

#### Static

```js
// 不能在对象上调用 static 方法，只能在对象类上调用
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}
let myCar = new Car("Ford");
// 您可以在 Car 类上调用 'hello()' ：
document.getElementById("demo").innerHTML = Car.hello();
// 但不能在 Car 对象上调用：
// document.getElementById("demo").innerHTML = myCar.hello();

// 如果要在 static 方法中使用 myCar 对象，可以将其作为参数发送：
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello(x) {
    return "Hello " + x.name;
  }
}
let myCar = new Car("Ford");
document.getElementById("demo").innerHTML = Car.hello(myCar);
```



### 模块

JavaScript 模块允许您将代码分解成单独的文件, 模块是使用 `import` 语句从外部文件导入的, 模块还依赖于 <script> 标签中的 `type="module"`

```js
<script type="module">
import message from "./message.js";
</script>
```

带有*函数*或*变量*的模块可以存储在任何外部文件中

#### **导出**

**命名导出**

```js
// 逐个内联创建
export const name = "Bill";
export const age = 19;

// 在文件底部一次性全部创建
const name = "Bill";
const age = 19;
export {name, age};
```

**默认导出**

```js
// 一个文件中只能有一个默认导出
const message = () => {
    const name = "Bill";
    const age = 19;
    return name + ' is ' + age + 'years old.';
};
export default message;
```

#### 导入

可以通过两种方式将模块导入到文件中，具体取决于它们是命名导出还是默认导出。命名导出是使用大括号构造的。默认导出不是。

```js
// 从命名导出中导入
import { name, age } from "./person.js";

// 从默认导出导入
import message from "./message.js";
```



### JSON

主要由对象 **{ }** 和数组 **[ ]** 组成:

- 数据是名称/值对		JSON 名称需要双引号，JavaScript 名称不需要
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组

```js
{
    "employees":[
        {"firstName":"Bill", "lastName":"Gates"}, 
        {"firstName":"Steve", "lastName":"Jobs"},
        {"firstName":"Alan", "lastName":"Turing"}
    ]
}

[ "Google", "Runoob", "Taobao" ]
```

####  JSON与JS对象转换

在 JSON 中，对象/数组值的类型必须属于字符串、数字、对象、数组、布尔或 null。

在 JavaScript 中，对象/数组值可以是以上所有类型，外加任何其他有效的 JavaScript 表达式，包括函数、日期和 undefined。

```js
var myObj = JSON.parse(myJSON, reviver); //reviver 参数是自定义函数，在返回值之前，它会检查每个属性
var obj = JSON.parse(text, function (key, value) {
    if  (key == "birth") {
        return new Date(value);
    } else {
         return value;
   	}
  });


var myJSON =  JSON.stringify(myObj);
```

#### JSONP 

JSON with Padding

由于跨域政策从另一个域请求文件会引起问题，从另一个域请求外部脚本没有这个问题。JSONP使用 script 标签替代 XMLHttpRequest 对象。

```js
<script>
    function myFunc(myObj) {
      document.getElementById("demo").innerHTML = myObj.name;
    }
    //or:
    function clickButton() {
        var s = document.createElement("script");
        s.src = "demo_jsonp.php";
        document.body.appendChild(s);
    }
    function myFunc(myObj) {
      document.getElementById("demo").innerHTML = myObj.name;
    }
</script>

<script src="/demo/demo_php_jsonp.php"></script>
```

```php
// demo_php_jsonp.php
$myJSON = '{ "name":"Bill Gates", "age":62, "city":"Seattle" }';
echo "myFunc(".$myJSON.");";
```