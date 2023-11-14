# `conditio`
![logo](https://github.com/ousc/conditio/blob/master/97297e06b21f4e1c8936863bbd7d50aa_1015376780.png?raw=true)
`conditio` 是一个轻量级 JavaScript 库，它提供了一种简单而富有表现力的方法来编写带有返回值的条件表达式。 它允许您使用一组条件函数定义条件,并返回相应的结果。 该库提供了 If、Is、In、Matches、Between、BelongTo、Else、Not、NotIn、NotMatches、NotBetween 和 NotBelongTo 等函数来创建条件逻辑。 when 函数用于根据给定值有条件地执行函数。conditio写法简单，易于上手，且可以通过 npm 安装（2.1.7以前名为`when-case`）。

[English](./readme.md) | 简体中文

## 用法

### 安装
```shell
npm install conditio --save
```

### 引入
```javascript
import { when, If, Is, In, Matches, Between, BelongTo, IsNaN, Else, Not, NotIn, NotMatches, NotBetween, NotBelongTo } from 'conditio';
```

### 快速开始
```javascript
const foo = 'bar';
// 可以当作一个加强的switch case
const result = when(foo)(
    Is('bar', 'foo is bar'), 
    Is('baz', () => 'foo is baz'),
    Else('foo is neither bar nor baz')
);

//或者可以当作一个加强的if else多条件判断，when是带有返回值的表达式，且结构清晰

const a = 1;
const result = when(
    If(a > 1, 'a > 1'), //可以直接将返回值作为第二个参数
    If(a > 0, () => 'a > 0'), // 也可以传入函数，函数的返回值作为第二个参数
    () => 'a <= 0' // 你可以使用Else或者直接传入一个函数作为默认返回值，Else和函数完全等价，且可以省略
)

// `If` 表达式也可以单独使用，它可以用来作为一个带有返回值的条件表达式
const b = 5;
const result = If(b > 5)(() => {
    // You can do something before return.
    return 'b is greater than 5';
})
    .elseIf(b === 5)(() => 'b is equal to 5')
    .else(() => 'b is less than 5')
```

### Conditional Functions
- `If(condition, result | () => result)`: 本函数接受一个条件，如果条件为真，则返回一个结果或函数。或者，您可以将函数作为第二个参数传递。当第一个参数为真时，将调用此函数，并将其返回值用作结果。

- `Is(value, result | () => result)`: 本函数返回第二个参数，如果第一个参数严格等于给定值，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `In(arrayOrVararg, () => result)`: 本函数返回第二个参数，如果第一个参数包含在值数组中，则返回 undefined。或者，第二个参数应该是返回结果的函数。

- `Matches(regexp, result | () => result)`: 本函数返回第二个参数，如果第一个参数与给定的正则表达式匹配，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `Between(min, max, result | () => result)`: 本函数返回第二个参数，如果第一个参数在给定的最小值和最大值之间，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `BelongTo(type, result | () => result)`: 本函数返回第二个参数，如果第一个参数是给定类型的，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `Else(result | () => result)`: 本函数提供了一个默认结果，如果前面的条件都没有返回结果。如果提供了一个函数，它将被调用，并将其返回值用作最终结果。

- `Not(condition, result | () => result)`: 本函数返回第二个参数，如果第一个参数为假，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `NotIn(arrayOrVararg, () => result)`: 本函数返回第二个参数，如果第一个参数不包含在值数组中，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `NotMatches(regexp, result | () => result)`: 本函数返回第二个参数，如果第一个参数不匹配给定的正则表达式，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `NotBetween(min, max, result | () => result)`: 本函数返回第二个参数，如果第一个参数不在给定的最小值和最大值之间，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

- `NotBelongTo(type, result | () => result)`: 本函数返回第二个参数，如果第一个参数不是给定类型的，则返回 undefined。或者，第二个参数也可以是返回结果的函数。

### `when` 函数

`when`函数用于根据给定值有条件地执行函数。它是一个柯里化函数，这意味着它返回另一个函数，直到所有条件都链接在一起。

```javascript
const result = when(value)(
    If(condition, `result | () => result`),
    Is(value, `result | () => result`),
    In(arrayOrVararg, () => result),
    Matches(regexp, `result | () => result`),
    Between(min, max, `result | () => result`),
    BelongTo(type, `result | () => result`),
    Not(condition, `result | () => result`),
    NotIn(arrayOrVararg, () => result),
    NotMatches(regexp, `result | () => result`),
    NotBetween(min, max, `result | () => result`),
    NotBelongTo(type, `result | () => result`),
    Else(`result | () => result`), 
    // 或者你可以使用一个函数作为默认返回值，`Else`和函数完全等价，且可以省略
    () => result // 默认返回值
);
```

`when`函数的第一个参数是要测试的值。`If`、`Is`、`In`、`Matches`、`Between`和`BelongTo`函数将根据条件或一组条件测试给定的值，并执行相应的结果函数（或返回结果值）。

`Else`函数作为默认的回退提供，如果前面的条件都没有返回结果，它将被执行。

`Not`、`NotIn`、`NotMatches`、`NotBetween`和`NotBelongTo`函数和上面提到的对应函数相反。

## Example

```javascript
const a = 1;
const result = when(a)(
    If(a > 1, () => 'a > 1'),
    If(a > 0, () => 'a > 0'),
    In(-1, -2, -3, () => 'a in -1/-2/-3'), // 传入变量参数
    In([-4, -5, -6], 'a in -4/-5/-6'), // 传入函数
    Else(() => {
        console.log(123);
        return 'a <= 0';
    })
);
console.log(result); // 输出: 'a > 0'
```


在这个例子中，我们首先将`a`的值定义为`1`，然后使用`when`函数来检查它是否满足给定的条件。`when`函数将返回一个函数，该函数接受多个条件并根据条件是真还是假返回相应的值。

在上面的例子中，我们检查`a`是否大于`1`，是否大于`0`，是否包含在数组`[-1, -2, -3]`中，是否包含在数组`[-4]`中，最后使用`Else`函数作为默认结果，如果没有满足前面的条件。

由于条件`a > 1`不满足，函数将继续执行下一个条件`a > 0`。这个条件是真的，所以它对应的函数被执行并返回值`'a > 0'`。因此，`result`的最终值是`'a > 0'`。

您可以将多个条件链接在一起以创建更复杂的条件逻辑。