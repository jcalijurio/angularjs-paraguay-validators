'use strict';

require('../directives');

describe('py-zipcode', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-zipcode >');
        var tests = [
            '3180',
            '7000',
            '9060',
            '5990'
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
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-zipcode >');
        var tests = [
            '12345'
        ];

        // Act / Assert
        var model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test).triggerHandler('input');
            expect(model.$valid).toBe(false);
        });
    });

    it('must register a $parser and a $formatter', () => {
        // Arrange
        const plainInput = TestUtil.compile('<input ng-model="model1">');

        const maskedInput = TestUtil.compile('<input type="tel" ng-model="model" py-zipcode>');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });


    it('must ignore non digits', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-zipcode >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: '2-', viewValue: '2', modelValue: '2' },
            { value: '22a', viewValue: '22', modelValue: '22' },
            { value: '22_33', viewValue: '2233', modelValue: '2233' }
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