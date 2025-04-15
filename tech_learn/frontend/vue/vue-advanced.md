# Vue.js - Advanced

[Vue Developer Roadmap: Learn to become a Vue developer](https://roadmap.sh/vue)



## 路由

服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面。

然而，在[单页面应用](https://developer.mozilla.org/en-US/docs/Glossary/SPA)中，客户端的 JavaScript 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。在这类单页应用中，“路由”是在客户端执行的。一个客户端路由器的职责就是利用诸如 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 或是 [`hashchange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)这样的浏览器 API 来管理应用当前应该渲染的视图。



如果只需要一个简单的页面路由，而不想为此引入一整个路由库，你可以通过[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)的方式，监听浏览器 [`hashchange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)或使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 来更新当前组件。

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
    
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```



### Vue Router

[CheatSheet](D:\Learning\Frontend\Note\Vue-Router-Cheat-Sheet.pdf)



#### 创建路由器实例

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { ComponentA } from '@/views/ComponentA.vue'
...

routers= [
    	  { path: '/com-a', name: 'com-a', component: ComponentA },
          {...},
         ]
           
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```



##### 路由**组件**加载

如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。Vue Router 支持开箱即用的[动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports)：

```js
// 路由懒加载
const ComponentB = () => import('./views/ComponentB.vue')

const router = createRouter({
  routes: [
    { path: '/com-b', component: ComponentB }
    // 或在路由定义里直接使用它
    { path: '/com-c', component: () => import('./views/ComponentC.vue') },
  ],
})
```

在 **Vite** 中，`rollupOptions` 允许你自定义 **Rollup** 的打包行为。通过配置 `output.manualChunks`，你可以手动将某些模块打包到单独的文件中，从而实现代码分割（Code Splitting）和优化加载性能。

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {	 // manualChunks 被用来将 UserDetails、UserDashboard 和 UserProfileEdit 这三个模块打包到一个名为 group-user 的文件中
          'group-user': [
            './src/UserDetails',
            './src/UserDashboard',
            './src/UserProfileEdit',
          ],
        },
      },
    },
  },
});
```



##### 导航守卫

###### 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
 router.beforeEach(async (to, from) => {
   if (!isAuthenticated && to.name !== 'Login') {
     return { name: 'Login' }     // 将用户重定向到登录页面
   }
 })
```

也可以直接在路由配置上定义 `beforeEnter` 守卫。

**完整的导航解析流程**

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



##### 路由元信息

将任意信息附加到路由上，如过渡名称、谁可以访问路由等，这些事情可以通过接收属性对象的`meta`属性来实现，并且它可以在**路由地址**和**导航守卫**上都被访问到。

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new', component: PostsNew,
        meta: { requiresAuth: true },        // 只有经过身份验证的用户才能创建帖子
      },
      {
        path: ':id', component: PostsDetail
        meta: { requiresAuth: false },        // 任何人都可以阅读文章
      }
    ]
  }
]

router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录 to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return {
      path: '/login', query: { redirect: to.fullPath },     // 保存我们所在的位置，以便以后再来
    }
  }
})
```



##### 重定向和别名

###### 重定向

URL 会被替换

```js
const routes = [{ path: '/home', redirect: '/' }]

const routes = [{ path: '/home', redirect: { name: 'homepage' } }]

const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数 return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

###### 别名

URL 不会被替换

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]

const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // - /users
      // - /people	绝对路径
      // - /users/list	相对路径
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]

// 如果路由有参数，确保在任何绝对别名中包含它们
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // - /users/24/profile
      // - /24
      // - /users/24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```



##### 历史记录模式

`history` 配置允许我们在不同的历史模式中进行选择

- hash 模式是用 `createWebHashHistory()` 创建，它在内部传递的实际 URL 之前使用了一个井号（`#`）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。
- Html5 模式用 `createWebHistory()` 创建，URL 会看起来很 "正常"，由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，就会得到一个 404 错误，要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由，将所有未知的请求重定向到应用的入口文件index.html。
- memory 模式是用 `createMemoryHistory()` 创建，它不会假定自己处于浏览器环境，因此不会与 URL 交互也不会自动触发初始导航，并且需要你在调用 `app.use(router)` 之后手动 push 到初始导航。它非常适合 Node 环境和 SSR。



##### 滚动行为

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // el: document.getElementById('main'),
    el: '#main',
    // 在元素上 10 像素
    top: 10,
  }
})
```



##### 动态路由

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 *路径参数* （**`route.params`** 是 **Vue Router** 中用于访问 **动态路由参数** 的对象）：

```js
// router/index.js
import User from './User.vue'

const routes = [
  { path: '/users/:id', component: User },	// 动态字段以冒号开始
]
```

现在像 `/users/johnny` 和 `/users/jolyne` 这样的 URL 都会映射到同一个路由。

*路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 *params* 的值将在每个组件（指向的View）中以 `route.params` 的形式暴露出来。因此，我们可以通过更新 `User` 的模板来呈现当前的用户 ID：

```vue
<!-- Views(Components)/User.vue -->
<template>
  <div>
    User {{ $route.params.id }}	 <!-- 当前路由参数可以通过 $route/ useRoute() 在路由所指向的组件中访问 -->
  </div>
</template>
```

你可以在同一个路由中设置有多个 *路径参数*，它们会映射到 `$route.params` 上的相应字段。例如：

| 匹配模式                       | 匹配路径                 | route.params                             |
| :----------------------------- | :----------------------- | :--------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |



###### 响应路由参数的变化

使用带有参数的路由时需要注意的是，例如当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，

`<router-view :key="$route.path"></router-view>`通过添加 `:key="$route.path"`，确保当路由路径变化时，`<router-view>` 会强制重新渲染组件。

想要**相同的组件实例将被重复使用**（因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效）。**但这也意味着组件的生命周期钩子不会被调用**。生命周期钩子下的函数不会被调用，不会进行异步数据请求。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性：

```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
watch(
  () => route.params.id,
  (newId, oldId) => {
  // 对路由变化做出响应...
})
</script>
```

或者，使用 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)，它还允许你取消导航：

```vue
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // 对路由变化做出响应...
  userData.value = await fetchUser(to.params.id)
})
</script>
```



###### 自定义正则匹配

想象两个路由 `/:orderId` 和 `/:productName`，两者会匹配完全相同的 URL，所以我们需要一种方法来区分它们。最简单的方法就是在路径中添加一个静态部分来区分它们：

```js
const routes = [
  // 匹配 /o/3549
  { path: '/o/:orderId' },
  // 匹配 /p/books
  { path: '/p/:productName' },
]
```

但在某些情况下，我们并不想添加静态的 `/o` `/p` 部分。由于，`orderId` 总是一个数字，而 `productName` 可以是任何东西，所以我们可以在括号中为参数指定一个自定义的正则：

```js
const routes = [
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```

如果你需要匹配具有多个部分的路由，如 `/first/second/third`，你应该用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复：

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
    
  // 也可以通过在右括号后添加它们与自定义正则结合使用
  { path: '/:chapters(\\d+)+' },	// 匹配 /1, /1/2, 等
]

// 在使用命名路由时也需要你传递一个数组，给定 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href		// 产生 /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href		// 产生 /a/b
```

默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 将匹配 /users/posva 而非：
    // - /users/posva/ 当 strict: true	控制路径匹配是否严格匹配尾部斜杠
    // - /Users/posva 当 sensitive: true		控制路径匹配是否区分大小写
    { path: '/users/:id', sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: '/users/:id?' },	// 使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选
  ],
  strict: true, // applies to all routes
})
```





##### 具名路由

当创建一个路由时，我们可以选择给路由一个 `name`：

```js
// router/index.js
const routes = [
  {
    path: '/user/:username',
    name: 'profile', 
    component: User
  }
]
```

然后我们可以使用 `name` 而不是 `path` 来传递 `to` 属性给 `<router-link>`：

```vue
<!-- navigation.vue -->
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">	<!-- 创建一个指向 `/user/erina` 的链接 -->
  User profile
</router-link>
```



##### 嵌套路由

```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

一个顶层的 `router-view`它渲染顶层路由匹配的组件，同样地，一个被渲染的组件也可以包含自己嵌套的 `<router-view>`。要将组件渲染到这个嵌套的 `router-view` 中，我们需要在路由中配置 `children`：

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

```js
const routes = [
  {
    path: '/user/:id',
    name: 'user-parent',
    component: User,
    children: [
      { path: '', name: 'user-home', component: UserHome },
      {
        // 当 /user/:id/profile 匹配成功 UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile', name: 'user-profile', component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功 UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts', name: 'user-posts', component: UserPosts,
      },
    ],
  },
]
```



##### RouterView 插槽

```vue
<router-view v-slot="{ Component }">
  <transition name="fade">
    <keep-alive>
      <component :is="Component" :key="route.path />
    </keep-alive>
  </transition>
</router-view>
```





#### 注册路由器插件

```js
// src/main.js
import router from './router'	// 默认导出 无需{router}； index.js默认入口文件 无需'./router/index.js'

createApp(App)
  .use(router)
  .mount('#app')
```

1. [全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration) `RouterView` 和 `RouterLink` 组件。
2. 添加全局 `$router` 和 `$route` 属性。
3. 启用 `useRouter()` 和 `useRoute()` 组合式函数。
4. 触发路由器解析初始路由。



#### 使用路由

如果我们使用选项式 API，我们可以在 JavaScript 中如下访问这两个属性：路由器`this.$router` 和 路由`this.$route`。组合式 API通过 `useRouter()` 和 `useRoute()` 来访问路由器实例和当前路由。

`useLink` 主要用于以下场景：

1. **自定义导航组件**
   - 如果你需要实现一个自定义的导航组件（例如按钮、图标等），可以使用 `useLink` 来处理路由跳转逻辑。
2. **访问 `<router-link>` 的内部逻辑**
   - `useLink` 提供了 `<router-link>` 的内部逻辑，例如 `href`、`isActive`、`navigate` 等。



##### 路由组件

```vue
<!-- App.vue -->
<router-link :to="/link">
   <h2>{{ text }}</h2>
</router-link>
<router-view />
```



##### 当前路由

RouterLink 组件向活动链接（当前路由）添加了两个 CSS 类：`router-link-active`、`router-link-exact-active`

```vue
const routes = [
  {
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'role/:roleId',
        component: Role,
      }
    ]
  }
]
// exact匹配不包括祖先路由, 这两个路径都将被视为active路径, 但只有第二个链接会被认为是exact-active.
<RouterLink to="/user/erina">
  User
</RouterLink>
<RouterLink to="/user/erina/role/admin">
  Role
</RouterLink>
```

`RouterLink` 组件提供了两种方式来配置激活链接的样式类：

1. **通过 `activeClass` 和 `exactActiveClass` 属性**：在单个 `RouterLink` 组件中自定义激活类名。

   ```vue
   <template>
     <RouterLink
       to="/about"
       activeClass="border-indigo-500"
       exactActiveClass="border-indigo-700"
     >
       About
     </RouterLink>
   </template>
   ```

2. **通过 `createRouter` 的全局配置**：为所有 `RouterLink` 组件统一设置默认的激活类名。

   ```js
   import { createRouter, createWebHistory } from 'vue-router';
   const router = createRouter({
     history: createWebHistory(),
     linkActiveClass: 'border-indigo-500', // 默认的 activeClass
     linkExactActiveClass: 'border-indigo-700', // 默认的 exactActiveClass
     routes: [
       { path: '/', component: Home },
       { path: '/about', component: About },
     ],
   });
   export default router;
   ```



##### 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

想要导航到不同的 URL，可以使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，点击 `<router-link :to="...">` 相当于调用 `router.push(...)`，该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串路径
router.push('/users/eduardo')
// 带有路径的对象
router.push({ path: '/users/eduardo' })
// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })
// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })
// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

`router.replace`在导航时不会向 history 添加新记录,它取代了当前的条目

```JS
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

横跨历史采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 `window.history.go(n)`。

```JS
// 向前移动一条记录，与 router.forward() 相同
router.go(1)
// 返回一条记录，与 router.back() 相同
router.go(-1)
// 前进 3 条记录
router.go(3)
```



##### 命名视图

有时候想同时展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图

```vue
<router-view name="LeftSidebar" />
<router-view />	<!-- name 默认为 default -->
<router-view name="RightSidebar" />
```

```JS
const router = createRouter({
...
      components: {		// +s
        // 与 <router-view> 上的 name 属性匹配
        default: Home,
        LeftSidebar,	// LeftSidebar: LeftSidebar
        RightSidebar,
      },
})
```

###### 嵌套命名视图

```vue
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```

```js
const router = createRouter({
  path: '/settings',
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
})
```




##### 路由Props

在你的组件中使用 `$route` 或 `useRoute()` 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 `props` 配置来解除这种行为(由路由主动传参给显示组件，而不是由显示组件去解析路由的参数)：

```js
// index.js  
const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/destination/:id/:slug', 
    name: 'destinationshow', 
    component: ()=>import('@/views/DestinationShow.vue'),
    [+] props: route=> ({id: parseInt(route.params.id)}),
  }
]
```

```vue
<!-- DestinationShow.vue -->
<script setup>
...
[+]const props = defineProps({
[+]  id: {type: Number, required: true}
[+]})
[-]const route = useRoute()
[-]const destinationId = computed(() => {
[-]  return parseInt(route.params.id);
[-]});
const destination = computed(() => {
  return sourceData.destinations.find(
[-]    (destination) => destination.id === destinationId.value
[+]	   (destination) => destination.id === props.id
  );
});
</script>
```

- 布尔模式：当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props。

- 对象模式：当 `props` 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。

- 函数模式：你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

  

  对于有命名视图的路由，你必须为每个命名视图定义 `props`模式配置：

  ```js
  const routes = [
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },	// 将路由参数（例如 :id）作为 props 传递给默认视图
      props: { default: true, sidebar: false }	// 不将路由参数作为 props 传递给侧边栏视图
    }
  ]
  ```



##### 扩展 RouterLink

扩展 RouterLink 来处理外部链接，并在 `AppLink.vue` 文件中添加一个自定义的 `inactive-class`：

```vue
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  ...RouterLink.props,
})

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a 
    v-if="isExternal" 
    target="_blank"
    rel="noopener"
    class="external-link"
    :href="to"><slot/></a>
  <router-link v-else v-bind="$props" class="internal-link"><slot/></router-link>
</template>
```















## 状态管理

理论上来说，每一个 Vue 组件实例都已经在“管理”它自己的响应式状态了。我们以一个简单的计数器组件为例：

```vue
<script setup>
import { ref } from 'vue'

// 状态
const count = ref(0)

// 动作
function increment() {
  count.value++
}
</script>

<!-- 视图 -->
<template>{{ count }}</template>
```

它是一个独立的单元，由以下几个部分组成：

- **状态**：驱动整个应用的数据源；
- **视图**：对**状态**的一种声明式映射；
- **交互**：状态根据用户在**视图**中的输入而作出相应变更的可能方式。

下面是“单向数据流”这一概念的简单图示：

<img src="https://cn.vuejs.org/assets/state-flow.Cd6No79V.png" alt="state flow diagram" style="zoom:50%;" />

然而，当我们有**多个组件共享一个共同的状态**时，就没有这么简单了：

1. 多个视图可能都依赖于同一份状态。
2. 来自不同视图的交互也可能需要更改同一份状态。

对于情景 1，一个可行的办法是将共享状态“提升”到共同的祖先组件上去，再通过 props 传递下来。然而在深层次的组件树结构中这么做的话，很快就会使得代码变得繁琐冗长。这会导致另一个问题：[Prop 逐级透传问题](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)。

对于情景 2，我们经常发现自己会直接通过模板引用获取父/子实例，或者通过触发的事件尝试改变和同步多个状态的副本。但这些模式的健壮性都不甚理想，很容易就会导致代码难以维护。

一个更简单直接的解决方案是抽取出组件间的共享状态，放在一个全局单例中来管理。这样我们的组件树就变成了一个大的“视图”，而任何位置上的组件都可以访问其中的状态或触发动作。

如果你有一部分状态需要在多个组件实例间共享，你可以使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 来创建一个响应式对象，并将它导入到多个组件中：

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue
<!-- componentN.vue -->
<template>
  <button @click="store.increment()">
    From N: {{ store.count }}
  </button>
</template>
```

还可以使用其他[响应式 API](https://cn.vuejs.org/api/reactivity-core.html) 例如 `ref()` 或是 `computed()`，或是甚至通过一个[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)来返回一个全局状态：

```js
import { ref } from 'vue'
const globalCount = ref(1)	// 全局状态，创建在模块作用域下
export function useCount() {
  const localCount = ref(1)	// 局部状态，每个组件都会创建
  return {
    globalCount,
    localCount
  }
}
```



###  [Vuex](https://vuex.vuejs.org/zh/)





### [Pinia](https://pinia.vuejs.org/zh/)

[CheatSheet]("D:\Learning\Frontend\Note\Pinia-Cheat-Sheet.pdf")

Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，**它承载着全局状态**。它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有三个概念，[state](https://pinia.vuejs.org/zh/core-concepts/state.html)、[getter](https://pinia.vuejs.org/zh/core-concepts/getters.html) 和 [action](https://pinia.vuejs.org/zh/core-concepts/actions.html)。一个 Store 应该包含可以在整个应用中访问的数据。这包括在许多地方使用的数据，例如显示在导航栏中的用户信息，以及需要通过页面保存的数据，例如一个非常复杂的多步骤表单。

#### 为App初始化Pinia

创建一个 Pinia 实例 (根 store) 并将其传递给应用

```js
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```



#### 创建Store

Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个独一无二的名字，也被用作 *id* ，是必须传入的, 第二个参数可接受两类值：`Setup 函数`或 `Option 对象`。

```js
// src/store/CounterStore.js
import { defineStore } from 'pinia'

// Option 对象
export const useCounterStore = defineStore('counter', {
    state: () => {
        return { count = 0, name = 'user' }
    },
    	// or: () => ({ count = 0, name = 'user' }),
    
    getter: {
        doubleCount(state) {
      		return state.count * 2
      	},
    	// or: doubleCount: (state) => state.count * 2,
    },
    
    actions: {
        increment() {
            this.count++
        },
    },
})

// Setup 函数
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)	// ref() 就是 state 属性
  const doubleCount = computed(() => count.value * 2)	// computed() 就是 getters
  function increment() {	// function() 就是 actions
    count.value++
  }

  return { count, doubleCount, increment }
})
```



#### 使用Store

```vue
<!-- App.vue -->
<script setup>
    import { useCounterStore } from '@/stores/counter'
    const counter = useCounterStore()
</script>
<template>
	<button @click="counter.increment()"> +1 </button>
</template>
```

为了从 store 中解构提取属性时保持其响应性，你需要使用 `storeToRefs()`(可以直接从 store 中解构 action)。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。：

```vue
<script setup>
    import { storeToRefs } from 'pinia'
    const counter = useCounterStore()
    // `name` 和 `doubleCount` 是响应式的 ref
    // 同时通过插件添加的属性也会被提取为 ref 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
    const { name, doubleCount } = storeToRefs(counter)
    // 作为 action 的 increment 可以直接解构
    const { increment } = counter
</script>
```

#### --------

#### State

```js
// 访问 state
counter.count = 1

// 重置 state
counter.$reset()

// 变更 state
counter.$patch({
    count = 8,
    name = 'kobe'
})
counter.$patch((state) => {
    state.count = 8,
    state.name = 'kobe'
})

// 替换 state
counter.$state({
    count = 8,
    name = 'kobe'
})

// 订阅 state
counter.$subscribe((mutation, state) => {
  /*
  mutation: 包含本次状态变化的相关信息。
	mutation.type: 变化的类型，通常是 "direct"（直接修改状态）或 "patch object" / "patch function"（使用 $patch 修改状态）。
	mutation.storeId: 发生变化的 Store 的 ID。
	mutation.payload: 传递给 $patch 的数据（如果使用 $patch 修改状态）。
  state: 当前 Store 的状态对象。
  */

  //调试
  console.log('状态发生了变化：', mutation);
  console.log('当前状态：', state);
  // 例如：将状态持久化到 localStorage
  localStorage.setItem('exampleStoreState', JSON.stringify(state));
  // 副作用
  if (state.count > 10) {
    alert('Count 已经大于 10 了！');
  }
})
```



#### Getter

Getter 是 Store 的一个计算属性。大多数时候，getter 仅依赖 state。不过，有时它们也可能会使用其他 getter。

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {	// 自动推断出返回类型是一个 number
      return state.count * 2
    },
    doublePlusOne(state): number {	// 返回类型必须明确设置
      return (num) = this.doubleCount + num
    },
  },
})
```

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p> Double count is {{ store.doubleCount }} </p>
  <p> Double count plus n is {{ store.doubleCountPlusN(2) }} </p>
</template>
```



#### Action

Action 相当于组件中的 method，是定义业务逻辑的完美选择。类似 getter，action 也可通过 `this` 访问整个 store 实例，不同的是，`action` 可以是异步的，可以在它们里面 `await` 调用任何 API，以及其他 action。

```vue
<script setup>
const store = useCounterStore()
// 将 action 作为 store 的方法进行调用
store.randomizeCounter()
</script>
<template>
  <!-- 即使在模板中也可以 -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
```

你可以通过 `store.$onAction()` 来监听 action 和它们的结果。传递给它的回调函数会在 action 本身之前执行。

```js
// 订阅 Action
const unsubscribe = exampleStore.$onAction(({ name, store, args, after, onError }) => {
  console.log(`Action "${name}" 被调用，参数为:`, args);
  after((result) => {
    console.log(`Action "${name}" 成功执行，结果为:`, result);
  });
  onError((error) => {
    console.error(`Action "${name}" 执行失败，错误为:`, error);
  });
});
// 调用 Action
exampleStore.increment(5);
// 取消订阅
unsubscribe();
```

#### [插件](https://pinia.vuejs.org/zh/core-concepts/plugins.html)

Pinia 插件是一个函数，可以选择性地返回要添加到 store 的属性。它接收一个可选参数，即 *context*。

```js
export function myPiniaPlugin(context) {
  context.pinia // 用 `createPinia()` 创建的 pinia。
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
  // ...
}
```

然后用 `pinia.use()` 将这个函数传给 `pinia`：	

```js
pinia.use(myPiniaPlugin)
```



#### [在组件外使用 store](https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html)





## 测试

- **单元测试**：检查给定函数、类或组合式函数的输入是否产生预期的输出或副作用。
- **组件测试**：检查你的组件是否正常挂载和渲染、是否可以与之互动，以及表现是否符合预期。这些测试比单元测试导入了更多的代码，更复杂，需要更多时间来执行。
- **端到端测试**：检查跨越多个页面的功能，并对生产构建的 Vue 应用进行实际的网络请求。这些测试通常涉及到建立一个数据库或其他后端。

一般来说，**单元测试**将捕获函数的业务逻辑和逻辑正确性的问题。

以这个 `increment` 函数为例：

```js
// helpers.js
export function increment (current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

因为它很独立，可以很容易地调用 `increment` 函数并断言它是否返回了所期望的内容，所以我们将编写一个单元测试。如果任何一条断言失败了，那么问题一定是出在 `increment` 函数上。

```js
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

在 Vue 应用中，主要用组件来构建用户界面。因此，当验证应用的行为时，组件是一个很自然的独立单元。从粒度的角度来看，**组件测试**位于单元测试之上，可以被认为是集成测试的一种形式。每个 Vue 组件都应有自己的组件测试文件。组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题。组件测试不应该模拟子组件，而应该像用户一样，通过与组件互动来测试组件和其子组件之间的交互。例如，组件测试应该像用户那样点击一个元素，而不是编程式地与组件进行交互。组件测试主要需要关心组件的公开接口而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的事件、prop 和插槽。当进行测试时，请记住，测试这个组件做了什么，而不是测试它是怎么做到的。

- 对于 **视图** 的测试：根据输入 prop 和插槽断言渲染输出是否正确。
- 对于 **交互** 的测试：断言渲染的更新是否正确或触发的事件是否正确地响应了用户输入事件。

```js
// Stepper.spec.js
import { mount } from '@vue/test-utils';	// 组件挂载库
...
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'
// 挂载 Stepper 组件并传递 props
const wrapper = mount(Stepper, {
  props: {
    max: 1 // 设置最大值为 1
  }
})
// 断言初始值是否为 '0'
expect(wrapper.find(valueSelector).text()).toContain('0')
// 触发按钮点击事件
await wrapper.find(buttonSelector).trigger('click')
// 断言点击后值是否变为 '1'
expect(wrapper.find(valueSelector).text()).toContain('1')
```

**端到端测试针对**的是应用最重要的方面：当用户实际使用你的应用时发生了什么。端到端测试的重点是多页面的应用表现，针对你的应用在生产环境下进行网络请求。他们通常需要建立一个数据库或其他形式的后端，甚至可能针对一个预备上线的环境运行。端到端测试通常会捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题。端到端测试不导入任何 Vue 应用的代码，而是完全依靠在真实浏览器中浏览整个页面来测试你的应用。



### Vitest







## 服务端渲染SSR

Vue.js 是一个用于构建客户端应用的框架。默认情况下，Vue 组件的职责是在浏览器中生成和操作 DOM。然而，Vue 也支持将组件在服务端直接渲染成 HTML 字符串，作为服务端响应返回给浏览器，最后在浏览器端将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。



首先，让我们将应用的创建逻辑拆分到一个单独的文件 `app.js` 中：

```js
// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```

该文件及其依赖项在服务器和客户端之间共享——我们称它们为**通用代码**。

```js
// server.js
import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';

const server = express();

server.get('/', (req, res) => {
  const app = createApp();

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">	//  以支持在浏览器中使用 import * from 'vue'
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>	// 加载客户端入口文件
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));	// 托管客户端文件

server.listen(3000, () => {
  console.log('ready');
});
```

**服务器渲染**：

- 当用户访问网站时，服务器接收到请求并调用 `server.get('/', ...)` 处理函数。
- 服务器使用 `createSSRApp()` 创建应用实例，并通过 `renderToString()` 将其转换为 HTML 字符串。
- 服务器构建完整的 HTML 文档，并在其中插入指向客户端 JavaScript 文件的 `<script>` 标签。
- 服务器发送 HTML 响应给客户端。

```js
// client.js
import { createApp } from './app.js'
createApp().mount('#app')
```

**客户端加载**：

- 浏览器接收到 HTML 后开始解析和渲染页面。
- 浏览器根据 HTML 中的 `<script>` 标签自动下载并执行客户端 JavaScript 文件 (`client.js`)。
-  `client.js`导入通用代码中的 `createApp()` 函数，并调用 `app.mount('#app')` 来激活应用程序。



## 静态站点生成SSG

静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，是另一种流行的构建快速网站的技术。如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。



## API 调用

### Axios

#### API

##### axios.create(config)

`axios.create` 是 Axios 库提供的一个方法，用于创建一个自定义的 Axios 实例。通过 `axios.create`，你可以为特定的请求配置默认值（如基础 URL、请求头、超时时间等），从而避免在每个请求中重复配置相同的参数。

```js
import axios from 'axios';

/** 创建一个自定义的 Axios 实例 */
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // 基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 默认请求头
    'Authorization': 'Bearer your_token_here' // 认证信息
  }
});

/** 为实例添加请求和响应拦截器，以实现统一的逻辑处理（如添加认证信息、处理错误等）：*/
// 添加请求拦截器
apiClient.interceptors.request.use(config => {
  console.log('请求发送前:', config);
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
apiClient.interceptors.response.use(response => {
  console.log('响应接收后:', response);
  return response;
}, error => {
  return Promise.reject(error);
});

// 创建实例后，你可以像使用默认的 axios 一样使用这个实例
apiClient.post('/users', { name: 'John', age: 30 })
  .then(response => {
    console.log(response.data);
  })
  // 错误处理
  .catch(error => {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```



##### axios(config)

```js
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

##### axios(url[, config])

```js
// 发起一个 GET 请求 (默认请求方式)
axios('/user/12345');
```

##### axios.get(url[, config])

```js
const axios = require('axios');

  axios.get('/user', {	  
    params: {
      ID: 12345
    }
  })	// or: axios.get('/user?ID=12345')
  .then(function (response) {    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {    // 处理错误情况
    console.log(error);
  })
  .finally(function () {    // 总是会执行
  });

// or: (支持async/await用法)
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

```js
// 发起多个并发请求
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);

// OR:
Promise.all([getUserAccount(), getUserPermissions()])
  .then(function ([acct, perm]) {
    // ...
  });
```



##### axios.post(url[, data[, config]])

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// HTML Form
const {data} = await axios.post('/user', document.querySelector('#my-form'), {
  headers: {
    'Content-Type': 'application/json'
  }
})

const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3],
    photo: document.querySelector('#fileInput').files
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)

const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3]
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
```

##### 其他

###### axios.delete(url[, config])

###### axios.head(url[, config])

###### axios.options(url[, config])

###### axios.request(config)

###### axios.put(url[, data[, config]])

###### axios.patch(url[, data[, config]])

###### axios.postForm(url[, data[, config]])

###### axios.putForm(url[, data[, config]])

###### axios.patchForm(url[, data[, config]])



#### 响应结构Response

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头 所有的 header 名称都是小写，而且可以使用方括号语法访问 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求  在node.js中它是最后一个ClientRequest实例 (in redirects)，在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```



### Apollo



### FormKit





## 进阶

### [性能优化](https://cn.vuejs.org/guide/best-practices/performance.html)



### [无障碍访问 ](https://cn.vuejs.org/guide/best-practices/accessibility.html)



### [深入响应式系统](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)



### 渲染机制

Vue 如何将一份模板转换为真实的 DOM 节点的，又是如何高效地更新这些节点。

#### 虚拟DOM

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* 更多 vnode */
  ]
}
```

这里所说的 `vnode` 即一个纯 JavaScript 的对象 (一个“虚拟节点”)，它代表着一个 `<div>` 元素。它包含我们创建实际元素所需的所有信息。它还包含更多的子节点，这使它成为虚拟 DOM 树的根节点。

一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为**挂载** (mount)。

如果我们有新老两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为**更新** (patch)，又被称为“比对”(diffing) 或“协调”(reconciliation)。

<img src="https://cn.vuejs.org/assets/render-pipeline.CwxnH_lZ.png" alt="render pipeline" style="zoom:50%;" />





### [渲染函数 & JSX ](https://cn.vuejs.org/guide/extras/render-function.html)



### [Vue 与 Web Components ](https://cn.vuejs.org/guide/extras/web-components.html#example-vue-cli-config)

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 是一组 web 原生 API 的统称，允许开发者创建可复用的自定义元素 (custom elements)。 Vue 和 Web Components 是互补的技术。



### 动画技巧

对于那些不是正在进入或离开 DOM 的元素，我们可以通过给它们动态添加 CSS class 来触发动画：

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

```html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">Click me</button>
  <span v-if="disabled">This feature is disabled!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

有些过渡效果可以通过动态插值来实现，比如在交互时动态地给元素绑定样式。看下面这个例子：

```html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>Move your mouse across this div...</p>
  <p>x: {{ x }}</p>
</div>
```

```jd
const x = ref(0)
function onMousemove(e) {
  x.value = e.clientX
}
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

通过发挥一些创意，我们可以基于一些数字状态，配合侦听器给任何东西加上动画。例如，我们可以将数字本身变成动画：

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'
const number = ref(0)
const tweened = reactive({
  number: 0
})
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

```vue
Type a number: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```