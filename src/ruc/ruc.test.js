'use strict';

require('../directives');

describe('ruc', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            '54932874',
            '223344559'
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test).triggerHandler('input');
            expect(model.$valid).toBe(true);
        });
    });

    it('must be invalid when the value is invalid', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            '12345678',
            '22222222',
            '123456789',
            '111111111',
            '223344550'
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test).triggerHandler('input');
            expect(model.$valid).toBe(false);
        });
    });

    it('must ignore validity when the value size is less than 8', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            '1',
            '12',
            '123',
            '1234',
            '12345',
            '123456',
            '1234567'
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test).triggerHandler('input');
            expect(model.$valid).toBe(true);
        });
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="tel" ng-model="model" ruc >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must format model values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            { value: '54932874', viewValue: '5.493.287-4' },
            { value: '223344559', viewValue: '22.334.455-9' }
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$valid).toBe(true);
            expect(model.$viewValue).toBe(test.viewValue);
        });
    });

    it('must format initial model values', () => {
        // Arrange
        const individualInput = TestUtil.compile('<input type="tel" ng-model="model1" ruc >', {
            model1: '54932874'
        });
        const companyInput = TestUtil.compile('<input type="tel" ng-model="model2" ruc >', {
            model2: '223344559'
        });

        // Act
        const individualModel = individualInput.controller('ngModel');
        const companyModel = companyInput.controller('ngModel');

        // Assert
        expect(individualModel.$viewValue).toBe('5.493.287-4');
        expect(companyModel.$viewValue).toBe('22.334.455-9');
    });

    it('must accept formatted initial model values', function () {
        // Arrange
        const individualInput = TestUtil.compile('<input type="tel" ng-model="model1" ruc >', {
            model1: '5.493.287-4'
        });
        const companyInput = TestUtil.compile('<input type="tel" ng-model="model2" ruc >', {
            model2: '22.334.455-9'
        });

        // Act
        const individualModel = individualInput.controller('ngModel');
        const companyModel = companyInput.controller('ngModel');

        // Assert
        expect(individualModel.$viewValue).toBe('5.493.287-4');
        expect(companyModel.$viewValue).toBe('22.334.455-9');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '5', viewValue: '5', modelValue: '5' },
            { value: '54', viewValue: '5.4', modelValue: '54' },
            { value: '549', viewValue: '5.49', modelValue: '549' },
            { value: '5493', viewValue: '5.493', modelValue: '5493' },
            { value: '54932', viewValue: '5.493.2', modelValue: '54932' },
            { value: '549328', viewValue: '5.493.28', modelValue: '549328' },
            { value: '5493287', viewValue: '5.493.287', modelValue: '5493287' },
            { value: '54932874', viewValue: '5.493.287-4', modelValue: '54932874' },
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
        var input = TestUtil.compile('<input type="tel" ng-model="model" ruc >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: '2-', viewValue: '2', modelValue: '2' },
            { value: '22a', viewValue: '2.2', modelValue: '22' },
            { value: '22_33', viewValue: '2.233', modelValue: '2233' },
            { value: '22334!', viewValue: '2.233.4', modelValue: '22334' },
            { value: '22@3-34!%4', viewValue: '2.233.44', modelValue: '223344' },
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