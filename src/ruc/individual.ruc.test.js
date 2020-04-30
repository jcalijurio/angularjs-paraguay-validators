'use strict';

require('../directives');

describe('py-individual-ruc', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >', {
            model: '54932874'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
    });

    it('must be invalid when the value is invalid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >', {
            model: '12345678'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(false);
    });

    it('must ignore validity when the value size is less than 8', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >', {
            model: '1234567'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$valid).toBe(true);
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must format initial model values', () => {
        // Arrange
        const input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >', {
            model: '54932874'
        });

        // Act
        const model = input.controller('ngModel');

        // Assert
        expect(model.$viewValue).toBe('5.493.287-4');
    });

    it('must accept formatted initial model values', function () {
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >', {
            model: '5.493.287-4'
        });

        // Act
        var model = input.controller('ngModel');

        // Assert
        expect(model.$viewValue).toBe('5.493.287-4');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '5', viewValue: '5', modelValue: '5' },
            { value: '54', viewValue: '5.4', modelValue: '54' },
            { value: '549', viewValue: '5.49', modelValue: '549' },
            { value: '5493', viewValue: '5.493', modelValue: '5493' },
            { value: '54932', viewValue: '5.493.2', modelValue: '54932' },
            { value: '549328', viewValue: '5.493.28', modelValue: '549328' },
            { value: '5493287', viewValue: '5.493.287', modelValue: '5493287' },
            { value: '54932874', viewValue: '5.493.287-4', modelValue: '54932874' }
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
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-individual-ruc >');
        var tests = [
            { value: '#-@|_AZ*', viewValue: '', modelValue: '' },
            { value: '5!', viewValue: '5', modelValue: '5' },
            { value: '5-.4@', viewValue: '5.4', modelValue: '54' },
            { value: '5#49', viewValue: '5.49', modelValue: '549' },
            { value: '54+93', viewValue: '5.493', modelValue: '5493' },
            { value: '54/9^32', viewValue: '5.493.2', modelValue: '54932' },
            { value: '549`32{}8', viewValue: '5.493.28', modelValue: '549328' },
            { value: '54&932=87', viewValue: '5.493.287', modelValue: '5493287' },
            { value: '5"-+*/,49,3T28P7<4', viewValue: '5.493.287-4', modelValue: '54932874' }
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