// 元组类型 Tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
var x;
x = ['aa', 1];
// x = [1,'aaa'] 类型检查报错
// 枚举 enum
var TestEnum;
(function (TestEnum) {
    TestEnum[TestEnum["age"] = 10] = "age";
    TestEnum["name"] = "aaa";
})(TestEnum || (TestEnum = {}));
var test = TestEnum.age;
console.log(test);
