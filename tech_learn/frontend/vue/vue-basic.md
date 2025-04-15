# Vue.js - Basic





## 基础

### 创建Vue应用

#### 本地创建vue应用

```bash
npm create vue@latest <project-name>
cd <project-name>
npm install		# 安装依赖
npm run dev		# 启动开发服务器

npm run build	# 构建生产环境版本
```



#### CDN创建vue应用

##### 使用全局构建版本

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createAPP, ref } = Vue	// 无
  // 创建一个应用实例
  const app = createApp({	// Vue.createAPP()
    setup() {
      const message = ref('Hello Vue!')	// Vue.ref()
      return {
        message
      }
    }
  })
  // 挂载到 DOM 中
  app.mount('#app')
</script>
```

通过 `<script>` 标签直接在 HTML 文件中引入了 Vue.js 库，而不是通过模块打包工具（如 Webpack、Vite 等）来管理依赖。这种情况下，Vue 的所有顶层 API（例如 `createApp`, `component`, `directive` 等）都被挂载到了全局对象 `window.Vue` 上，使得它们可以直接在你的 JavaScript 或者其他脚本文件中作为 `Vue` 对象的属性访问。

**局限性：**

- **污染全局命名空间**：所有的 Vue API 都挂在了全局对象上，可能会导致命名冲突。
- **缺少 Tree Shaking**：由于是整个库被引入，即使你只用了部分功能，未使用的代码仍然会被包含进来，增加了最终包的大小。
- **缺乏模块化支持**：不能很好地与现代JavaScript模块系统集成，比如 ES6 模块（import/export），这限制了对某些高级特性的使用。



##### 使用ES模块构建版本

```html
<div id="app">{{ message }}</div>

<script type="module">
  import { createAPP, ref } from "https://unpkg.com/vue@3/dist/vue.global.js"	// 使用完整的 CDN URL 导入
  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

```html
<script type="importmap">	// 使用导入映射表 (Import Maps)
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'
  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```



##### 拆分模块

将代码分割成单独的 JavaScript 文件以便管理。

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'
  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```



#### 创建过程解析

##### 应用实例

每个 Vue 应用都是通过 [`createApp`](https://cn.vuejs.org/api/application.html#createapp) 函数创建一个新的应用实例：

```js
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

每个应用都需要一个“根组件”，其他组件将作为其子组件。大多数真实的应用都是由一棵嵌套的、可重用的组件树组成的。例如，一个待办事项 (Todos) 应用的组件树可能是这样的：

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

应用实例并不只限于一个。`createApp` API 允许你在同一个页面中创建多个共存的 Vue 应用，而且每个应用都拥有自己的用于配置和全局资源的作用域。想要 Vue 去控制一个大型页面中特殊的一小部分，应避免将一个单独的 Vue 应用实例挂载到整个页面上，而是应该创建多个小的应用实例，将它们分别挂载到所需的元素上去。

##### 应用配置

应用实例会暴露一个 `.config` 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：

```js
app.config.errorHandler = (err, instance, info) => {	// 错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串
  /* 处理错误 */
}
```

应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件：

```js
app.component('TodoDeleteButton', TodoDeleteButton)   	// 使 `TodoDeleteButton` 在应用的任何地方都是可用的
```

##### 应用挂载

应用实例必须在调用了 `.mount()` 方法后才会渲染出来。该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串：

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

应用根组件的内容将会被渲染在容器元素里面。`.mount()` 方法应该始终在整个应用配置和资源注册完成后被调用。不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。



### 模板template语法

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

#### 文本插值

最基本的数据绑定形式是文本插值，它使用的是双大括号：

```html
<span>Message: {{ msg }}</span>
```

双大括号标签会被替换为相应组件实例中 `msg` 属性的值。同时每次 `msg` 属性更改时它也会同步更新。

#### Attribute 绑定

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 [`v-bind` 指令](https://cn.vuejs.org/api/built-in-directives.html#v-bind)：

```html
<!--v-bind 指令指示 Vue 将元素的 id attribute值 与组件里 dynamicId值 保持一致-->
<div v-bind:id="dynamicId"></div>
```

如果有一个包含多个 attribute 的 JavaScript 对象，通过不带参数的 `v-bind` 将它们绑定到单个元素上(**动态绑定多个值**)：

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```

```html
<div v-bind="objectOfAttrs"></div>
```



#### 指令 Directives

指令是带有 `v-` 前缀的特殊 attribute。Vue 提供了许多[内置指令](https://cn.vuejs.org/api/built-in-directives.html)。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。

![指令语法图](https://cn.vuejs.org/assets/directive.DtZKvoAo.png)

##### 参数 Arguments

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。

同样在指令参数上也可以使用一个 JavaScript 表达式（**动态参数**），需要包含在一对方括号内：

```html
<!-- 这里的 attributeName 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数 -->
<a v-bind:[attributeName]="url"> ... </a>

<!--
动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。
当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写。
动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的，推荐使用计算属性替换复杂的表达式。
-->
```

##### 修饰符 Modifiers

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。



#### JavaScript 表达式

所有的数据绑定中都支持完整的 JavaScript 表达式（**单一表达式**或**调用函数**）：

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

这些表达式都会被作为 JavaScript ，以当前组件实例为作用域解析执行。

在 Vue 模板内，JavaScript 表达式可以被使用在如下场景上：

- 在文本插值中 (双大括号)

- 在任何 Vue 指令 (以 `v-` 开头的特殊 attribute) attribute 的值中

  

### 响应式基础

#### ref()

```js
import { ref } from 'vue'
// 在组合式 API 中，推荐使用 ref() 函数来声明响应式状态：
const count = ref(0)
// ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref 对象中返回：
count.value
```

##### 模板访问

```html
<!-- 要在模板template中访问 ref，从组件的 setup() 函数中声明并返回它们：-->
<!-- *.js -->
<script>
    export default {
      setup(){
        const count = ref(0)
        function increment() {
          count.value++
        }
        return {
          count,
          increment
        }
      }
    }
</script>
<!-- *.html -->
<div>
    <button @click="count++">
        {{ count }}
    </button>
</div>


<!-- 在 setup() 函数中手动暴露大量的状态和方法非常繁琐，可以通过使用单文件组件 (SFC) 来避免 <script setup> 来大幅度地简化代码 -->
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
  function increment() {
    count.value++
  }
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

```js
// 在模板中使用 ref 时，不需要附加 .value，ref 会自动解包
// 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
const count = ref(0)
const object = { id: ref(0) }
const { id } = object
{{ count + 1 }}		// 1
{{ object.id + 1 }}	 // [object Object]1
{{ id + 1}}			// 1
{{ object.id }}		// 0 文本插值的最终计算值可以自动解包 等价于 {{ object.id.value }} 
```

##### 深层响应性

Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 `Map`。Ref 会使它的值具有深层响应性：即使改变嵌套对象或数组时，变化也会被检测到。

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

##### DOM 更新时机

修改了响应式状态时，DOM 会在“next tick”更新周期中缓冲所有状态的修改，确保该周期多次修改，最终每个组件都只被更新一次。

要等待 DOM 更新完成后再执行额外的代码，可以使用 `nextTick()`全局 API：

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了 再执行额外的代码
}
```



#### reactive()

与将内部值包装在特殊对象中的 ref 不同，`reactive()` 将使对象本身具有响应性：

只能用于对象类型 (对象、数组和如 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections)), 不能持有如 `string`、`number` 或 `boolean` 这样的[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)。

```html
<script>
	const state = reactive({ count: 0 })
    
    // 由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用，不能轻易地“替换”响应式对象。
    // (响应性连接已丢失！)上面的 ({ count: 0 }) 引用将不再被追踪
    state = reactive({ count: 1 })
    
    // 当直接从响应式对象中提取某个属性（例如通过点符号 state.count 或解构），实际上是在获取该属性的一个值副本，而不是引用
    // 当解构时，count 已经与 state.count 断开连接
    let { count } = state
    count++		// 不会影响原始的 state
	// or:
    // 该函数接收到的是一个普通的数字，并且无法追踪 state.count 的变化
    callSomeFunction(state.count)
</script>
<template>
    <button @click="state.count++">
      {{ state.count }}
    </button>
</template>
```

##### Reactive Proxy代理

- `reactive()` 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的。
- 只有代理对象是响应式的，更改原始对象不会触发更新。
- 为保证访问代理的一致性，对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象，而对一个已存在的代理对象调用 `reactive()` 会返回其本身。

##### 深层响应性

当访问嵌套对象时，它们也会被 `reactive()` 包装。当 ref 的值是一个对象时，`ref()` 也会在内部调用它。与浅层 ref 类似，这里也有一个 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) API 可以选择退出深层响应性。

##### Ref 在 Reactive 对象 中

当 `ref` 是 `reactive` 对象的一个属性时，它会被自动解包。可以直接访问 `ref` 的值，而不需要使用 `.value`。

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count)	 // 0	一个 ref 会在作为响应式对象的属性被访问或修改时自动解包
state.count = 1
console.log(count.value)	 // 1

const otherCount = ref(2)
state.count = othercount
console.log(state.count) 	// 2
console.log(count.value) 	// 1 	原始 ref 现在已经和 state.count 失去联系
```

##### Ref 在 Reactive 数组/Map 中

与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包

```js
const arr = reactive([ref(0)])
console.log(arr[0].value)
const map = reactive(new Map([['count',ref(0)]]))
consle.log(map.get('count').value)
```



#### 计算属性computed()

```html
<script setup>
import { reactive, computed } from 'vue'
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
const publishedBooksMessage = computed(() => {	// 一个计算属性 ref
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`。Vue 的计算属性会自动追踪响应式依赖。它会检测到 `publishedBooksMessage` 依赖于 `author.books`，所以当 `author.books` 改变时，任何依赖于 `publishedBooksMessage` 的绑定都会同时更新。

##### 计算属性缓存 vs 方法

若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果，而不用重复执行 getter 函数。相比之下，方法调用**总是**会在重渲染发生时再次执行函数。

##### 可写计算属性

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

```html
<script setup>
import { ref, computed } from 'vue'
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
  get() {	// get: () => `${firstName.value} ${lastName.value}`,
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {	// set: (newValue) => { [firstName.value, lastName.value] = newValue.split(' '); }
    [firstName.value, lastName.value] = newValue.split(' ')    // 这里使用的是解构赋值语法
  }
})
</script>
```



#### 侦听器

计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

##### watch()

在组合式 API 中，我们可以使用 [`watch` 函数](https://cn.vuejs.org/api/reactivity-core.html#watch)在每次响应式状态发生变化时触发回调函数：

**1. 监听单个 `ref`**

```js
const x = ref(0);
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});
```

- **监听对象**：直接监听 `x` 这个 `ref`。
- **回调函数**：当 `x` 的值发生变化时，Vue 会自动调用这个回调函数，并将 `x` 的新值作为参数传递给它（即 `newX`）。
- **触发时机**：每当 `x` 发生变化时，回调函数都会被调用，并打印新的 `x` 值。

**2. 使用 getter 函数监听派生状态**

```js
const x = ref(0);
const y = ref(0);
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);
```

- **监听对象**：这里使用了一个 getter 函数 `() => x.value + y.value`，它返回一个基于 `x` 和 `y` 的计算结果（即它们的和）。
- **回调函数**：当 `x` 或 `y` 发生变化时，getter 函数的结果也会改变，从而触发回调函数。回调函数接收计算后的 `sum` 作为参数。
- **触发时机**：每当 `x` 或 `y` 发生变化时，getter 函数会被重新执行，如果其结果发生变化，则会触发回调函数并打印新的 `sum`。

**3. 监听多个来源组成的数组**

```js
const x = ref(0);
const y = ref(0);
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

- **监听对象**：这里传递的是一个数组 `[x, () => y.value]`，表示同时监听 `x` 和 `y` 的值。
- **回调函数**：当数组中的任何一个元素发生变化时，回调函数会被触发。回调函数接收一个数组作为参数，其中每个元素对应于监听数组中相应位置的新值（即 `[newX, newY]`）。
- **触发时机**：每当 `x` 或 `y` 发生变化时，回调函数都会被调用，并打印最新的 `x` 和 `y` 值。

**深层侦听**

直接给 `watch()` 传入一个*响应式对象*，会隐式地创建一个深层侦听器——该回调函数在所有**嵌套**的变更时都会被触发：

```js
const obj = reactive({ count: 0 })
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的, 因为它们是同一个对象！
})
obj.count++
```

相比之下，一个返回响应式对象的 *getter 函数*，只有在返回不同的对象时，才会触发回调：

```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
state.someObject.count++;	// 这不会触发回调函数，因为对象引用没有改变
state.someObject = { count: 1 };	// 这会触发回调函数，因为对象引用改变了
```

可以给上面这个例子显式地加上 `deep` 选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的, 除非 state.someObject 被整个替换
  },
  { deep: true }
)
state.someObject.count++;	// 这会触发回调函数，虽然 newValue此处和oldValue是相等的（嵌套的都这样）
```

**即时回调侦听**

```js
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }	// 例子：想请求一些初始数据，然后在相关状态更改时重新请求数据
)
```

**一次性侦听**

```js
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

##### watchEffect()

侦听器的回调 使用与源完全相同的响应式状态 是很常见的, `watchEffect` 可以自动追踪 回调的响应式依赖 而不需要显式地指定监听源。

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
// 用 watchEffect 函数 来简化
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
// watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
// todoId 被追踪：因为在 await 之前访问了 todoId。
// data 不被追踪：因为 data 是在 await 之后才被赋值的，所以 watchEffect 不会追踪 data 的变化。
```

**`watch` vs. `watchEffect`**

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

##### 副作用清理

有时我们可能会在侦听器中执行副作用，例如异步请求：

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // 回调逻辑
  })
})
```

但是如果在请求完成之前 `id` 发生了变化怎么办？当上一个请求完成时，它仍会使用已经过时的 ID 值触发回调。理想情况下，我们希望能够在 `id` 变为新值时取消过时的请求。

Vue 3.5+可以使用 [`onWatcherCleanup()`](https://cn.vuejs.org/api/reactivity-core.html#onwatchercleanup) API 来注册一个清理函数，当侦听器失效并准备重新运行时会被调用：

```js
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```

 3.5 之前`onCleanup` 函数还作为第三个参数传递给侦听器回调，以及 `watchEffect` 作用函数的第一个参数：

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

##### 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。默认情况下，侦听器回调会在父组件更新 (如有) **之后**、所属组件的 DOM 更新**之前**被调用。这意味着如果你尝试在侦听器回调中访问所属组件的 DOM，那么 DOM 将处于更新前的状态。

**Post Watchers**

如果想在侦听器回调中能访问被 Vue 更新**之后**的所属组件的 DOM，你需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post'
})
watchEffect(callback, {
  flush: 'post'
})
watchPostEffect(callback)
```

**同步侦听器**

创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：

```js
watch(source, callback, {
  flush: 'sync'
})
watchEffect(callback, {
  flush: 'sync'
})
watchSyncEffect(callback)
```

##### 停止监听器

侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

```js
// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)


// 要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：
const unwatch = watchEffect(() => {})
unwatch()	// ...当该侦听器不再需要时
```

需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑。



### 生命周期钩子

![组件生命周期图示](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)



### 模板引用

要在组合式 API 中获取引用，我们可以使用辅助函数 [`useTemplateRef()`](https://cn.vuejs.org/api/composition-api-helpers.html#usetemplateref) ：

```html
<script setup>
import { useTemplateRef, onMounted } from 'vue'
// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

在 3.5 之前的版本尚未引入 `useTemplateRef()`，我们需要声明一个与模板里 ref attribute 匹配的引用:

```html
<script setup>
import { ref, onMounted } from 'vue'
// 声明一个 ref 来存放该元素的引用, 必须和模板里的 ref 同名
const input = ref(null)
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

### 命名规范

| 命名约定       | 特点                               | 使用场景                                                     |
| -------------- | ---------------------------------- | ------------------------------------------------------------ |
| **kebab-case** | 连字符分隔的小写                   | HTML 标签和属性、Vue 组件模板（直接嵌入 HTML 文件中）、CSS 类名和 ID |
| **PascalCase** | 每个单词首字母大写                 | 类名、构造函数、Vue 单文件组件 (SFC) 和 JavaScript 模板、React 组件 |
| **camelCase**  | 第一个单词小写，后续单词首字母大写 | 变量名、函数名、作用域插槽传递的数据对象属性、事件名称       |



## 指令Directives

### 插值Interpolation

#### v-text

用于设置元素的 textContent 属性，当使用此指令时，它将覆盖元素内的 HTML 内容。 预期的输入是一个字符串，因此文本需要单引号。

```html
<p v-text="'I am some text'"></p>
<span v-text="msg"></span>		<!-- same as： <span> {{msg}} </span> -->
```

#### v-html

用于设置innerHTML。v-text会将数据解释为纯文本，而不是 HTML，若想插入 HTML，需要使用 `v-html` 指令：

```html
rawHtml = '<span style="color: red">This should be red.</span>'
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

![image-20241221150051535](D:\Learning\Frontend\Note\image-20241221150051535.png)

#### v-bind

动态的绑定一个或多个HTML属性attribute，也可以是组件的 prop。缩写为 `: `或者 `.` (当使用 .prop 修饰符)。 当 attribute 和绑定的值同名时值可以省略。

你提供的代码片段很好地展示了 Vue 中 `v-bind` 指令的多种用法。`v-bind` 是一个非常强大和灵活的指令，用于将数据绑定到 HTML 属性、动态属性名、类和样式等。下面我将详细解释每个示例，并补充一些注意事项。

```html
<!-- 绑定 attribute -->
<img v-bind:src="imageSrc" />
```

**说明**：使用 `v-bind:src` 动态绑定 `img` 标签的 `src` 属性，使其根据 `imageSrc` 的值变化而更新。



```html
<!-- 动态 attribute 名 -->
<button v-bind:[`attributeType]="attributeValue`"></button>
```

**说明**：`attributeType, attributeValue` 都是是变量名。例如，如果 `attributeType` 的值是 `'disabled'`，那么这相当于 `v-bind:disabled="attributeValue"`。



```html
<!-- 缩写 -->
<img :src="imageSrc" />

<!-- 缩写形式的动态 attribute 名 (Vue 3.4+) -->
<img :src />
```

**说明**：

- `:src` 是 `v-bind:src` 的缩写。

- Vue 3.4+ 支持更简洁的语法 `:src`，它会自动扩展为 `:src="src"`，但这种用法相对少见且需要确保上下文中有合适的变量名。

  

```html
<!-- 动态 attribute 名的缩写 -->
<button :[key]="value"></button>
```

**说明**：这是 `v-bind:[key]="value"` 的缩写形式，功能相同。



```html
<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName" />
```

**说明**：通过 JavaScript 表达式拼接字符串，动态生成完整的 URL。



Vue 专门为 `class` 和 `style` 的 `v-bind` 用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。

```html
<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>
```

**说明**：
- **对象语法**：`{ red: isRed }`，当 `isRed` 为 `true` 时，添加 `red` 类。

  ```js
  const isActive = ref(true)
  const error = ref(null)
  const classObject = computed(() => ({
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal'
  }))
  ```

- **数组语法**：`[classA, classB]`，直接应用多个类。

- **混合语法**：结合对象和数组语法，更加灵活地管理类。

  `:class` 指令也可以和一般的 `class` attribute 共存。

    ```html
    <div
      class="static"
      :class="{ active: isActive, 'text-danger': hasError }"
    ></div>
    <!-- isActive = true; hasError = false: -->
    <div class="static active"></div>
    ```



```html
<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>

const styleObjectA = reactive({
  color: 'red',
  fontSize: '30px'
})
<div :style="[styleObjectA, styleObjectB]"></div>
```

- **对象语法**：`{ fontSize: size + 'px' }`，动态设置内联样式。

- **数组语法**：`[styleObjectA, styleObjectB]`，合并多个样式对象。

  

```html
<!-- 绑定对象形式的 attribute -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
```

**说明**：使用对象字面量的形式一次性绑定多个属性。



```html
<!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
<MyComponent :prop="someThing" />
```

**说明**：将父组件的数据传递给子组件作为 prop，子组件必须在 `props` 中声明这些属性。



```html
<!-- 传递子父组件共有的 prop -->
<MyComponent v-bind="$props" />
```

**说明**：将当前组件的所有 props 传递给子组件，适用于高阶组件或包装器组件。



```html
<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

**说明**：绑定 SVG 或 XML 特定的命名空间属性（如 `xlink:href`），注意命名空间前缀的正确使用。



#### v-model

在表单输入元素或组件上创建双向绑定, 绑定值根据表单输入元素或组件输出的值而变化。仅限`<input> <select> <textarea> components`

- 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` property 并侦听 `input` 事件；
- `<input type="checkbox">` 和 `<input type="radio">` 会绑定 `checked` property 并侦听 `change` 事件；
- `<select>` 会绑定 `value` property 并侦听 `change` 事件。

修饰符`.lazy` 监听 change 事件而不是 默认的input，即只有在失去焦点或按回车键时才触发更新； `.number` 将输入的合法字符串转为数字；`.trim ` 移除输入内容两端空格。

```html
<script setup>
  import { ref } from 'vue';
  const message = ref('Hello, Vue!');
  const checkedNames = ref([])
</script>
<template>
  <!-- 文本输入框 -->
  <input v-model="message" type="text" />	<!-- <input :value="message" @input="event => message = event.target.value"> -->
  <!-- 文本区域 -->
  <textarea v-model="message"></textarea>
  <p>{{ message }}</p>
    
  <!-- 复选框 -->
  <div>Checked names: {{ checkedNames }}</div>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
</template>
```

```html
<!-- 将值绑定到当前组件实例上的动态数据 -->
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />

<!-- v-model 同样也支持非字符串类型的值绑定 -->
<select v-model="selected">
  <option :value="{ number: 123 }">123</option>	  <!-- selected 会被设为该对象字面量值 { number: 123 } -->
</select>
```

```html
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```



#### v-once

仅渲染元素和组件一次，并跳过之后的更新。

```html
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 带有子元素的元素 -->
<div v-once>
  <h1>Comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<MyComponent v-once :comment="msg" />
<!-- `v-for` 指令 -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

从 3.2 起，也可以搭配 [`v-memo`](https://cn.vuejs.org/api/built-in-directives#v-memo) 的无效条件来缓存部分模板。`v-memo` 传入空依赖数组 (`v-memo="[不变的值或空]"`) 将与 `v-once` 效果相同。

`v-memo`缓存一个模板的子树。在元素和组件上都可以使用。允许你根据特定的依赖项来决定是否需要重新渲染元素或组件。如果这些依赖项没有变化，则跳过渲染过程，从而提高性能，最常见的情况是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)。

```html
<div v-memo="[valueA, valueB]">
  ...
</div>
<!-- 当组件重新渲染，如果 valueA 和 valueB 都保持不变，这个 <div> 及其子项的所有更新都将被跳过 -->
```

#### v-pre

跳过该元素及其所有子元素的编译, 所有 Vue 模板语法都会被保留并按原样渲染, 最常见的用例就是显示原始双大括号标签及内容。

```html
<span v-pre>{{ this will not be compiled }}</span>
```



### 条件Conditionals

#### v-if & v-else-if & v-else

```html
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else-if="type === 'C'"> C </div>
<div v-else> Not A/B/C </div>
```

因为 `v-if` 是一个指令必须依附于某个元素。如果想要切换不止一个元素可以在一个 `<template>` 元素上使用 `v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

```html
<template v-if="type === 'A'">
  <h1>Title A</h1>
  <p>Paragraph A1</p>
  <p>Paragraph A2</p>
</template>
```

#### v-show

另一个可以用来按条件显示一个元素的指令是 `v-show`。其用法基本一样：

```html
<h1 v-show="ok">Hello!</h1>
```

不同之处在于 `v-show` 会在 DOM 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性。`v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。



### 迭代Iterative

#### v-for

基于原始数据`Array | Object | number | string | Iterable`多次渲染元素或模板块

```html
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
<li v-for="item in items">{{ item.message }}</li>
<li v-for="{ message } in items">{{ message }}</li>
<li v-for="(item, index) in items">{{ item.message }}</li>

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
<li v-for="(value, key) in object">{{ key }}: {{ value }}</li>
<li v-for="(value, key, index) in object">{{ index }}. {{ key }}: {{ value }}</li>
```

`v-for` 可以直接接受一个整数值。在这种用例中，会将该模板基于 `1...n` 的取值范围重复多次。注意此处 `n` 的初值是从 `1` 开始而非 `0`。

```html
<span v-for="n in 10">{{ n }}</span>
```

`v-if` 比 `v-for` 的优先级更高

```html
<!-- 这会抛出一个错误，因为属性 todo 此时没有在该实例上定义-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
<!-- 在外先包装一层 <template> 再在其上使用 v-for 可以解决这个问题  -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
<!-- <template>作为逻辑容器,允许你在模板中组织和分组多个元素，而不会向最终渲染的 DOM 中添加额外的包装元素 -->
```

`key` 属性为每个列表项提供唯一的标识符，帮助 Vue 高效且正确地追踪和更新 DOM 元素，确保组件状态的稳定性和性能优化。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。

```js
const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})

<li v-for="n in evenNumbers">{{ n }}</li>

// 在计算属性不可行的情况下 (例如在多层嵌套的 v-for 循环中)，你可以调用函数
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])
function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}

<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```



### 事件Event

#### v-on

可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。当用于普通元素，只监听[**原生 DOM 事件**](https://developer.mozilla.org/en-US/docs/Web/Events)。当用于自定义元素组件，则监听子组件触发的**自定义事件**。用法：`v-on:click="handler"` 或 `@click="handler"`。

事件处理器 (handler) 的值可以是：

1. **内联事件处理器**：事件被触发时执行的内联 JavaScript 语句 (与 `onclick` 类似)。

   ```html
   <button @click="count++">Add 1</button>
   ```

2. **方法事件处理器**：一个指向组件上定义的方法的属性名或是路径。

   ```html
   <!-- `greet` 是上面定义过的方法名 -->
   <button @click="greet">Greet</button>
   ```

   举例来说，`foo`、`foo.bar` 和 `foo['bar']` 会被视为方法事件处理器，而 `foo()` 和 `count++` 会被视为内联事件处理器。

   除了直接绑定方法名，你还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件。

   在内联事件处理器中访问原生 DOM 事件，可以向该处理器方法传入一个特殊的 `$event` 变量，或者使用内联箭头函数：

   ```html
   <!-- 使用特殊的 $event 变量 -->
   <button @click="warn('Form cannot be submitted yet.', $event)">
     Submit
   </button>
   
   <!-- 使用内联箭头函数 -->
   <button @click="(event) => warn('Form cannot be submitted yet.', event)">
     Submit
   </button>
   ```

在处理事件时调用 `event.preventDefault()` 或 `event.stopPropagation()` 是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。

#####  修饰符

```html
<!-- 事件修饰符-->
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>
<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>
<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>
<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>
<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>
<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>
<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>

<!-- 按键修饰符 -->
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```



### 模板Templates

#### v-slot

v-slot 指令，用于定义组件中的插槽，允许您在组件内动态传递和渲染内容。对于命名插槽，您可以使用具有特定插槽名称的 v-slot。这允许您将不同的内容传递给组件的不同部分：

#### v-cloak

v-cloak 指令用于防止未编译的 Vue 模板在 Vue 实例仍在加载时可见。它会暂时隐藏内容，直到 Vue 完成模板的编译。v-cloak 指令一直保留，直到组件实例被挂载。`v-cloak` 会保留在所绑定的元素上，直到相关组件实例被挂载后才移除。配合像 `[v-cloak] { display: none }` 这样的 CSS 规则，它可以在组件编译完毕前隐藏原始模板。





## 组件Components

组件允许我们将 UI 划分为独立的、可重用的部分，并且可以对每个部分进行单独的思考。在实际应用中，组件常常被组织成一个层层嵌套的树状结构。这和我们嵌套 HTML 元素的方式类似，Vue 实现了自己的组件模型，使我们可以在每个组件内封装自定义内容与逻辑。

### 组件注册

一个 Vue 组件在使用前需要先被“注册”，这样 Vue 才能在渲染模板时找到其对应的实现。组件注册有两种方式：全局注册和局部注册。

#### 全局注册

全局注册的组件可以在此应用的任意组件的模板中使用,所有的子组件也可以使用全局注册的组件，这意味着这组件也都可以在*彼此内部*使用。

可以使用 [Vue 应用实例](https://cn.vuejs.org/guide/essentials/application.html)的 `.component()` 方法，让组件在当前 Vue 应用中全局可用。

```js
import { createApp } from 'vue'
const app = createApp({})
app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
```

如果使用单文件组件，可以注册被导入的 `.vue` 文件：

```js
import MyComponent from './App.vue'
app.component('MyComponent', MyComponent)	
  .component('ComponentA', ComponentA)	// .component()方法可以被链式调用
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```



#### 局部注册

相比之下，局部注册的组件需要在使用它的父组件中显式导入，并且只能在该父组件中使用。它的优点是使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好。

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
  import ComponentA from './ComponentA.vue'
</script>
<template>
  <ComponentA />
</template>
```

如果没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册：

```js
import ComponentA from './ComponentA.js'
export default {
  components: {
    ComponentA	// 对于每个components对象里的属性, key是注册的组件名，值是相应组件的实现; 等价于：ComponentA: ComponentA
  },
  setup() {
    // ...
  }
}
```

局部注册的组件在后代组件中不可用。在这个例子中，`ComponentA` 注册后仅在当前组件可用，而在任何的子组件或更深层的子组件中都不可用。



### 单文件组件

Vue 的单文件组件 (即 `*.vue` 文件，英文 Single-File Component，简称 **SFC**) 是一种特殊的文件格式，单文件组件是网页开发中 HTML、CSS 和 JavaScript 三种语言经典组合的自然延伸，`<template>`、`<script>` 和 `<style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式。



### Props

`props` 的设计原则是单向数据流，即数据只能从父组件流向子组件。

`props` 是一种特别的 attributes，你可以在组件上声明注册。要传递给博客文章组件一个标题，我们必须在组件的 props 列表上声明它。这里要用到 [`defineProps`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏：

```vue
<!-- 子组件 -->
<script setup>
  defineProps(['title'])
</script>
<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props值。如果没有使用 `<script setup>`，props 必须以 `props` 选项的方式声明，props 对象会作为 `setup()` 函数的第一个参数被传入：

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

除了使用字符串数组来声明 props 外，还可以使用对象的形式, 如果传入的值不满足类型要求，Vue 会在浏览器控制台中抛出警告来提醒使用者。

```js
const { message, count } = defineProps({	// 定义并解构 props
  message: {  // 该类型是必传但可为 null 
    type: [String, null],
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});
```

一个组件可以有任意多的 props，默认情况下，所有 prop 都接受任意类型的值。当一个 prop 被注册后，可以像这样以自定义 attribute 的形式传递数据给它：

```vue
<!-- ParentComponent -->
<script setup>
    import { ref } from 'vue'
    import BlogPost from './BlogPost.vue'
    const posts = ref([
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ])
</script>
<template>
	<BlogPost v-for="post in posts"
	  :key="post.id"
  	  :title="post.title"
	/>
</template>
```

监听一个解构后的 `prop` 并作出响应，可以使用 `watch` 函数。但是直接解构会失去响应性，因此你需要确保传递的是一个返回响应式值的 getter 函数。

```js
watch(() => props.foo, (newVal, oldVal) => {
  console.log('foo changed:', newVal, oldVal);
});
```

如果你想要将一个对象的所有属性都当作 props 传入，你可以使用[没有参数的 `v-bind`](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes)，即只使用 `v-bind` 而非 `:prop-name`。例如，这里有一个 `post` 对象：

```vue
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
<BlogPost v-bind="post" />
// 等价于：
<BlogPost :id="post.id" :title="post.title" />
```

每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你**不应该**在子组件中去更改一个 prop。

1. **prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性**。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

   js

   ```
   const props = defineProps(['initialCounter'])
   
   // 计数器只是将 props.initialCounter 作为初始值
   // 像下面这样做就使 prop 和后续更新无关了
   const counter = ref(props.initialCounter)
   ```

2. **需要对传入的 prop 值做进一步的转换**。在这种情况中，最好是基于该 prop 值定义一个计算属性：

   js

   ```
   const props = defineProps(['size'])
   
   // 该 prop 变更时计算属性也会自动更新
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

声明为 `Boolean` 类型的 props 有特别的类型转换规则。以带有如下声明的 `<MyComponent>` 组件为例：

```js
defineProps({
  disabled: [Number, Boolean]	//  disabled: [String, Boolean]时disabled 将被解析为空字符串 (disabled="")
})
```

该组件可以被这样使用：

```html
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```



### Events

要在此处实现无障碍访问的需求，将博客文章的文字能够放大，而页面的其余部分仍使用默认字号。

子组件可以通过调用内置的 [**`$emit`** 方法](https://cn.vuejs.org/api/component-instance.html#emit)，通过传入事件名称来抛出一个事件, 我们可以通过 [`defineEmits`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明需要抛出的事件：

```vue
<script setup>
  defineProps(['title'])
  defineEmits(['enlargeText'])
</script> 
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlargeText', 0.1)">Enlarge text</button>	// 所有传入 $emit() 的额外参数都会被直接传向监听器
  </div>
</template>
```
在父组件中，我们可以添加一个 `postFontSize` 来实现这个效果, 加上有了 `@enlarge-text="postFontSize += 0.1"` 的监听，父组件会接收这一事件，从而更新 `postFontSize` 的值。：

```vue
<script setup>
  /* ... */
  const postFontSize = ref(1)
</script>
<template>
	<div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      @enlarge-text="(n) => postFontSize += n"		// Vue 会自动将 kebab-case 转换为 camelCase
    ></BlogPost>
  </div>
</template>
```

如果你没有在使用 `<script setup>`，你可以通过 `emits` 选项定义组件会抛出的事件。你可以从 `setup()` 函数的第二个参数，即 setup 上下文对象上访问到 `emit` 函数：

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
  // or 解构
  setup(props, { emit }) {
    emit('enlarge-text')
  }
}
```

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
    const emit = defineEmits({
      // 没有校验
      click: null,
      // 校验 submit 事件
      submit: ({ email, password }) => {
        if (email && password) {
          return true
        } else {
          console.warn('Invalid submit event payload!')
          return false
        }
      }
    })
    // 定义响应式数据
    const email = ref('');
    const password = ref('');
    function submitForm(email, password) {
      emit('submit', { email, password })
    }
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
```



### 组件v-model

`v-model` 可以在组件上使用以实现双向绑定。从 Vue 3.4 开始，推荐的实现方式是使用 [`defineModel()`](https://cn.vuejs.org/api/sfc-script-setup.html#definemodel) 宏：

```vue
<!-- Child.vue -->
<script setup>
  const model = defineModel()
</script>
<template>
  <input v-model="model">
</template>

<!-- Parent.vue -->
<script setup>
  import Child from './Child.vue'
  import { ref } from 'vue'
  const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <Child v-model="msg" />
</template>
```

`defineModel` 是一个便利宏。编译器将其展开为以下内容：

- 一个名为 `modelValue` 的 prop，本地 ref 的值与其同步；
- 一个名为 `update:modelValue` 的事件，当本地 ref 的值发生变更时触发。

```vue
<!-- Child.vue -->
<script setup>
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['updateValue'])
</script>
<template>
  <input :value="modelValue" @input ="$emit('updateValue', $event.target.value)">
</template>

<!-- Parent.vue -->
<script setup>
  import Child from './Child.vue'
  import { ref } from 'vue'
  const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <Child :modelValue="msg" @updateValue='value => (msg = value)' />
</template>
```

**多个 `v-model` 绑定**

```vue
<!-- Child.vue -->
<script setup>
  const firstName = defineModel('firstNam')
  const lastName = defineModel('lastNam')
</script>
<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>

<!-- Parent.vue -->
<script setup>
  import { ref } from 'vue'
  import UserName from './UserName.vue'
  const first = ref('John')
  const last = ref('Doe')
</script>
<template>
  <h1>{{ first }} {{ last }}</h1>
  <UserName
    v-model:first-nam="first"
    v-model:last-nam="last"
  />
</template>
```

创建一个自定义的修饰符

```vue
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
```



### 属性继承/透传属性

指的是传递给一个组件，却没有被该组件声明为 [props](https://cn.vuejs.org/guide/components/props.html) 或 [emits](https://cn.vuejs.org/guide/components/events.html#defining-custom-events) 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。

当一个组件以**单个元素为根**作渲染时，透传的 attribute 会自动被添加到根元素上。

```vue
<!-- <MyButton> 的模板 -->
<button>Click Me</button>
<!-- 一个父组件使用了这个组件，并且传入了 class： -->
<MyButton class="large" />
<!-- 最后渲染出的 DOM 结果是： -->
<button class="large">Click Me</button>
```

如果一个子组件的根元素已经有了 `class` 或 `style` attribute，它会和从父组件上继承的值合并。

同样的规则也适用于 `v-on` 事件监听器。

有些情况下一个组件会在根节点上渲染另一个组件。例如，我们重构一下 `<MyButton>`，让它在根节点上渲染 `<BaseButton>`：

```vue
<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />
```

此时 `<MyButton>` 接收的透传 attribute 会直接继续传给 `<BaseButton>`。

如果你**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`：

```vue
<script setup>
    defineOptions({
      inheritAttrs: false
    })
    // ...setup 逻辑
</script>
```

通过设置 `inheritAttrs` 选项为 `false`，你可以完全控制透传进来的 attribute 被如何使用。这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

```vue
<!-- 想要所有像 class 和 v-on 监听器这样的透传 attribute 都应用在内部的 <button> 上而不是外层的 <div> 上 -->
<!-- <MyButton> 的模板 -->
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">Click Me</button>
</div>
```

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。



和单根节点组件有所不同，有着**多个根节点**的**子组件**没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。



如果需要，你可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
  import { useAttrs } from 'vue'
  const attrs = useAttrs()
</script>
```

如果没有使用 `<script setup>`，`attrs` 会作为 `setup()` 上下文对象的一个属性暴露：

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```



### 组件插槽

子组件能够接收任意类型的 JavaScript 值作为 props，但在某些场景中，要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。

```vue
<!-- Parent Template -->
<FancyButton>
  Click    <!-- 插槽内容 -->
</FancyButton>

<!-- <FancyButton> Template -->
<button class="fancy-btn">
  <slot>
    Submit 		<!-- 默认内容 -->
  </slot>		<!-- 插槽出口 -->
</button>

<!-- 最终渲染出的DOM：-->
<button class="fancy-btn">Click</button>
```

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染。插槽内容可以是任意合法的模板内容，不局限于文本。例如我们可以传入多个元素，甚至是组件。

<img src="https://cn.vuejs.org/assets/slots.CKcE8XYd.png" alt="插槽图示" style="zoom:50%;" />

#### 具名插槽

对于**一个组件里含多个slot出口**这种场景，`<slot>` 元素可以有一个特殊的 attribute `name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容，这类带 `name` 的插槽被称为具名插槽 (named slots)。没有提供 `name` 的 `<slot>` 出口会隐式地命名为“default”。要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令（简写 `#`）的 `<template>` 元素，并将目标插槽的名字传给该指令：

```vue
<!-- BaseLayout -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- Main -->
<BaseLayout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

<img src="https://cn.vuejs.org/assets/named-slots.CCIb9Mo_.png" alt="具名插槽图示" style="zoom: 50%;" />

[动态指令参数](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamic-arguments)在 `v-slot` 上也是有效的，即可以定义下面这样的动态插槽名：

```vue
<!-- Main -->
<template v-slot:[dynamicSlotName]>
    ...
</template>
```



#### 条件插槽

根据插槽是否存在来渲染某些内容可以结合使用 [$slots](https://cn.vuejs.org/api/component-instance.html#slots) 属性与 [v-if](https://cn.vuejs.org/guide/essentials/conditional.html#v-if) 来实现

```vue
<!-- BaseLayout -->
<header v-if="$slots.header">
  <slot name="header" />	<!-- 当 header 存在时 -->
</header>
```



#### 作用域插槽

父组件插槽的内容无法访问到子组件的状态, 然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据，向一个插槽的出口上传递 attributes让子组件在渲染时将一部分数据提供给插槽。

![scoped slots diagram](https://cn.vuejs.org/assets/scoped-slots.B67tIPc5.svg)

#### 具名作用域插槽

具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`。

```vue
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>

<!-- main -->
<MyComponent>
  <!-- 使用显式的默认插槽 -->
  <template #default="{ message }">		<!-- 解构 -->
    <p>{{ message }}</p>
  </template>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```



它会渲染一个列表，并同时会封装一些加载远端数据的逻辑、使用数据进行列表渲染、或者是像分页或无限滚动这样更进阶的功能。然而我们希望它能够保留足够的灵活性，将对单个列表元素内容和样式的控制权留给使用它的父组件。

```vue
<!-- FancyList -->
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['api-url', 'per-page'])
    const items = ref([])
    // mock remote data fetching
    setTimeout(() => {
      items.value = [
        { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
        { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 }
      ]
    }, 1000)
</script>
<template>
  <ul>
    <li v-if="!items.length">
      Loading...
    </li>
    <li v-for="item in items">
      <slot name="item" v-bind="item"/>		<!-- v-bind="item" 里 item 是一个对象，v-bind 指令会将这个对象的所有属性解构
												等价于 :body .. :username .. :likes ..		 -->
    </li>
  </ul>
</template>

<!-- main -->
<script setup>
	import FancyList from './FancyList.vue'
</script>
<template>
  <FancyList api-url="url" :per-page="10">
    <template #item="{ body, username, likes }">
      <div class="item">
        <p>{{ body }}</p>
        <p class="meta">by {{ username }} | {{ likes }} likes</p>
      </div>
    </template>
  </FancyList>
</template>
```

一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为**无渲染组件**





### 依赖注入

通常情况下，当我们需要从父组件向子组件传递数据时，会使用 [props](https://cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一棵巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分数据。在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦，如果组件链路非常长，可能会影响到更多这条路上的组件。这一问题被称为“prop 逐级透传”。

<img src="https://cn.vuejs.org/assets/provide-inject.C0gAIfVn.png" alt="Provide/inject 模式" style="zoom: 50%;" />

一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

#### Provide(提供)

```vue
<script setup>
  import { provide } from 'vue'
  provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>

<script>
  import { provide } from 'vue'
  export default {
    setup() {
      provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
    }
  }
</script>
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。第二个参数是提供的值，值可以是任意类型，包括响应式的状态。

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

```js
import { createApp } from 'vue'
const app = createApp({})
app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

在应用级别提供的数据在该应用内的所有组件中都可以注入。这在编写[插件](https://cn.vuejs.org/guide/reusability/plugins.html)时会特别有用，因为插件一般都不会使用组件形式来提供值。

#### Inject(注入)

```vue
<script setup>
  import { inject } from 'vue'
  const message = inject('message', '默认值')
</script>

<script>
    import { inject } from 'vue'
    export default {
      setup() {
        <!-- 默认值可能需要通过调用一个函数或初始化一个类取得。为避免在用不到默认值的情况下进行不必要的计算或产生副作用，可以使用工厂函数来创建默认值 -->
        const message = inject('message', () => new ExpensiveClass(), true)	
        return { message }
      }
    }
</script>
```

当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：

```vue
<!-- 在供给方组件内 -->
<script setup>
    import { provide, ref } from 'vue'
    const location = ref('North Pole')
    function updateLocation() {
      location.value = 'South Pole'
    }
    provide('location', {
      location,
      updateLocation
    })
</script>

<!-- 在注入方组件 -->
<script setup>
  import { inject } from 'vue'
  const { location, updateLocation } = inject('location')
</script>
<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

如果你想确保提供的数据不能被注入方的组件更改，你可以使用 [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 来包装提供的值。

```vue
<script setup>
  import { ref, provide, readonly } from 'vue'
  const count = ref(0)
  provide('read-only-count', readonly(count))
</script>
```

如果构建大型的应用，包含非常多的依赖提供，或者编写提供给其他开发者使用的组件库，最好使用 Symbol 来作为注入名以避免潜在的冲突

```js
// 在一个单独的文件中导出这些注入名 Symbol：keys.js
export const myInjectionKey = Symbol()

// 在供给方组件中Parent.vue
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'
provide(myInjectionKey, { 
  /* 要提供的数据 */
})

// 注入方组件Child.vue
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'
const injected = inject(myInjectionKey)
```



### 动态组件

```vue
<script setup>
    const currentTab = ref('Home')
    const tabs = {
      Home,		// Home: Home.vue
      Posts,
      Archive
    }
</script>
<template>
  <div class="demo">
    <button
       v-for="(_, tab) in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab">
      {{ tab }}
    </button>
	  <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>
```

[`<component>`](https://cn.vuejs.org/api/built-in-special-elements.html#component)用于渲染动态组件或元素的“元组件”。要渲染的实际组件由 `is` 决定。当 `is` 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。或者，`is` 也可以直接绑定到组件的定义。[`is`](https://cn.vuejs.org/api/built-in-special-attributes.html#is)用于绑定[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)。当使用在原生 HTML 元素上时，`is` 的值必须加上前缀 `vue:` 才可以被解析为一个 Vue 组件。



### 异步组件

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 [`defineAsyncComponent`](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能：

```js
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

[ES 模块动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)也会返回一个 Promise，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```js
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。它会将接收到的 props 和插槽传给内部组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载。

```vue
<template>
  <AsyncComp />
</template>
```

与普通组件一样，异步组件可以使用 `app.component()` [全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration)：

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

在 Vue 3.5+ 中**惰性激活** (服务器端渲染使用时)，异步组件可以通过提供激活策略来控制何时进行激活。

```js
import { defineAsyncComponent, hydrateOnIdle, ..., type HydrationStrategy } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* 传递可选的最大超时 */)	// 在空闲时进行激活
  /*
  hydrate: hydrateOnVisible({ rootMargin: '100px' })	在可见时激活
  hydrate: hydrateOnMediaQuery('(max-width:500px)')		在媒体查询匹配时进行激活
  hydrate: hydrateOnInteraction(['wheel', 'mouseover'])	 交互时激活
  hydrate: myStrategy		自定义策略
  */
})

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement 是一个遍历组件未激活的 DOM 中所有根元素的辅助函数，因为根元素可能是一个模板片段而非单个元素
  forEachElement(el => {
    // ...
  })
  hydrate()	// 准备好时调用 `hydrate`
  return () => {
    // 如必要，返回一个销毁函数
  }
}
```



### 内置组件

#### Transition

`<Transition>` 会在一个元素或组件进入和离开 DOM 时应用动画,通过默认插槽传递给它的元素或组件上,进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

##### 基于CSS

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
	<button @click="show = !show">Toggle</button>
  <Transition name="bounce" type="animation">	<!--为过渡效果命名（可以是动态的）-->
    <p v-if="show" style="margin-top: 20px; text-align: center;">
      Hello here is some bouncy text!
    </p>
  </Transition>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
	<button @click="show = !show">Toggle</button>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </Transition>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
```

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>
<template>
  <button @click="show = !show">Toggle</button>
  <Transition :duration="{ enter: 500, leave: 800 }" name="nested">
    <div v-if="show" class="outer">
      <div class="inner">
   			Hello
      </div>
    </div>
  </Transition>
</template>
<style>
.outer, .inner {
	background: #eee;
  padding: 30px;
  min-height: 100px;
}
.inner { 
  background: #ccc;
}
.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0.25s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
.nested-enter-active .inner {
	transition-delay: 0.25s;
}
.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
```

##### JS钩子

```vue
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'
const show = ref(true)
function onBeforeEnter(el) {
  gsap.set(el, {
    scaleX: 0.25,
    scaleY: 0.25,
    opacity: 1
  })
}
function onEnter(el, done) {
  gsap.to(el, {
    duration: 1,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    ease: 'elastic.inOut(2.5, 1)',
    onComplete: done
  })
}
function onLeave(el, done) {
	gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 300,
    ease: 'elastic.inOut(2.5, 1)'
  })
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done
  })
}
</script>
<template>
  <button @click="show = !show">Toggle</button>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <div class="gsap-box" v-if="show"></div>
  </Transition>
</template>
<style>
.gsap-box {
  background: #42b883;
  margin-top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
```

##### 

要创建一个可被复用的过渡，我们需要为 `<Transition>` 组件创建一个包装组件，并向内传入插槽内容：

```vue
<!-- MyTransition.vue -->
<script>
// JavaScript 钩子逻辑...
</script>
<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- 向内传递插槽内容 -->
  </Transition>
</template>
<style>
/*
  必要的 CSS...注意：避免在这里使用 <style scoped>因为那不会应用到插槽内容上
*/
</style>

<!--使用-->
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```

如果你想在某个节点初次渲染时应用一个过渡效果，你可以添加 `appear` prop：

```vue
<Transition appear>
  ...
</Transition>
```

除了通过 `v-if` / `v-show` 切换一个元素，我们也可以通过 `v-if` / `v-else` / `v-else-if` 在几个组件间进行切换

```vue
<Transition name="slide-up">
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

上面的例子进入和离开的元素都是在同时开始动画的，可能想要先执行离开动画，然后在其完成**之后**再执行元素的进入动画。手动编排这样的动画是非常复杂的，可以通过向 `<Transition>` 传入一个 `mode` prop 来实现这个行为：

```vue
<Transition mode="out-in">
  ...
</Transition>
```

有时为了触发过渡，你需要强制重新渲染 DOM 元素，否则其始终是一个元素，只是其中的值更新，如果不使用 `key` attribute，则只有文本节点会被更新，因此不会发生过渡。但是，有了 `key` 属性，Vue 就知道在 `count` 改变时创建一个新的 `span` 元素。

```vue
<Transition>
    <span :key="count">{{ count }}</span>
</Transition>
```



#### TransitionGroup

`<TransitionGroup>` 会在一个 `v-for` 列表中的元素或组件被插入，移动，或移除时应用动画。

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个容器元素。但你可以通过传入 `tag` prop 来指定一个元素作为容器元素来渲染。
- 过渡模式`mode`在这里不可用，因为我们不再是在互斥的元素之间进行切换。
- 列表中的每个元素都**必须**有一个独一无二的 `key` attribute。
- CSS 过渡 class 会被应用在列表内的元素上，**而不是**容器元素上。

这里是 `<TransitionGroup>` 对一个 `v-for` 列表添加进入 / 离开动画的示例：

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```



#### KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，之前已更改的状态都被重置了，会创建一个只带有初始状态的新实例。要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来：

```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive :max="10">	<!--最大组件实例数-->
  <component :is="activeComponentn" />
</KeepAlive>
```

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制用于指定哪些组件应该被缓存/排除。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">	<!-- 只有名称为 a 或 b 的组件会被缓存 -->
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```



#### Teleport

`<Teleport>` 是一个内置组件，有时组件模板的一部分在逻辑上属于它，但从视觉角度来看，它应该显示在 DOM 中的其他位置，在 Vue 应用程序之外。它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

```vue
<!-- <MyModal> -->
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

当在初始 HTML 结构中使用这个组件时，会有一些潜在的问题：

- `position: fixed` 能够相对于浏览器窗口放置有一个条件，那就是不能有任何祖先元素设置了 `transform`、`perspective` 或者 `filter` 样式属性。也就是说如果我们想要用 CSS `transform` 为祖先节点 `<div class="outer">` 设置动画，就会不小心破坏模态框的布局！
- 这个模态框的 `z-index` 受限于它的容器元素。如果有其他元素与 `<div class="outer">` 重叠并有更高的 `z-index`，则它会覆盖住我们的模态框。

`<Teleport>` 提供了一个更简单的方式来解决此类问题，让我们不需要再顾虑 DOM 结构的问题。让我们用 `<Teleport>` 改写一下 `<MyModal>`：

```vue
<button @click="open = true">Open Modal</button>
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

在某些场景下可能需要视情况禁用 `<Teleport>`。举例来说，我们想要在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件。我们可以通过对 `<Teleport>` 动态地传入一个 `disabled` prop 来处理这两种不同情况。

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

在 Vue 3.5 及更高版本中，我们可以使用 `defer` prop 推迟 Teleport 的目标解析，直到应用的其他部分挂载。这允许 Teleport 将由 Vue 渲染且位于组件树之后部分的容器元素作为目标：

```vue
<Teleport defer to="#late-div">
    ...
</Teleport>
<!-- 稍后出现于模板中的某处 -->
<div id="late-div"></div>
```





#### Suspense

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

`<Suspense>` 可以等待的异步依赖有两种：

1. 带有异步 `setup()` 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件。

   ```js
   // 组合式 API 中组件的 setup()
   export default {
     async setup() {
       const res = await fetch(...)
       const posts = await res.json()
       return {
         posts
       }
     }
   }
   
   // 如果使用 <script setup>，那么顶层 await 表达式会自动让该组件成为一个异步依赖
   <script setup>
     const res = await fetch(...)
     const posts = await res.json()
   </script>
   <template>
     {{ posts }}
   </template>
   ```

2. [异步组件](https://cn.vuejs.org/guide/components/async.html)。

`<Suspense>` 组件有两个插槽：

1. **默认插槽 (`#default`)**：当异步依赖加载完成时显示的内容。
2. **后备插槽 (`#fallback`)**：在异步依赖加载过程中显示的内容。

这两个插槽都只能包含一个根节点（即每个插槽只能有一个直接子节点）。

```vue
<Suspense>
  <!-- 默认插槽 -->
  <Dashboard />		<!-- 具有深层异步依赖的组件 -->
  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

`<Suspense>` 组件会触发三个事件：`pending`、`resolve` 和 `fallback`。`pending` 事件是在进入挂起状态时触发。`resolve` 事件是在 `default` 插槽完成获取新内容时触发。`fallback` 事件则是在 `fallback` 插槽的内容显示时触发。





## 逻辑复用

### 组合式函数

“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。组合式函数约定用驼峰命名法命名，并以“use”作为开头。



#### VueUse

组合式函数集合



### 自定义指令

自定义指令主要是为了重用涉及**普通元素的底层 DOM 访问**的逻辑。

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。`vFocus` 即可以在模板中以 `v-focus` 的形式使用。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

```javascript
const app = createApp({})
// 将一个自定义指令全局注册到应用层级使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  created(el, binding, vnode) {},  // 在绑定元素的 attribute 前或事件监听器应用前调用
  beforeMount(el, binding, vnode) {},  // 在元素被插入到 DOM 前调用
  mounted(el, binding, vnode) {},  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  beforeUpdate(el, binding, vnode, prevVnode) {},  // 绑定元素的父组件更新前调用
  updated(el, binding, vnode, prevVnode) {},  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  beforeUnmount(el, binding, vnode) {},  // 绑定元素的父组件卸载前调用
  unmounted(el, binding, vnode) {}  // 绑定元素的父组件卸载后调用
}
```

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。





### 插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

```js
// myPlugin.js
export default {
    install: (app, options) => {
      // 注入一个全局可用的 $translate() 方法
      app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    }
}
```

```vue
<script>
    import { createApp } from 'vue'
    const app = createApp({})
    app.use(myPlugin, {
      greetings: {
        hello: 'Bonjour!'
      }
    }))
</script>

<template>
	<h1>{{ $translate('greetings.hello') }}</h1>	<!-- $translate('greetings.hello') 会在运行时被替换为 Bonjour! -->
</template>
```


