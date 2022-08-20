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
