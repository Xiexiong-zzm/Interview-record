// 元组类型 Tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x:[string,number];
x = ['aa',1]
// x = [1,'aaa'] 类型检查报错

// 枚举 enum
enum TestEnum {
  age=10,
  name='aaa'
}

let test:TestEnum = TestEnum.age
console.log(test); //  10

// 没给具体值 会自行推断给默认值 下标索引从0开始 赋值之后的枚举值会从给值的地方推断
enum Color {
  Red,
  Green,
  Blue
}

const color = Color.Red
console.log(color); //  0

enum Color2 {
  Red,
  Green=2,
  Blue
}
const color2 = Color.Blue
console.log(color2); //  3


