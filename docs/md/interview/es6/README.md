# JS基础
## ES6扩展属性
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
1. 数组解构
```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 如果解构不成功，变量的值就等于undefined。
let [bar, foo] = [1];
console.log(bar, foo); // 1 undefined

// 不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [m, [n], d] = [1, [2, 3], 4];
m // 1
n // 2
d // 4
```
如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错  
```javascript
// 以下都会报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```
对于 Set 结构，也可以使用数组的解构赋值。 只要某种数据结构具有 Iterator 接口 都可以采用数组形式的解构赋值  

2. 对象解构赋值：对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。  
```javascript
// 没有对应的同名属性，导致取不到值，最后等于undefined。
let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

// foo是模式，test是变量 模式foo是不会被赋值的
let { foo: test } = { foo: 'aaa', bar: 'bbb' };
test // "aaa"
foo // error: foo is not defined
```
3. 字符串解构赋值
```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```javascript
let {length : len} = 'hello';
len // 5
```
4. 数值和布尔值的解构赋值  
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。  
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
```javascript
let {toString: r1} = 123;
r1 === Number.prototype.toString // true

let {toString: r2} = true;
r2 === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
5. 函数参数的解构赋值
函数参数的解构赋值是完全可以采用解构赋值的。
```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```
6. 函数参数的解构赋值：默认值
如果没有提供参数，可以使用默认值。
```javascript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```
## 面试常考基础
### 作用域和闭包
#### 执行上下文
参考文章[执行上下文](https://juejin.cn/post/6844903682283143181)  
JavaScript 中有三种执行上下文类型： 
- *全局执行上下文* — 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。
- *函数执行上下文* — 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤。
- Eval 函数执行上下文 — 执行在 eval 函数内部的代码也会有它属于自己的执行上下文
#### 执行栈
执行栈，也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。 
```javascript
// 代码结合图片分析执行栈进栈出栈过程
let a = 'Hello World!';

function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}

function second() {
  console.log('Inside second function');
}

first();
console.log('Inside Global Execution Context');
```
![执行栈](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f539572076fe3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 创建执行上下文
1. 创建阶段
- this 值的决定，即我们所熟知的 This 绑定  
  1. 在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this引用 Window 对象)
  2. 在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）
  ```javascript
  let foo = {
    baz: function() {
    console.log(this);
    }
  }
  foo.baz();   // 'this' 引用 'foo', 因为 'baz' 被
             // 对象 'foo' 调用
  let bar = foo.baz;
  bar();       // 'this' 指向全局 window 对象，因为
              // 没有指定引用对象
  ```
- 创建词法环境组件
- 创建变量环境组件
2. 执行阶段

#### 什么是作用域
作用域 指程序中定义变量的区域，它决定了当前执行代码对变量的访问权限。  
- 全局作用域：全局作用域为程序的最外层作用域，一直存在。
- 函数作用域：函数作用域只有函数被定义时才会创建，包含在父级函数作用域 / 全局作用域内
```javascript
/* 全局作用域开始 */
var a = 1;

function func () { /* func 函数作用域开始 */
  var a = 2;
  console.log(a);
}                  /* func 函数作用域结束 */

func(); // => 2

console.log(a); // => 1

/* 全局作用域结束 */
```
#### 什么是作用域链
用代码描述：
```javascript
function foo(a) {
  var b = a * 2;

  function bar(c) {
    console.log( a, b, c );
  }

  bar(b * 3);
}

foo(2); // 2 4 12
```
当可执行代码内部访问变量时，会先查找本地作用域，如果找到目标变量即返回，否则会去父级作用域继续查找...一直找到全局作用域。我们把这种作用域的嵌套机制，称为 作用域链

#### 词法作用域
看代码  
```javascript
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 输出的是1而不是2
```
词法作用域，就意味着函数被定义的时候，它的作用域就已经确定了，和拿到哪里执行没有关系，因此词法作用域也被称为 “静态作用域”。所以上面代码因为foo函数创建的时候作用域就确定了，拿到的value就是全局作用域的值。


#### 作用域使用场景
模块化 - 解决了 全局作用域污染 和 变量名冲突 的问题

#### 闭包
闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。

```javascript
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
```
#### 闭包的问题
- 内存泄露：由于闭包使用过度而导致的内存占用无法释放的情况