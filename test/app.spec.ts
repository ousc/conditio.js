import {describe, it} from "mocha";
import {expect} from "chai";
import {
    when,
    When,
    Case,
    Else,
    Is,
    In,
    NotIn,
    InRange,
    NotInRange,
    Match,
    NotMatch,
    Not,
    IsNull,
    IsUndefined,
    IsNaN,
    BelongTo
} from '../dist';

describe('test basic usage for When-Case', () => {
    it('Case will be executed if the conditions are met', () => {
        const value = 2;
        expect(
            when(value, Case(value > 1, 2))
        ).to.be.equal(2);
    });

    it('If case satisfies multiple conditions, the first one can be executed', () => {
        const value: number = 2;

        expect(
            when(
                Case(value === 1, '=1'),
                Case(value < 1, '<1'),
                Case(value > 1, '>1'),
                Case(value >= 2, '>=2')
            )
        ).to.be.equal('>1');

        expect(
            when(
                Case(value === 1, '=1'),
                Case(value < 1, '<1'),
                Case(value >= 2, '>=2'),
                Case(value > 1, '>1')
            )
        ).to.be.equal('>=2');
    });

    it('Performs correctly when no value is returned', () => {
        const value: number = 2;
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
        )
    })

    it('Else can behave correctly', () => {
        const value: number = 2;
        expect(
            when(
                Case(value === 1, '=1'),
                Case(value < 1, '<1'),
                Else('>1')
            )
        ).to.be.equal('>1');
    })

    it('Is can perform correctly', () => {
        const letter: string = 'T';
        expect(
            when(letter,
                Is('A', 'letter is A'),
                Is('F', 'letter is F'),
                Is('M', 'letter is M'),
                Is('T', 'letter is T'),
                Is('Z', 'letter is Z'),
            )
        ).to.be.equal('letter is T');
    })

    it('In can perform correctly', () => {
        const letter: string = 'T';
        expect(
            when(letter,
                In('A', 'B', 'C', 'D', 'E', 'letter in group1'),
                In(...['F', 'G', 'H', 'I', 'J', 'K', 'L'], 'letter in group2'),
                In('M', 'N', 'O', 'P', 'Q', 'R', 'S', 'letter in group3'),
                In('T', 'U', 'V', 'W', 'X', 'Y', 'letter in group4'),
                Is('Z', 'letter in group5'),
            )
        ).to.be.equal('letter in group4');
    })

    it('NotIn can perform correctly', () => {
        const letter: string = 'T';
        expect(
            when(letter,
                NotIn('A', 'B', 'C', 'D', 'E', 'letter not in ABCDE'),
                Else('letter in ABCDE'),
            )
        ).to.be.equal('letter not in ABCDE');
    })


    it('InRange can perform correctly', () => {
        const number: number = 87;
        expect(
            when(number,
                InRange(1, 20, 'number in 1..20'),
                InRange(21, 40, 'number in 21..40'),
                InRange(41, 60, 'number in 41..60'),
                InRange(61, 80, 'number in 61..80'),
                InRange(81, 100, 'number in 81..100').then((res: number) => {
                    console.log(res);
                    return res;
                }),
            )
        ).to.be.equal('number in 81..100');
    })

    it('NotInRange can perform correctly', () => {
        const number: number = 13;
        expect(
            when(number,
                NotInRange(12, 15, 'number not in 12~15'),
                Else('number in 12~15'),
            )
        ).to.be.equal('number in 12~15');
    })

    it('Match can perform correctly', () => {
        const email: string = 'test@email.com';
        expect(
            when(email,
                Match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, "phone number regexp"),
                Match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "email regexp"),
                Match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/, "password regexp"),
            )
        ).to.be.equal('email regexp');
    })

    it('NotMatch can perform correctly', () => {
        const email: string = 'test@email.com';
        expect(
            when(email,
                NotMatch(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, 'bad email!'),
                Else('ok'),
            )
        ).to.be.equal('ok');
    })

    it('Test whether then and the value passed by then can be used normally', () => {
        const number: number = 72;
        when(number,
            InRange(1, 20, 'number in 1..20'),
            InRange(21, 40, 'number in 21..40'),
            InRange(41, 60, 'number in 41..60'),
            InRange(61, 80, 'number in 61..80')
                .then((res: number) => {
                    console.log(res);
                    return when(number,
                        InRange(61, 70, "number in 61..70"),
                        InRange(71, 80, "number in 71..80"),
                    );
                })
                .then((res: number) => {
                    console.log(res)
                }),
            InRange(81, 100, 'number in 81..100')
        )
    })

    it('When can be execute', () => {
        const value: number = 2;
        expect(
            When(value, Case(value > 1, 2))
        ).to.be.equal(2);
    });

    it('Undefined is returned when there is no qualified result', () => {
        const value = 2;
        expect(
            When(value, Case(value < 1, 2))
        ).to.be.equal(undefined);
    })

    it('When have returns，return the last value', () => {
        const value: number = 2;
        expect(
            When(value, Case(value === 2, 2).then((_: any) => 3).then((_: any) => 4))
        ).to.be.equal(4);
    })

    it('Else returns the value of "Object" type', () => {
        let data: any = {
            "data": 'someValue'
        }
        expect(
            When(
                Else(data)
            )
        ).to.be.equal(data);
    })


    it('Belongto can be used normally to judge the category', () => {
        expect(
            When(1,
                BelongTo("number", '123'),
                BelongTo("boolean", '456'),
            )
        ).to.be.equal('123');
    })


    it('Test whether IsNull can be used', () => {
        expect(
            When(null,
                IsNull('123'),
                Else('456')
            )
        ).to.be.equal('123');
    })


    it('test IsUndefined', () => {
        expect(
            when(undefined,
                IsUndefined('123')
            )
        ).to.be.equal('123');
    })


    it('test Not', () => {
        expect(
            when(1,
                Not(2, '456'),
                Else('123')
            )
        ).to.be.equal('456');
    })


    it('test IsNaN', () => {
        expect(
            when(NaN,
                IsNaN('456'),
                Else('123')
            )
        ).to.be.equal('456');
    })


    it('Test type function', () => {
        expect(
            when(1,
                Is(1, () => {
                    return 123
                }))
        ).to.be.equal(123)
    })

    it('Test return value with function expression ', () => {
        const arr: string[] = ['one', 'two', 'three'];
        expect(
            when(1,
                Is(1, arr.filter((item, index, _) => index >= 0 && item.includes('o'))),
                Is(2, arr.filter((item, index, _) => index >= 1 && item.includes('o'))),
                Is(3, arr.filter((item, index, _) => index >= 2 && item.includes('o'))),
                Is(4, arr.filter((item, index, _) => index >= 3 && item.includes('o'))),
            ).join(",")
        ).to.be.equal("one,two")
    })

    it('Test async', async () => {

        function asyncFun() {
            return new Promise((resolve, _) => {
                setTimeout(() => {
                    resolve(['one', 'two', 'three']);
                });
            });
        }

        const data: string[] = await asyncFun() as string[];

        const type = "A"

        const arr = when(type,
            Is("A", [...data].filter((item, index, self) => self.indexOf(item) === index && !!item && index >= 0 && item.includes('o'))),
        )

        expect(arr.join(" ")).to.be.equal(['one', 'two'].join(" "));
    })
});

