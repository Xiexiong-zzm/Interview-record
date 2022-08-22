# HTML
### 如何理解HTML语义化
1. 对人来说是提高代码可读性，让代码更容易维护
2. 对于机器，有利于seo
### 块级元素和内联元素
#### 块级元素
- 常见的块级元素有div p h1 h2... ul ol等
- 块级元素会独自占据一行，可以声明宽和高
- display:block可以把元素转换为块级元素

#### 行内元素
- 常见的行内元素有 span a input button
- 行内元素设置宽度width无效
- 行内元素设置height无效，但是可以通过line-height来设置
- 设置margin、padding只有左右有效，上下无效
- 行内元素会出现在一行，不会起新行。不能直接声明宽高，如果要声明宽高需要把元素转换为行内或者行内块元素。
- display:inline把元素转换为行内元素

#### 行内块元素
- 不自动换行，可以声明宽高
- display: inline-block将元素转换为行内块元素

### DOCTYPE的作用
Doctype是HTML5的文档声明，通过它可以告诉浏览器，使用哪一个HTML版本标准解析文档

### src和href的区别
- 通过src请求资源时，会暂停其他资源下载，直到将该资源加载、编译、执行完毕。这也是为什么将js脚本放在底部而不是头部的原因。
- href是超链接，指向网络资源，当浏览器识别到它指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理，通常用于a、link元素

### meta标签用途
meta元素表示那些不能由其它 HTML 元相关（meta-related）元素表示的任何元数据信息。
- name属性: 设置后meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
- http-equiv: 设置后meta 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同
- charset: meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
- itemprop: meta 元素提供用户定义的元数据
### iframe的作用以及优缺点  
iframe也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入到现有的网页中。  
缺点：  
- iframe会阻塞主页面的Onload事件
- iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
- 会产生很多页面，不易管理
- 浏览器的后退按钮没有作用
- 无法被一些搜索引擎识别

### script里面设置defer、async有啥区别
- 不设置：解析html过程中碰到script标签，暂停解析html，加载js并执行js，再解析html
- defer：解析html过程并行请求js，待html解析完成再执行js
- async: 解析html过程并行请求js，立刻执行js，执行完再继续解析html

### prefetch和preload区别
- 都是放在head标签里，<link ref="preload" href="a.js/a.css" as="style/script">
- preload是提前加载，资源在当前页面使用，会优先加载
- prefetch是提前获取，资源在未来页面使用，空闲时加载
- dns-prefetch是dns的预查询，提前解析要打开的网页进行dns解析<link ref="dns-prefetch" href="http://www.baidu.com">
- preconnect是dns的预连接