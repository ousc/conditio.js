## when-case

This is a simple syntactic sugar library that completely replaces switch/case, and has many new features, inspired by "
when" in Kotlin.

### Installation

```
npm install when-case --save
```

### Basic Usage

Use in Vue

```typescript
    import {When, when, Case, Match, Is, In, InRange, Else} from 'when-case';
    when(
        Case(1 == 1, ()=>{
            console.log('hello world');
        })
    )
```

Both "when" and "when" can be used.

```javascript
    const value = 2;
    let result = when(
        Case(value === 1, '=1'),
        Case(value < 1, '<1'),
        Case(value > 1, '>1'),
        Case(value >= 2 && value < 3, '2 <= value < 3')
    )
    console.log(result);
```

console:

```
2 <= value < 3
```

-----
Return nothing, you can just use like "if-else"

```javascript
    const value = 2;
    when(
        Case(value === 1, () => {
            console.log(' = 1')
        }),
        Case(value < 1, () => {
            console.log(' < 1')
        }),
        Case(value > 1, () => {
            console.log(' > 1')
        }),
        Else(()=>{
            console.log('error!')
        })
    )
```

console:

```
> 1
```

------

Usage for "In" and "InRange"
 ```javascript
    const number = 72;
    const arr = [159, 160, 161];
    when(number,
        InRange(1, 20, 'number in 1..20'),
        InRange(21, 40, 'number in 21..40'),
        InRange(41, 60, 'number in 41..60'),
        InRange(61, 80, 'number in 61..80')
            .then((res) => {
                console.log(res);
                return when(number,
                    InRange(61, 70, "number in 61..70"),
                    InRange(71, 80, "number in 71..80"),
                );
            })
            .then((res) => {
                console.log(res)
            }),
        InRange(81, 100, 'number in 81..100'),
        In(101, 102, 105, 'number in 101..102 or 105'),
        In(...arr, 'number in arr'),
    )
 ```

console:

```
number in 61..80
number in 71..80
```

----

"Is" expression：

```javascript
    const letter = 'T';
    console.log(
        when(letter,
            Is('A', 'letter is A'),
            Is('F', 'letter is F'),
            Is('M', 'letter is M'),
            Is('T', 'letter is T'),
            Is('Z', 'letter is Z'),
            Else('letter is ?')
        )
    )
```

console:

```
letter is T
```

---------
'Match' expression
```javascript
    when(email,
        Match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).then(()=>{
            console.log("match phone number regexp");
        }),
        Match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).then(()=>{
            console.log("match email regexp");
        }),
        Match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/).then(()=>{
            console.log("match password regexp");
        }),
    )
```
console:

```
match email regexp
```
---------

| Name    | description                                                  |
| ------- | ------------------------------------------------------------ |
| Case    | When the event in Case is true, the statement in Case will be executed, and the expression in then will be executed in turn |
| Is      | If the value is equal to the condition, the statement after the condition is executed |
| In      | If one of multiple conditions is met, the statement after the condition will be executed |
| InRange | If the condition is satisfied in the Range range, the statement after the condition will be executed |
| Match   | If the condition satisfies the regular expression, the statement after the condition will be executed |
| Else    | Statements that will be executed by default                  |