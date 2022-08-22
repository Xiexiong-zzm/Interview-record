# 常见几种设计模式
## 创建型
### 单例模式
为了保证全局只有唯一一个对象，实现的关键点： 
1. 使用 IIFE创建局部作用域并即时执行；
2. getInstance() 为一个 闭包 ，使用闭包保存局部作用域中的单例对象并返回。

```javascript
const FooServiceSingleton = (function () {
    // 隐藏的Class的构造函数
    function FooService() { }

    // 未初始化的单例对象
    let fooService;

    return {
        // 创建/获取单例对象的函数
        getInstance: function () {
            if (!fooService) {
                fooService = new FooService();
            }
            return fooService;
        }
    }
})();

const fooService1 = FooServiceSingleton.getInstance();
const fooService2 = FooServiceSingleton.getInstance();

console.log(fooService1 === fooService2); // true
```

### 工厂模式
构造函数过多不方便管理，且需要创建的对象之间存在某些关联（有同一个父类、实现同一个接口等）时，可以使用工厂模式管理  
```javascript
function SuzukiCar(color) {
    this.color = color;
    this.brand = 'Suzuki';
}

// 汽车构造函数
function HondaCar(color) {
    this.color = color;
    this.brand = 'Honda';
}

// 汽车构造函数
function BMWCar(color) {
    this.color = color;
    this.brand = 'BMW';
}

// 汽车品牌枚举
const BRANDS = {
    suzuki: 1,
    honda: 2,
    bmw: 3
}

/**
 * 汽车工厂
 */
function CarFactory() {
    this.create = function (brand, color) {
        switch (brand) {
            case BRANDS.suzuki:
                return new SuzukiCar(color);
            case BRANDS.honda:
                return new HondaCar(color);
            case BRANDS.bmw:
                return new BMWCar(color);
            default:
                break;
        }
    }
}

const carFactory = new CarFactory();
const cars = [];

cars.push(carFactory.create(BRANDS.suzuki, 'brown'));
cars.push(carFactory.create(BRANDS.honda, 'grey'));
cars.push(carFactory.create(BRANDS.bmw, 'red'));

function say() {
    console.log(`Hi, I am a ${this.color} ${this.brand} car`);
}

for (const car of cars) {
    say.call(car);
}
```

## 结构型
### 代理模式  
解决的问题: 
1. 增加对一个对象的访问控制
2. 当访问一个对象的过程中需要增加额外的逻辑
```javascript
function StockPriceAPI() {
    // Subject Interface实现
    this.getValue = function (stock, callback) {
        console.log('Calling external API ... ');
        setTimeout(() => {
            switch (stock) {
                case 'GOOGL':
                    callback('$1265.23');
                    break;
                case 'AAPL':
                    callback('$287.05');
                    break;
                case 'MSFT':
                    callback('$173.70');
                    break;
                default:
                    callback('');
            }
        }, 2000);
    }
}


function StockPriceAPIProxy() {
    // 缓存对象
    this.cache = {};
    // 真实API对象
    this.realAPI = new StockPriceAPI();
    // Subject Interface实现
    this.getValue = function (stock, callback) {
        const cachedPrice = this.cache[stock];
        if (cachedPrice) {
            console.log('Got price from cache');
            callback(cachedPrice);
        } else {
            this.realAPI.getValue(stock, (price) => {
                this.cache[stock] = price;
                callback(price);
            });
        }
    }
}

const api = new StockPriceAPIProxy();
api.getValue('GOOGL', (price) => { console.log(price) });
api.getValue('AAPL', (price) => { console.log(price) });
api.getValue('MSFT', (price) => { console.log(price) });

setTimeout(() => {
    api.getValue('GOOGL', (price) => { console.log(price) });
    api.getValue('AAPL', (price) => { console.log(price) });
    api.getValue('MSFT', (price) => { console.log(price) });
}, 3000)
```
### 外观模式：  
- 子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用
```javascript
function addEvent(element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler);
    } else {
      element['on' + event] = fn;
    }
  }
  
  // 取消绑定
  function removeEvent(element, event, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(event, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, handler);
    } else {
      element['on' + event] = null;
    }
  }
```

## 行为型
### 策略模式
对象有某个行为，但是在不同的场景中，该行为有不同的实现算法  
最常见的使用策略模式的场景如登录鉴权，鉴权算法取决于用户的登录方式是手机、邮箱或者第三方的微信登录等等，而且登录方式也只有在运行时才能获取，获取到登录方式后再动态的配置鉴权策略。
```javascript
/**
 * 登录控制器
 */
function LoginController() {
    this.strategy = undefined;
    this.setStrategy = function (strategy) {
        this.strategy = strategy;
        this.login = this.strategy.login;
    }
}

/**
 * 用户名、密码登录策略
 */
function LocalStragegy() {
    this.login = ({ username, password }) => {
        console.log(username, password);
        // authenticating with username and password... 
    }
}

/**
 * 手机号、验证码登录策略
 */
function PhoneStragety() {
    this.login = ({ phone, verifyCode }) => {
        console.log(phone, verifyCode);
        // authenticating with hone and verifyCode... 
    }
}

/**
 * 第三方社交登录策略
 */
function SocialStragety() {
    this.login = ({ id, secret }) => {
        console.log(id, secret);
        // authenticating with id and secret... 
    }
}

const loginController = new LoginController();

// 调用用户名、密码登录接口，使用LocalStrategy
app.use('/login/local', function (req, res) {
    loginController.setStrategy(new LocalStragegy());
    loginController.login(req.body);
});

// 调用手机、验证码登录接口，使用PhoneStrategy
app.use('/login/phone', function (req, res) {
    loginController.setStrategy(new PhoneStragety());
    loginController.login(req.body);
});

// 调用社交登录接口，使用SocialStrategy
app.use('/login/social', function (req, res) {
    loginController.setStrategy(new SocialStragety());
    loginController.login(req.body);
});
```
### 迭代器模式
迭代器模式解决了以下问题：
1. 提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
2. 提供遍历容器（集合）的能力而无需改变容器的接口

迭代器通常需要实现以下接口：
- hasNext()：判断迭代是否结束，返回Boolean
- next()：查找并返回下一个元素
```javascript
// 实现一下：
const item = [1, 'red', false, 3.14];
function Iterator(collection) {
    this.index = 0;
    this.collection = collection;
}

Iterator.prototype.hasNext = function () {
    return this.index < this.collection.length
}
Iterator.prototype.next = function () {
    return this.collection[this.index++];
}


const iterator = new Iterator(item);

while (iterator.hasNext()) {
    console.log(iterator.next());
}
```

### 发布订阅模式
Vue2数据双向绑定原理是通过数据劫持结合“发布者-订阅者”模式的方式来实现的，首先是对数据进行监听，然后当监听的属性发生变化时则告诉订阅者是否要更新，若更新就会执行对应的更新函数从而更新视图。
```javascript
class Dep {
    // 构造器 设置subs用于接收订阅者
    constructor() {
        this.subs = []
    }
    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    // 删除订阅者
    removeSub(sub) {
        this.subs = this.subs.filter(item => item !== sub)
    }
    // 通知订阅者
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}

// 定义订阅者
class Watcher{
    update() {
        console.log('观察者更新了')
    }
}
const subject = new Dep()
const watcher = new Watcher()
subject.addSub(watcher)
subject.notify()
```