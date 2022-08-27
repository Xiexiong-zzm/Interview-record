# 面试题记录
[推荐面试参考](https://vue3js.cn/interview/)
### H5和APP交互通信
1. H5调用App方法：  
H5和APP的交互可以分为两种情况:  
- 单向通信的交互
- 不满足于单项传参需要return和callback的交互。
#### 单向通信的交互
1. 不需要传参的通信
    - 原生跳H5：将H5对应的URL给移动端同学即可
    - H5跳原生：location.herf = 要跳转的原生页面对应的协议名
2. 需要传参的通信 H5与APP需要进行单向的数据传递
    - url传参
    - window传参
#### 双向通信的交互
1. WebViewJavaScriptBridge
    - 基本原理： 建立一个桥梁，然后注册自己，调用他人  
```javascript
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback]; // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
    var WVJBIframe = document.createElement('iframe'); // 创建一个 iframe 元素
    WVJBIframe.style.display = 'none'; // 不显示
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'; // 设置 iframe 的 src 属性
    document.documentElement.appendChild(WVJBIframe); // 把 iframe 添加到当前文导航上。
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
// 这里主要是注册 OC 将要调用的 JS 方法。下面具体的交互操作会提到
setupWebViewJavascriptBridge(function(bridge){

});
```
#### JSBridge
[参考文章](https://juejin.cn/post/6844903585268891662)  
原理：Hybrid 方案是基于 WebView 的，JavaScript 执行在 WebView 的 Webkit 引擎中。因此，Hybrid 方案中 JSBridge 的通信原理会具有一些 Web 特性。
#### JavaScript 调用 Native
1. JavaScript 调用 Native方式，主要有两种：注入 API 和 拦截 URL SCHEME。
    - 注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
2. 拦截 URL SCHEME  
URL SCHEME: URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。  
拦截 URL SCHEME 的主要流程: Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

#### Native 调用 JavaScript
JavaScript将方法挂载到全局window,app调用view页面的方法。

### HTTP1.0、HTTP1.1 和 HTTP2.0 的区别
[参考文章](https://juejin.cn/post/6844903489596833800)  
- 影响一个 HTTP 网络请求的因素主要有两个：带宽和延迟
    1. 带宽 - 目前已不需要考虑
    2. 延迟： 
        - 浏览器阻塞（HOL blocking）：浏览器会因为一些原因阻塞请求。浏览器对于同一个域名，同时只能有 4 个连接（这个根据浏览器内核不同可能会有所差异），超过浏览器最大连接数限制，后续请求就会被阻塞。
        - DNS 查询（DNS Lookup）：浏览器需要知道目标服务器的 IP 才能建立连接。将域名解析为 IP 的这个系统就是 DNS。这个通常可以利用DNS缓存结果来达到减少这个时间的目的
        - 建立连接（Initial connection）：HTTP 是基于 TCP 协议的，浏览器最快也要在第三次握手时才能捎带 HTTP 请求报文，达到真正的建立连接，但是这些连接无法复用会导致每次请求都经历三次握手和慢启动。三次握手在高延迟的场景下影响较明显，慢启动则对文件类大请求影响较大。
- HTTP1.0和HTTP1.1的一些区别
    1. 缓存处理：1.0中使用的是header中的If-Modified-Since,Expires进行判断，1.1引入了更多的缓存控制策略如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等
    2. 带宽优化及网络连接的使用：HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
    3. 错误通知的管理，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
    4. Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
    5. 长连接，HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

- HTTPS与HTTP的区别
    1. HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费
    2. HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
    3. HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    4. HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题
- HTTP2.0和HTTP1.X相比的新特性
    1. 新的二进制格式（Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮
    2. 多路复用（MultiPlexing），即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。
    3. header压缩，如上文中所言，对前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。
    4. 服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能。
### H5项目做了什么优化
1. 抽离模板组件，缩小代码体积
2. 列表采用懒加载，多次加载
3. 封装了图片方法，根据设备像素比选取合适倍图
4. 公共方法提取
### 倍图的处理
如何灵活选取合适倍图？  
1. 根据当前的设备像素比，dpr<=2采用二倍图，dpr>2采用三倍图
2. dpr = 在相同长度的直线上）设备像素的数量 / CSS 像素的数量  
等价于 dpr = CSS 像素边长/设备像素边长
#### 实现响应式设计
[参考文章](https://juejin.cn/post/7046169975706353701#heading-24)
1. vm: viewport viewport 表示浏览器的可视区域，也就是浏览器中用来显示网页的那部分区域，存在三种 viewport 分别为 layout viewport、visual viewport 以及 ideal viewport
    - 移动设备默认使用的是layout viewport，但在开发中我们要用的是ideal viewport，需要再meta中设置
```HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
2. 方案选择
    - 使用 css 的媒体查询 @media， 但这个多一个尺寸就要多一个查询块
    - rem：rem（font size of the root element）是指相对于根元素的字体大小的单位，如果我们设置 html 的 font-size 为 16px，则如果需要设置元素字体大小为 16px，则写为 1rem
    - Retina 屏预留坑位： 在入口的 html 页面进行 dpr 判断，以及 data-dpr 的设置；然后在项目的 css 文件中就可以根据 data-dpr 的值根据不同的 dpr 写不同的样式类
#### 1px问题
transform: scale(0.5) + :before / :after 
```CSS
.calss1 {
  position: relative;
  &::after {
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-top:1px solid #666;
    transform: scaleY(0.5);
  }
}
```

#### iPhoneX 适配方案
```CSS
padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
```
5. 图片压缩 
```javascript
// 根据图片生成base64
export function getBase64Image(img: any) {
    const canvas = document.createElement('canvas')
    const width = img.naturalWidth || img.width
    const height = img.naturalHeight || img.height
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ;(ctx as any).drawImage(img, 0, 0, width, height)

    const ext = img.src.match(/[^.]*$/)[0]
    const mimetypeMap = {
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        ico: 'image/x-icon',
        gif: 'image/gif',
        bmp: 'image/bmp',
    }
    const mimetype = (mimetypeMap as any)[ext] || 'image/png'

    return canvas.toDataURL(mimetype)
}
```
### 事件循环
#### js事件循环
- 宏任务主要包括：scrip(JS 整体代码)、setTimeout、setInterval、setImmediate、I/O、UI 交互
- 微任务主要包括：Promise(重点关注)、process.nextTick(Node.js)、MutaionObserver
- async await会将他后面的代码加入到微任务队列
#### node事件循环
外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)
#### node事件循环和js事件循环差别
浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务
7. 怎么设置强缓存
8. 浏览器缓存
9. app兼容
10. vue2和vue3区别
### vue2中劫持对象和vue3有什么区别
1. Vue3性能更好，diff算法上优化：  
   - Vue2双端比较，定义四个指针分别指向新旧节点的首尾，然后首首比较，首尾比较，尾尾比较，尾首比较   
   - Vue3最长递增子序列，比如[3,5,7,1,2,8]的最长递增子序列是[3,5,7,8],定义四个指针分别指向新旧节点的首尾,找到最长递增的不用动，其他的进行移动
2. 响应式原理：  
    - Vue2通过Object.defineProperty实现  
    - vue3是通过Proxy，用Reflect.get和Reflect.set返回，它有兼容性
3. API使用上区别：
    - Vue3新增组合式API，可以放重复的逻辑在里头，Vue2用mixins
    - Vue3异步加载组件用defineAsyncComponent，Vue2用import（）
    - Vue3可以在template下有多个子节点，添加多个事件多个v-model绑定，新增了teleport将元素插入指定元素下，新增suspense的fallback类似于vue2的slot，移除filter
4. 生命周期区别，用setup代替了beforeCreate、created,使用hooks函数形式比如mounted改为了onMounted()
### vue.nexttick
1. vue的mounted和updated生命周期钩子不会保证所有的子组件都被挂载完成，如果希望视图渲染完毕执行操作用$nextTick
2. Vue是异步执行DOM更新，只要观察到数据变化，Vue将开启一个队列并缓冲在同一事件循环中发生的所有数据改变，如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要
3. 原理：将callback回调放到异步队列中，有个pending的标识判断事件是否第一次加入，第一次加入才推到队列中,在下一次事件循环中执行传入的callback回调
### vue对数组响应式更新怎么实现的
双向绑定v-model的实现原理或者问数据响应式原理：
1. vue2是通过Object.defineProperty()，缺点是迭代计算量大、新增和删除属性没法监听（需要手动set和delete）、无法监听数组（需要对数组进行特殊处理）
2. vue2数组处理：创建一个数组原型arrPrototype，用Object.create(arrPrototype),往里头添加自定义方法，方法里头执行的时候用call改变this指向
```javascript
const arryProto = Array.prototype
    const obj = Object.create(arryProto)
    ['push', 'shift', 'unshift', 'pop', 'reverse', 'splice'].map(method => {
        obj[method] = function() {
            arryProto[method].call(this, ...arguments)
        }
    })
```
3. vue3是通过Proxy，用Reflect.set() Reflect.get() Reflect.delete(),兼容性问题
###  async await 实现原理
[参考文章](https://segmentfault.com/a/1190000023442526)  
通过generator+Promise实现的，核心逻辑就是generator结合自执行函数
### git 常见操作 commit add后怎么取消rebase和merge有什么区别
merge 是合并的意思，rebase是复位基底的意思  
merge操作会生成一个新的节点，之前提交分开显示。而rebase操作不会生成新的节点，是将两个分支融合成一个线性的操作。

撤销 git reset 
### js为什么单线程
[参考文章](https://github.com/JChehe/blog/blob/master/posts/%E5%85%B3%E4%BA%8EJavaScript%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B.md)
与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。若以多线程的方式操作这些 DOM，则可能出现操作的冲突。假设有两个线程同时操作一个 DOM 元素，线程 1 要求浏览器删除 DOM，而线程 2 却要求修改 DOM 样式，这时浏览器就无法决定采用哪个线程的操作。当然，我们可以为浏览器引入“锁”的机制来解决这些冲突，但这会大大提高复杂性，所以 JavaScript 从诞生开始就选择了单线程执行。  
### 常见状态码
### http2.0多路复用可能有什么问题
### csrf怎么解决

