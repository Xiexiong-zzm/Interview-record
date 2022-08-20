# 手撕代码

## 手写new
new 的过程：
1. 创建了一个新对象
2. 改变构造函数原型指向，指向新创建的对象
3. 输出结果
```javascript
function myNew(constructor,...args) {
    if(typeof constructor !== 'function') {
        throw new Error('constructor must be a function')
    }
    // 创建构造函数原型对象，使obj有构造函数的原型属性
    let obj = Object.create(constructor.prototype)
    let result = constructor.apply(obj, args)
    return result instanceof Object ? result : obj
}
```
## 手写防抖函数
思路： 
创建一个定时器，每一次定时操作完成后调用函数，如果在定时操作未完成重复操作，会重新生成定时器，不执行函数。
```javascript
function debounce(fn,delay) {
    if(typeof fn !== 'function') {
        throw new Error('fn must be a function')
    }

    let timer
    return function() {
        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments)
            clearTimeout(timer)
            timer = null
        }, delay)
    }
}

```

## 手写节流函数
节流（throttle）:不管事件触发频率多高，只在单位时间内执行一次  
```javascript
function throttle(fn,delay) {
    let timer = null;
    return function () {
        if(timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this,arguments);
            clearTimeout(timer);
            timer = null;
        },delay);
    }
}
```

## 函数柯里化
```javascript
function currying(func) {
    return function curried(...args){
        if(args.length >= func.length) {
            console.log('func',func.length);
            console.log('args',args);

            return func.apply(this, args)
        }
        return function (...args2) {
            console.log('aaa');
            return curried.apply(this, args.concat(args2))
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
  }
  
  let curriedSum = currying(sum);
  
  console.log(curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
  console.log( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
  console.log( curriedSum(1)(2)(3) ); // 6，全柯里化

```

## 手动实现call/apply/bind
- 模拟实现call
    1. 判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
    2. context 为可选参数，如果不传的话默认上下文为 window
    3. 为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
    4. 处理参数，传入第一个参数后的其余参数
    5. 调用函数后即删除该Symbol属性
```javascript
    Function.prototype.myCall = function (context = window, ...args) {
      if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
      }
      const fn = Symbol();
      context[fn] = this;
      const result = context[fn](...args);
      delete context[fn];
      return result;
}
```

- 模拟实现apply
call和apply的区别是，call接收入参不是数组类型，apply接收的是一个数组参数  
```javascript
    Function.prototype.myApply = function (context = window, args) {
      if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
      }
      const fn = Symbol();
      context[fn] = this;
      let result;
      if (Array.isArray(args)) {
        result = context[fn](...args);
      } else {
        result = context[fn]();
      }
      delete context[fn];
      return result;
}
```
- 模拟实现Bind
    1. 处理参数，返回一个闭包
    2. 判断是否为构造函数调用，如果是则使用new调用当前函数
    3. 如果不是，使用apply，将context和处理好的参数传入
```javascript
    Function.prototype.myBind = function (context,...args1) {
      if (this === Function.prototype) {
        throw new TypeError('Error')
      }
      const _this = this
      return function F(...args2) {
        // 判断是否用于构造函数
        if (this instanceof F) {
          return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
      }
    }
```
