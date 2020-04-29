'use strict';

require('../directives');

describe('company-ruc', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >', {
            model: '223344559'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
    });

    it('must be invalid when the value is invalid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >', {
            model: '123456789'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(false);
    });

    it('must ignore validity when the value size is less than 9', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >', {
            model: '12345678'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must format initial model values', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >', {
            model: '223344559'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$viewValue).toBe('22.334.455-9');
    });

    it('must accept formatted initial model values', function () {
        var input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >', {
            model: '22.334.455-9'
        });

        // Act
        var model = input.controller('ngModel');

        // Assert
        expect(model.$viewValue).toBe('22.334.455-9');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '2', viewValue: '2', modelValue: '2' },
            { value: '22', viewValue: '22', modelValue: '22' },
            { value: '2233', viewValue: '22.33', modelValue: '2233' },
            { value: '22334', viewValue: '22.334', modelValue: '22334' },
            { value: '223344', viewValue: '22.334.4', modelValue: '223344' },
            { value: '2233445', viewValue: '22.334.45', modelValue: '2233445' },
            { value: '22334455', viewValue: '22.334.455', modelValue: '22334455' },
            { value: '223344559', viewValue: '22.334.455-9', modelValue: '223344559' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$viewValue).toBe(test.viewValue);
            expect(model.$modelValue).toBe(test.modelValue);
        });
    });

    it('must ignore non digits', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" company-ruc >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: '2-', viewValue: '2', modelValue: '2' },
            { value: '22a', viewValue: '22', modelValue: '22' },
            { value: '22_33', viewValue: '22.33', modelValue: '2233' },
            { value: '22334!', viewValue: '22.334', modelValue: '22334' },
            { value: '22@33A4z4!55-9', viewValue: '22.334.455-9', modelValue: '223344559' },
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