'use strict';

require('../directives');

describe('py-phone', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-phone >');
        var tests = [
            '61501783',
            '971988725',
            '59561501783',
            '59561508313',
            '595994185356',
            '595961540851',
            '595971988725'
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
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-phone >');
        var tests = [
            '1234567890123'
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

        const maskedInput = TestUtil.compile('<input type="tel" ng-model="model" py-phone>');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must format model values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-phone >');
        var tests = [
            { value: '61501783', viewValue: '(61)501-783' },
            { value: '971988725', viewValue: '(971)988-725' },
            { value: '59561501783', viewValue: '+595 61 501-783' },
            { value: '595994185356', viewValue: '+595 994 185-356' },
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
        const shortInput = TestUtil.compile('<input type="tel" ng-model="model1" py-phone >', {
            model1: '61501783'
        });
        const longInput = TestUtil.compile('<input type="tel" ng-model="model2" py-phone >', {
            model2: '595994185356'
        });

        // Act
        const shortModel = shortInput.controller('ngModel');
        const longModel = longInput.controller('ngModel');

        // Assert
        expect(shortModel.$modelValue).toBe('61501783');
        expect(longModel.$modelValue).toBe('595994185356');
        expect(shortModel.$viewValue).toBe('(61)501-783');
        expect(longModel.$viewValue).toBe('+595 994 185-356');
    });

    it('must accept formatted initial model values', function () {
        // Arrange
        const shortInput = TestUtil.compile('<input type="tel" ng-model="model1" py-phone >', {
            model1: '(971)988-725'
        });
        const longInput = TestUtil.compile('<input type="tel" ng-model="model2" py-phone >', {
            model2: '+595 61 501-783'
        });

        // Act
        const shortModel = shortInput.controller('ngModel');
        const longModel = longInput.controller('ngModel');

        // Assert
        expect(shortModel.$viewValue).toBe('(971)988-725');
        expect(longModel.$viewValue).toBe('+595 61 501-783');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-phone >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '5', viewValue: '(5', modelValue: '5' },
            { value: '59', viewValue: '(59', modelValue: '59' },
            { value: '595', viewValue: '(59)5', modelValue: '595' },
            { value: '5959', viewValue: '(59)59', modelValue: '5959' },
            { value: '59599', viewValue: '(59)599', modelValue: '59599' },
            { value: '595994', viewValue: '(59)599-4', modelValue: '595994' },
            { value: '5959941', viewValue: '(59)599-41', modelValue: '5959941' },
            { value: '59599418', viewValue: '(59)599-418', modelValue: '59599418' },
            { value: '595994185', viewValue: '(595)994-185', modelValue: '595994185' },
            { value: '5959941853', viewValue: '(595)994-1853', modelValue: '5959941853' },
            { value: '59599418535', viewValue: '+595 99 418-535', modelValue: '59599418535' },
            { value: '595994185356', viewValue: '+595 994 185-356', modelValue: '595994185356' },
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
        var input = TestUtil.compile('<input type="tel" ng-model="model" py-phone >');
        var tests = [
            { value: '@', viewValue: '', modelValue: '' },
            { value: '2-', viewValue: '(2', modelValue: '2' },
            { value: '22a', viewValue: '(22', modelValue: '22' },
            { value: '22_33', viewValue: '(22)33', modelValue: '2233' },
            { value: '22334!', viewValue: '(22)334', modelValue: '22334' },
            { value: '22@3-34!%4', viewValue: '(22)334-4', modelValue: '223344' },
            { value: '22@33A4z4!55-9', viewValue: '(223)344-559', modelValue: '223344559' },
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