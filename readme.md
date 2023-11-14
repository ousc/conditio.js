# `conditio`
`conditio` is a lightweight JavaScript library that provides a simple and expressive way to write conditional expressions with return values. It allows you to define conditions and corresponding results using a set of conditional functions. The library offers functions such as If, Is, In, Matches, Between, BelongTo, Else, Not, NotIn, NotMatches, NotBetween, and NotBelongTo to create conditional logic. The when function is used to conditionally execute functions based on a given value. The library is easy to use and can be installed via npm.

## Usage

### Installation
```shell
npm install conditio --save
```

### Import
```javascript
import { when, If, Is, In, Matches, Between, BelongTo, IsNaN, Else, Not, NotIn, NotMatches, NotBetween, NotBelongTo } from 'conditio';
```

### Quick Start
```javascript
const foo = 'bar';
const result = when(foo)(
    Is('bar', 'foo is bar'), 
    Is('baz', () => 'foo is baz'),
    Else('foo is neither bar nor baz')
);

//or

const a = 1;
const result = when(
    If(a > 1, 'a > 1'), 
    If(a > 0, () => 'a > 0'), // use arrow function, do something and return a result
    () => 'a <= 0' // default result
)

// `If` statement can be used alone as well, it can be used to be a conditional expression with return value
const b = 5;
const result = If(b > 5)(() => {
    // You can do something before return.
    return 'b is greater than 5';
})
    .elseIf(b === 5)(() => 'b is equal to 5')
    .else(() => 'b is less than 5')
```

### Conditional Functions
- `If(condition, result | () => result)`: This function takes a condition and returns a result or function if the condition is true. Alternatively, you can pass a function as the second argument. When the first parameter is true, this function will be called and its return value will be used as the result.

- `Is(value, result | () => result)`: This function returns the second parameter if the first parameter is strictly equal to the given value, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `In(arrayOrVararg, () => result)`: This function returns the second parameter if the first parameter is included in the values array, otherwise returns undefined. Alternatively, the second parameter should be a function that returns the result.

- `Matches(regexp, result | () => result)`: This function returns the second parameter if the first parameter matches the given regular expression, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `Between(min, max, result | () => result)`: This function returns the second parameter if the first parameter is between the given min and max, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `BelongTo(type, result | () => result)`: This function returns the second parameter if the first parameter is of the given type, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `Else(result | () => result)`: This function provides a default result if none of the previous conditions returned a result. If a function is provided, it will be called and its return value will be used as the final result.

- `Not(condition, result | () => result)`: This function returns the second parameter if the first parameter is false, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `NotIn(arrayOrVararg, () => result)`: This function returns the second parameter if the first parameter is not included in the values array, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `NotMatches(regexp, result | () => result)`: This function returns the second parameter if the first parameter does not match the given regular expression, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `NotBetween(min, max, result | () => result)`: This function returns the second parameter if the first parameter is not between the given min and max, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

- `NotBelongTo(type, result | () => result)`: This function returns the second parameter if the first parameter is not of the given type, otherwise returns undefined. Alternatively, the second parameter can also be a function that returns the result.

### `when` Function

The `when` function is used to conditionally execute functions based on a given value. It is a curried function, which means it returns another function until all conditions are chained together.


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
    // or you can use a function as the default result, `Else` and function are completely equivalent, and they can be omitted
    () => result // do something and return a result 
);
```

The first parameter of the `when` function is the value to be tested. `If`, `Is`, `In`, `Matches`, `Between` and `BelongTo` functions will test the given value against a condition or set of conditions and execute the corresponding result function (or return the result value if one is provided).

`Else` function is provided as the default fallback and will be executed if none of the previous conditions return a result.

`Not`, `NotIn`, `NotMatches`, `NotBetween` and `NotBelongTo` functions provide a way to execute a condition based on the opposite of a condition.

## Example

```javascript
const a = 1;
const result = when(a)(
    If(a > 1, () => 'a > 1'),
    If(a > 0, () => 'a > 0'),
    In(-1, -2, -3, () => 'a in -1/-2/-3'), // use varaible arguments
    In([-4, -5, -6], 'a in -4/-5/-6'), // use array
    Else(() => {
        console.log(123);
        return 'a <= 0';
    })
);
console.log(result); // output: 'a > 0'
```

In this example, we first define the value of `a` as `1`, and then use the `when` function to check whether it satisfies the given conditions. The `when` function will return a function that takes in multiple conditions and returns the corresponding values based on whether the conditions are true or false.

In the above example, we check if `a` is greater than `1`, if it is greater than `0`, if it is included in the array `[-1, -2, -3]`, if it is included in the array `[-4]`, and finally use the `Else` function as the default result if none of the previous conditions are met.

Since the condition `a > 1` is not satisfied, the function moves on to the next condition `a > 0`. This condition is true, so its corresponding function is executed and returns the value `'a > 0'`. Therefore, the final value of `result` is `'a > 0'`.

You can chain multiple conditions together in this way to create more complex conditional logic.