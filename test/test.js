const {expect} = require('chai');
const {when, When, Case, Else, Is, In, InRange, Match} = require("../dist");

describe('测试基本的Case用法', () => {
    it('Case满足条件即可被执行', () => {
        const value = 2;
        expect(
            when(value, Case(value > 1, 2))
        ).to.be.equal(2);
    });

    it('Case若满足多条件，第一个可被执行', () => {
        const value = 2;
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

    it('不返回值时表现正确', () => {
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
        )
    })

    it('Else能够正确表现', () => {
        const value = 2;
        expect(
            when(
                Case(value === 1, '=1'),
                Case(value < 1, '<1'),
                Else('>1')
            )
        ).to.be.equal('>1');
    })

    it('IS能够正确表现', () => {
        const letter = 'T';
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

    it('IN能够正确表现', () => {
        const letter = 'T';
        expect(
            when(letter,
                In('A', 'B', 'C', 'D', 'E', 'letter in group1'),
                In(...['F', 'G', 'H', 'I', 'J', 'K', 'L'], 'letter in group2'),
                In('M', 'N', 'O', 'P', 'Q', 'R', 'S', 'letter in group3'),
                In('T', 'U', 'V', 'W', 'X', 'Y', 'letter in group4'),
                Is('Z', 'letter in group4'),
            )
        ).to.be.equal('letter in group4');
    })

    it('InRange能够正确表现', () => {
        const number = 87;
        expect(
            when(number,
                InRange(1, 20, 'number in 1..20'),
                InRange(21, 40, 'number in 21..40'),
                InRange(41, 60, 'number in 41..60'),
                InRange(61, 80, 'number in 61..80'),
                InRange(81, 100, 'number in 81..100').then(res => {
                    console.log(res);
                }),
            )
        ).to.be.equal('number in 81..100');
    })

    it('Match能够正确表现', () => {
        const email = 'test@email.com';
        expect(
            when(email,
                Match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, "phone number regexp"),
                Match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "email regexp"),
                Match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/, "password regexp"),
            )
        ).to.be.equal('email regexp');
    })

    it('测试then以及then的传值是否可以正常使用', () => {
        const number = 72;
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
            InRange(81, 100, 'number in 81..100')
        )
    })

    it('When是否可以执行', () => {
        const value = 2;
        expect(
            When(value, Case(value > 1, 2))
        ).to.be.equal(2);
    });

    it('没有符合条件的结果时，返回undefinded', () => {
        const value = 2;
        expect(
            When(value, Case(value < 1, 2))
        ).to.be.equal(undefined);
    })

    it('Else返回Object类型值', () => {
        let data = {
            "data": 'someValue'
        }
        expect(
            When(
                Else(data)
            )
        ).to.be.equal(data);
    })


});
