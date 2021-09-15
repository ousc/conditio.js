## Case.js

This is a simple syntactic sugar library that completely replaces switch/case, and has many new features, inspired by "
when" in Kotlin.

### Installation

```
npm install case.js --save
```
### Basic Usage
Both "when" and "when" can be used.
```javascript
    let value = 4, another_value = 4;
    When(value,
        Is(1, () => {
            console.log('case 1!');
        }),
        Is(2).then(() => {
            console.log('case 2!');
        }),
        Is(3, () => {
            console.log('case 3!');
        }),
        In(4, 5, 6, () => {
            console.log('in [4, 5, 6]');
        }),
        In(...[7, 8, 9], () => {
            console.log('in [7, 8, 9]');
        }),
        InRange(10, 100, () => {
            console.log('in [7, 8, 9]');
        }),
        Case(value + another_value === 5, () => {
            console.log('a + b = 5');
        }),
        Default(() => {
            console.log('a is not in 1~100!');
        })
    )
```
console:
> in [4, 5, 6]

And you can just use like "if-else"
 ```javascript
    when(
        Case(value === 2 && another_value === 2, () => {
            console.log('a = 2 and b = 2')
        }).then(()=>{
            console.log('so a = b')
        }),
        Case(value === 1, () => {
            console.log('a = 1!')
        }),
        Case(value >= 2 && value <= 3, () => {
            console.log('2 <= a <= 3!')
        }),
        Case(value > 3, () => {
            console.log('a > 3!')
        }),
        Default(() => {
            console.log('a should >= 1!')
        })
    )
```
console:
> a > 3!
---------
|  Name   | description  |
|  ----  | ----  |
| Case  | When the event in Case is true, the statement in Case will be executed, and the expression in then will be executed in turn |
| Is  | If the value is equal to the condition, the statement after the condition is executed |
| In  | If one of multiple conditions is met, the statement after the condition will be executed |
| InRange  | If the condition is satisfied in the Range range, the statement after the condition will be executed |
| Match  | If the condition satisfies the regular expression, the statement after the condition will be executed |
| Default  | Statements that will be executed by default |

