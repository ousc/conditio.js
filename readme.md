## when-case

This is a simple syntactic sugar library that completely replaces switch/case, and has many new features, inspired by "
when" in Kotlin.

### Installation

```
npm install when-case --save
```

### Basic Usage

Used in modern frameworks(Vue, React, NG(soon)) and typescript

```typescript
    import {When, when, Case, Match, Is, In, InRange, Else} from 'when-case';
    let value: string = 'someValue';
    when(value,
        Case(value.length > 10, () => {
            console.log('hello world');
        }),
        Is('anotherValue', () => {
            console.log('this is another value')
        }),
        Else(()=>{
            // Do something
        })
    )
```

Basic usage, both "when" and "When" can be used.

```javascript
    const value = 2;
    let result = when(
        Case(value === 1, 1),
        Case(value < 1, ' < 1'),
        // You can pass in an arrow function, and take the return value as the result
        Case(value > 1, _=> 1 + value)
    )
    console.log(result);
```

console:

```
3
```

-----
Return nothing, you can just use like "if-else"

```javascript
    const value = 2;
    when(
        Case(value === 1, () => {
            console.log(' = 1')
        }),
        //You can also use the wording of then
        //when you use then continuously
        //you can get the return value of the pre 'then'
        Case(value < 1).then(() => {
            return ' < 1';
        }).then((value)=>{
            console.log(value)
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
        // Input start and end range
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
        // multiple values
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

"Is" usage, equivalent to Switch-Case syntax without penetration

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
"Match" regular matching
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
| Case    | Perform the operation if the condition is true |
| Is      | Perform the operation if it is equal to the incoming value |
| In      | Contains the incoming value to perform the operation |
| InRange | Perform operations within the upper and lower limits |
| Match   | The incoming value conforms to the regular operation |
| Else    | Actions that will be performed by default<br>When there are multiple Else, only the first one will be executed                  |
