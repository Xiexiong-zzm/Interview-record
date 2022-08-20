### 盒子模型概念
CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容
![盒子模型](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9dc3737a4e74d15bcb62888f54c1f43~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
#### 标准盒模型&&IE盒模型(怪异盒模型)
标准盒模型：宽=内容宽+padding * 2 + 边框宽度 * 2+margin * 2，高=内容高+边框高度 * 2+padding * 2 + margin*2  
IE盒模型：宽=内容宽+margin * 2，高=内容高 + margin * 2  
内容宽=content+padding+border  
设置标准模型：box-sizing: content-box;  
设置怪异模型：box-sizing: border-box;  
JS获取盒模型的宽高： window.getComputedStyle(ele).width/height

#### BFC
BFC：块级格式化上下文
1. BFC的布局规则：
- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算。
2. 创建BFC
- float的值不是none
- position的值不是static或者relative。
- overflow的值不是visible。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex。
3. BFC作用
- 利用BFC避免margin重叠
- 自适应两栏布局
- 清除浮动