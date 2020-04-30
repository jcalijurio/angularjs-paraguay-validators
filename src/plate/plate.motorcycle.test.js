'use strict';

require('../directives');

describe('motorcycle-plate', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        const tests = [
            { value: '123ABCD', viewValue: '123-ABCD' },
        ];

        // Act / Assert
        const model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$valid).toBe(true);
            expect(model.$viewValue).toBe(test.viewValue);
        });
    });

    it('must ignore validity when the value size is less than 7', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        const tests = [
            { value: '123A', viewValue: '123-A' },
            { value: '123AB', viewValue: '123-AB' },
            { value: '123ABC', viewValue: '123-ABC' }
        ];

        // Act / Assert
        const model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$valid).toBe(true);
            expect(model.$viewValue).toBe(test.viewValue);
        });
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must accept formatted initial model values', function () {
        const newCarPlate = TestUtil.compile('<input type="text" ng-model="modelNewCar" motorcycle-plate >', {
            modelNewCar: '123-ABCD'
        });

        // Act
        const modelNewCar = newCarPlate.controller('ngModel');

        // Assert
        expect(modelNewCar.$viewValue).toBe('123-ABCD');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        var tests = [
            { value: '', viewValue: '' },
            { value: '1', viewValue: '1' },
            { value: '12', viewValue: '12' },
            { value: '123', viewValue: '123' },
            { value: '123A', viewValue: '123-A' },
            { value: '123AB', viewValue: '123-AB' },
            { value: '123ABC', viewValue: '123-ABC' },
            { value: '123ABCD', viewValue: '123-ABCD' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.value);
        });
    });

    it('must transform the lowercase to uppercase', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        var tests = [
            { value: '123-a', viewValue: '123-A', modelValue: '123A' },
            { value: '123aa', viewValue: '123-AA', modelValue: '123AA' },
            { value: '123aaa', viewValue: '123-AAA', modelValue: '123AAA' },
            { value: '123aaaa', viewValue: '123-AAAA', modelValue: '123AAAA' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.modelValue);
        });
    });

    it('must ignore incorrect typed order', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '1A', viewValue: '1', modelValue: '1' },
            { value: '1AB', viewValue: '1', modelValue: '1' },
            { value: '1AB2', viewValue: '1', modelValue: '1' },
            { value: '12AB3', viewValue: '12', modelValue: '12' },
            { value: '1234', viewValue: '123', modelValue: '123' },
            { value: '1234A', viewValue: '123', modelValue: '123' },
            { value: 'A1', viewValue: '1', modelValue: '1' },
            { value: 'A1B', viewValue: '1', modelValue: '1' },
            { value: 'A1B2', viewValue: '1', modelValue: '1' },
            { value: 'AB1C', viewValue: '1', modelValue: '1' },
            { value: '123A1', viewValue: '123-A', modelValue: '123A' },
            { value: '123A1A5', viewValue: '123-A', modelValue: '123A' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.modelValue);
        });
    });

    it('must ignore non alphanumerics', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" motorcycle-plate >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: '123A-', viewValue: '123-A', modelValue: '123A' },
            { value: '123AA|a', viewValue: '123-AAA', modelValue: '123AAA' },
            { value: '33@9sA', viewValue: '339-SA', modelValue: '339SA' },
            { value: '@9/5{2!A|A-A', viewValue: '952-AAA', modelValue: '952AAA' },
            { value: '/@(*#(@)!)0_)(*&¨%$##@!+-', viewValue: '0', modelValue: '0' },
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.modelValue);
        });
    });
});