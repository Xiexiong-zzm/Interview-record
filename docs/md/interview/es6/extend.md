# ES6的扩展
## 数值的扩展
1. 二进制和八进制表示法  
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```

2. 数值分隔符  
```javascript
123_00 === 12_300 // true

12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
```
3. Number.isFinite(), Number.isNaN()  
ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

4. Number.parseInt(), Number.parseFloat()  
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
5. Number.isInteger()  
Number.isInteger()用来判断一个数值是否为整数
6. Number.EPSILON
ES6 在Number对象上面，新增一个极小的常量Number.EPSILON
7. Math对象的扩展  
参考了解即可
## 正则的扩展
1. RegExp构造函数  
- 第一个参数是字符串，第二个参数表示正则修饰符
```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```
- 参数是一个正则表达式
```javascript
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// 此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i'); //Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
```
2. 字符串的正则方法  
ES6之前字符串有四个方法可使用正则表达式：match(), replace(), search(), split()。
ES6将这四个方法全部定义在RegExp对象上面。
- String.prototype.match 调用 RegExp.prototype[Symbol.match]
- String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
- String.prototype.search 调用 RegExp.prototype[Symbol.search]
- String.prototype.split 调用 RegExp.prototype[Symbol.split]
3. 新增的一些属性，可自行了解查询，不过多赘述
## 字符串的扩展
1. 模板字符串  
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```javascript
// 比如在vue项目中我们经常会需要写一些灵活配置的内容
let str = `根据币种${exchangeType}选择交易所${exchange}`;
// 支持换行
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`)
```
2. JSON.stringify()的改造  
ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理
```javascript
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 数组的扩展
1. 扩展运算符  
扩展运算符（spread）是三个点（...），将一个数组转为用逗号分隔的参数序列。
```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```
2. Array.from()  
Array.from()方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map） 
```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5 的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6 的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
3. Array.of()  
Array.of()方法用于将一组值，转换为数组。主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异,使用Array.of()行为非常统一。
```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// 使用 Array.of()
Array.of() // []
Array.of(3) // [3]
Array.of(3, 11, 8) // [3, 11, 8]
```
4. 新增实例方法(略)
## 函数的扩展
1. rest参数  
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
2. 箭头函数  
ES6 引入了箭头函数（=>），可以直接作为函数表达式的一种，使用 => 就能写出箭头函数。
```javascript
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```
#### 注意点
- 箭头函数没有自己的this对象
- 不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

#### 解释:
箭头函数没有自己的this对象,他的this是指向定义时上层作用域的this,所以箭头函数在创建时他的this就已经固定了,而我们普通函数this是不固定的,指向函数运行时所在的对象(谁调用指向谁)

3. 其他暂不展开
## 对象的扩展
1. 属性的可枚举性和遍历
- 可枚举性
    ```javascript
    let obj = { foo: 123 };
    Object.getOwnPropertyDescriptor(obj, 'foo')
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true,  // 可枚举
    //    configurable: true
    //  }
    ```  
    1. for...in循环：只遍历对象自身的和继承的可枚举的属性
    2. Object.keys()：返回对象自身的所有可枚举的属性的键名
    3. JSON.stringify()：只串行化对象自身的可枚举的属性
    4. Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

- 遍历
    - for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
    - Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
    - Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
    - Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
    - Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举
2. 对象的扩展运算符
```javascript
// 解构赋值要求等号右边是一个对象,如果无法转为对象会报错
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误

// 解构赋值必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误

// 解构赋值的拷贝是浅拷贝
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

3. super关键字  
- 新增了另一个类似的关键字super，指向当前对象的原型对象。
```javascript
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
- super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
```javascript
// 报错 直接用在对象属性上
const obj = {
  foo: super.foo
}

// 以下两种写法都是赋值写法,要使用对象方法的简写形式才能够给JavaScript 引擎确认，定义的是对象的方法
// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```


