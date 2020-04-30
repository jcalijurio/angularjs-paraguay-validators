'use strict';

require('../directives');

describe('py-new-car-plate', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        const tests = [
            { value: 'ABCD123', viewValue: 'ABCD-123' },
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
        const input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        const tests = [
            { value: 'ABCD', viewValue: 'ABCD' },
            { value: 'ABCD1', viewValue: 'ABCD-1' },
            { value: 'ABCD12', viewValue: 'ABCD-12' }
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

        const maskedInput = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must accept formatted initial model values', function () {
        const newCarPlate = TestUtil.compile('<input type="text" ng-model="modelNewCar" py-new-car-plate >', {
            modelNewCar: 'ABCD-123'
        });

        // Act
        const modelNewCar = newCarPlate.controller('ngModel');

        // Assert
        expect(modelNewCar.$viewValue).toBe('ABCD-123');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'A', viewValue: 'A', modelValue: 'A' },
            { value: 'AA', viewValue: 'AA', modelValue: 'AA' },
            { value: 'AAA', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'AAAA', viewValue: 'AAAA', modelValue: 'AAAA' },
            { value: 'AAAA1', viewValue: 'AAAA-1', modelValue: 'AAAA1' },
            { value: 'AAAA12', viewValue: 'AAAA-12', modelValue: 'AAAA12' },
            { value: 'AAAA123', viewValue: 'AAAA-123', modelValue: 'AAAA123' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'a', viewValue: 'A', modelValue: 'A' },
            { value: 'aa', viewValue: 'AA', modelValue: 'AA' },
            { value: 'aaa', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'aaaa1', viewValue: 'AAAA-1', modelValue: 'AAAA1' },
            { value: 'aaaa12', viewValue: 'AAAA-12', modelValue: 'AAAA12' },
            { value: 'aaaa123', viewValue: 'AAAA-123', modelValue: 'AAAA123' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '1A', viewValue: 'A', modelValue: 'A' },
            { value: '1AB', viewValue: 'AB', modelValue: 'AB' },
            { value: '1AB2', viewValue: 'AB', modelValue: 'AB' },
            { value: '12AB3', viewValue: 'AB', modelValue: 'AB' },
            { value: '1234', viewValue: '', modelValue: '' },
            { value: '1234A', viewValue: 'A', modelValue: 'A' },
            { value: 'A1', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B2', viewValue: 'A', modelValue: 'A' },
            { value: 'AB1C', viewValue: 'AB', modelValue: 'AB' },
            { value: 'ABCDE', viewValue: 'ABCD', modelValue: 'ABCD' },
            { value: 'ABCDE1', viewValue: 'ABCD', modelValue: 'ABCD' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" py-new-car-plate >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: 'A-', viewValue: 'A', modelValue: 'A' },
            { value: 'AA|a', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'AA_AA33', viewValue: 'AAAA-33', modelValue: 'AAAA33' },
            { value: 'A|A-A@9/5{2!', viewValue: 'AAA', modelValue: 'AAA' },
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