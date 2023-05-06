type p = Promise<'test'>;
// 提取value的类型
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;

// 解释通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，
// 通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。
type GetValueResult = GetValueType<p>


/**
 * Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，
 * 结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。
 */

// 数组类型中使用
type arr = [1,2,3]
let a:arr = [1,2,3]

/**
 * any 和 unknown 的区别： any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，
 * 也可以赋值给任意类型（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。
 */
// 提取第一个
type GetFirst<Arr extends unknown[]> = Arr extends [infer First,...unknown[]] ? First : never;

type GetFirstResult = GetFirst<arr>

let b:GetFirstResult = 1

// 提取最后一个
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[],infer Last] ? Last : never;
type GetLastResult = GetLast<arr>
let c:GetLastResult = 3

// 取剩余的元素
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest,unknown] ? Rest : never;
type PopArrResult = PopArr<arr>

type ShiftArr<Arr extends unknown[]> = Arr extends [unknown,...infer Rest] ? Rest : never;
type ShiftArrResult = ShiftArr<arr>

// 字符串类型
// 判断字符串是否以某个前缀开头，也是通过模式匹配
type StartWith<Str extends string,Prefix extends string> = Str extends `${Prefix}${string}` ? true : false

type StartWithRes = StartWith<'guang dong','guang'>

// 匹配后重新构成新的类型 To 是匹配后替换的
type ReplaceStr < Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;

type ReplaceStrRes = ReplaceStr<'guang dongliang zai','dongliang','duang'>

// Trim
// trim right
type TrimStrRight <Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str;

type TrimStrRes = TrimStrRight<'guang        '>

// trim left
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str;

type TrimLeftResult = TrimStrLeft<'      dong'>;

// trim
type TrimStr<Str extends string> =TrimStrRight<TrimStrLeft<Str>>;


type TrimResult = TrimStr<'      dong   '>;

// 函数
// GetParameters 参数类型提取
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args:never

type ParametersRes = GetParameters<(name:string,age:number) => string>

// GetReturnType 返回值类型提取
type GetReturnType<Func extends Function> = Func extends (...args:any[]) => infer ReturnType ? ReturnType:never
type ReturnTypeRes = GetReturnType<() => 'aaa'>

class Dog {
  name:string;
  constructor(){
    this.name= 'dog'
  }

  hello(this:Dog){
    return 'hello, I\'m ' + this.name;
  }
}
const dog = new Dog()
dog.hello()


// 构造器
interface Person {
  name: string
}

interface PersonConstructor {
  new (name:string) : Person
}

type GetInstanceType<ConstructorType extends new (...args:any[]) => any> = ConstructorType extends new (...args:any[]) => infer InstanceType ? InstanceType :any
type GetInstanceTypeRes = GetInstanceType<PersonConstructor>
