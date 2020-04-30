'use strict';

require('../directives');

describe('old-plate', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >', {
            model: 'AAA123'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
        expect(model.$viewValue).toBe('AAA-123');
    });

    it('must ignore validity when the value size is less than 6', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >', {
            model: 'AAA12'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
        expect(model.$viewValue).toBe('AAA-12');
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must accept formatted initial model values', () => {
        var input = TestUtil.compile('<input type="tel" ng-model="model" old-car-plate >', {
            model: 'AAA-123'
        });

        // Act
        var model = input.controller('ngModel');

        // Assert
        expect(model.$viewValue).toBe('AAA-123');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'A', viewValue: 'A', modelValue: 'A' },
            { value: 'AA', viewValue: 'AA', modelValue: 'AA' },
            { value: 'AAA', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'AAA1', viewValue: 'AAA-1', modelValue: 'AAA1' },
            { value: 'AAA12', viewValue: 'AAA-12', modelValue: 'AAA12' },
            { value: 'AAA123', viewValue: 'AAA-123', modelValue: 'AAA123' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.modelValue);
        });
    });

    it('must transform the lowercase to uppercase', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'a', viewValue: 'A', modelValue: 'A' },
            { value: 'aa', viewValue: 'AA', modelValue: 'AA' },
            { value: 'aaa', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'aaa1', viewValue: 'AAA-1', modelValue: 'AAA1' },
            { value: 'aaa12', viewValue: 'AAA-12', modelValue: 'AAA12' },
            { value: 'aaa123', viewValue: 'AAA-123', modelValue: 'AAA123' },
            { value: 'aBa987', viewValue: 'ABA-987', modelValue: 'ABA987' },
            { value: 'abC123', viewValue: 'ABC-123', modelValue: 'ABC123' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '1', viewValue: '', modelValue: '' },
            { value: '11', viewValue: '', modelValue: '' },
            { value: '111', viewValue: '', modelValue: '' },
            { value: '111aaa', viewValue: 'AAA', modelValue: 'AAA' },
            { value: '111aaa123', viewValue: 'AAA-123', modelValue: 'AAA123' },
            { value: 'abcd123', viewValue: 'ABC', modelValue: 'ABC' },
            { value: 'A1', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B2', viewValue: 'A', modelValue: 'A' },
            { value: 'AB1C', viewValue: 'AB', modelValue: 'AB' },
            { value: 'ABCD', viewValue: 'ABC', modelValue: 'ABC' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" old-car-plate >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: 'A-', viewValue: 'A', modelValue: 'A' },
            { value: 'AA|a', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'AA_A33', viewValue: 'AAA-33', modelValue: 'AAA33' },
            { value: 'A|A-A@9/5{2!', viewValue: 'AAA-952', modelValue: 'AAA952' },
            { value: '/@(*#(@)!)a_)(*&¨%$##@!+-', viewValue: 'A', modelValue: 'A' },
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