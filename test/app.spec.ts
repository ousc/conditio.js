import {expect} from "chai";

import {
    when,
    Condition,
    If,
    Is,
    Not,
    In,
    NotIn,
    Matches,
    NotMatches,
    BelongTo,
    NotBelongTo,
    IsNaN,
    Between,
    NotBetween,
    Else
} from '../src'

describe('Conditions', () => {
    describe('when', () => {
        it('should return correct result using Equals', () => {
            const value = 5;
            const result = when(value)(
                Is(5, 'equal'),
                Else('not equal')
            );
            expect(result).to.equal('equal');
        });

        it('should return correct result using Not', () => {
            const value = 5;
            const result = when(value)(
                Not(5, 'not equal'),
                Else('equal')
            );
            expect(result).to.equal('equal');
        });

        it('should return correct result using In', () => {
            const value = 1;
            const result = when(value)(
                In(1, 2, 3, () => 'in'),
                Else('not in')
            );
            expect(result).to.equal('in');
        });

        it('should return correct result using NotIn', () => {
            const value = 4;
            const result = when(value)(
                NotIn(1, 2, 3, () => 'not in'),
                Else('in')
            );
            expect(result).to.equal('not in');
        });

        it('should return correct result using Matches', () => {
            const value = 'abc';
            const result = when(value)(
                Matches(/^ab/, 'match'),
                Else('not match')
            );
            expect(result).to.equal('match');
        });

        it('should return correct result using NotMatches', () => {
            const value = 'abc';
            const result = when(value)(
                NotMatches(/^abd/, 'not match'),
                Else('match')
            );
            expect(result).to.equal('not match');
        });

        it('should return correct result using BelongTo', () => {
            const value = 5;
            const result = when(value)(
                BelongTo('number', 'belong to'),
                Else('not belong to')
            );
            expect(result).to.equal('belong to');
        });

        it('should return correct result using NotBelongTo', () => {
            const value = Symbol();
            const result = when(value)(
                NotBelongTo('symbol', 'not belong to'),
                Else('belong to')
            );
            expect(result).to.equal('belong to');
        });

        it('should return correct result using IsNaN', () => {
            const value = parseInt('nan');
            const result = when(value)(
                IsNaN('is NaN'),
                Else('not a NaN')
            );
            expect(result).to.equal('is NaN');
        });

        it('should return correct result using Between', () => {
            const value = 5;
            const result = when(value)(
                Between(1, 10, 'between'),
                Else('not between')
            );
            expect(result).to.equal('between');
        });

        it('should return correct result using NotBetween', () => {
            const value = 20;
            const result = when(value)(
                NotBetween(1, 10, 'not between'),
                Else('between')
            );
            expect(result).to.equal('not between');
        });

        it('should return correct result using Else as default', () => {
            const value = 'hello';
            const result = when(value)(
                Is('world', 'not matched')
            );
            expect(result).to.equal(undefined);
        });

        it('should directly execute the condition when no value is provided', () => {
            const a = 1;
            const result = when(
                If(a > 1, 'a > 1'),
                Else('a <= 1')
            );
            expect(result).to.equal('a <= 1');
        });

        it('If should return correct result when using alone', () => {
            const a = 1;
            const result = If(a > 1, 'a > 1').else('a <= 1');
            expect(result).to.equal('a <= 1');
        });
    });

    describe('Condition', () => {
        it('should return correct result for a simple condition using Equals', () => {
            const condition = new Condition((value: number | undefined) => value != undefined && value === 5, 'equal');
            const result = when(5)(condition);
            expect(result).to.equal('equal');
        });

        it('should return correct result for a more complex condition using In', () => {
            const condition = new Condition((value: number | undefined) => value != undefined && [1, 2, 3].includes(value), 'in');
            const result = when(1)(condition);
            expect(result).to.equal('in');
        });

        it('should return correct result for a dynamic result using a function', () => {
            const condition = new Condition((value: string | undefined) => value === 'abc', () => 'matched');
            const result = when('abc')(condition);
            expect(result).to.equal('matched');
        });
    });
});