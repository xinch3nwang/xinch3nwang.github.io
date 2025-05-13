# XPath

### **基本概念**

- **节点类型**：元素节点、属性节点、文本节点、注释节点等。
- **路径表达式**：通过路径选择节点，类似文件系统路径。
- **轴**：定义节点间的关系（如父节点、子节点、兄弟节点等）。

### **基本语法**

#### 1. **路径表达式**

| 符号 | 含义                       | 示例              | 匹配结果                       |
| ---- | -------------------------- | ----------------- | ------------------------------ |
| `/`  | 从根节点开始选择           | `/bookstore/book` | 根节点下所有 `book` 元素       |
| `//` | 从当前节点向下任意层级选择 | `//book`          | 文档中所有 `book` 元素         |
| `.`  | 当前节点                   | `./title`         | 当前节点的 `title` 子元素      |
| `..` | 父节点                     | `book/..`         | `book` 元素的父节点            |
| `@`  | 选择属性                   | `//book/@lang`    | 所有 `book` 元素的 `lang` 属性 |

#### 2. **谓语（Predicates）**

- 过滤条件

  ，用方括号

   

  ```
  []
  ```

   

  表示。

  - 示例

    ：

    - `//book[price>30]`：价格大于 30 的 `book` 元素。
    - `//book[last()]`：最后一个 `book` 元素。
    - `//book[position()<=2]`：前两个 `book` 元素。
    - `//book[@category='fiction']`：`category` 属性为 `fiction` 的 `book` 元素。

#### 3. **通配符**

| 通配符   | 含义           | 示例        | 匹配结果                             |
| -------- | -------------- | ----------- | ------------------------------------ |
| `*`      | 任意元素       | `//*`       | 文档中所有元素                       |
| `@*`     | 任意属性       | `//book/@*` | 所有 `book` 元素的所有属性           |
| `node()` | 任意类型的节点 | `//node()`  | 文档中所有节点（元素、文本、注释等） |

### **常见函数**

#### 1. **节点选择函数**

- `last()`：返回最后一个节点的位置。

- `position()`：返回当前节点的位置。

- ```
  count()
  ```

  ：返回节点数量。

  - 示例

    ：

    xpath

    

    

    

    

    

    ```xpath
    //book[count(author)>1]  <!-- 有多个作者的book元素 -->
    ```

#### 2. **字符串函数**

- `text()`：返回节点的文本内容。

- `contains()`：检查字符串是否包含子串。

- ```
  starts-with()
  ```

  ：检查字符串是否以指定子串开头。

  - 示例

    ：

    xpath

    

    

    

    

    

    ```xpath
    //book[contains(title, 'Java')]  <!-- 标题包含"Java"的book元素 -->
    //book[starts-with(@id, 'b')]  <!-- id以"b"开头的book元素 -->
    ```

#### 3. **数值函数**

- `sum()`：计算节点集的数值总和。

- `floor()`：向下取整。

- ```
  ceiling()
  ```

  ：向上取整。

  - 示例

    ：

    xpath

    

    

    

    

    

    ```xpath
    sum(//book/price)  <!-- 所有书籍价格的总和 -->
    ```

### **轴（Axes）**

- 定义节点间的关系

  ，语法：

  ```
  轴名称::节点测试
  ```

  。

  - 常用轴

    ：

    | 轴名称              | 含义                           | 示例                           | 匹配结果                           |
    | ------------------- | ------------------------------ | ------------------------------ | ---------------------------------- |
    | `child`             | 子节点                         | `book/child::title`            | `book` 的 `title` 子元素           |
    | `parent`            | 父节点                         | `title/parent::book`           | `title` 的父元素 `book`            |
    | `descendant`        | 后代节点（子节点、孙节点等）   | `bookstore/descendant::book`   | `bookstore` 下的所有 `book` 元素   |
    | `ancestor`          | 祖先节点（父节点、祖父节点等） | `title/ancestor::bookstore`    | `title` 的 `bookstore` 祖先元素    |
    | `following-sibling` | 后续兄弟节点                   | `book/following-sibling::book` | 当前 `book` 之后的所有 `book` 元素 |
    | `preceding-sibling` | 前置兄弟节点                   | `book/preceding-sibling::book` | 当前 `book` 之前的所有 `book` 元素 |

### **示例 **

```xml
<bookstore>
  <book category="fiction">
    <title lang="en">Harry Potter</title>
    <price>29.99</price>
  </book>
  <book category="tech">
    <title lang="en">Learning XPath</title>
    <price>39.95</price>
  </book>
</bookstore>
```

1. **选择所有书籍的标题**：

   ```xpath
   //book/title
   ```

2. **选择第一本书的价格**：

   ```xpath
   //book[1]/price
   ```

3. **选择所有英语书籍的标题**：

   ```xpath
   //book/title[@lang='en']
   ```

4. **选择价格大于 30 的书籍的类别**：

   ```xpath
   //book[price>30]/@category
   ```

5. **选择最后一本书的父节点**：

   ```xpath
   //book[last()]/..
   ```

   

   ### 在线练习网站

   - **[SelectorsHub](https://selectorshub.com/xpath-practice-page/)**：其 XPath 练习页面为用户提供了在复杂场景中测试和学习 XPath 选择器的实践环境，能让用户学习如何处理高级自动化挑战，如影子 DOM、嵌套 Iframe 和动态元素等。
   - **[Xpather](https://xpather.com/)**：在线工具，可实时测试、评估和生成针对 XML 和 HTML 文档的 XPath 查询，用户能通过浏览器交互式地创建和执行 XPath 查询。

