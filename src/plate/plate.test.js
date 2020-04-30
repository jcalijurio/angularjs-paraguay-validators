'use strict';

require('../directives');

describe('plate', () => {

    beforeEach(angular.mock.module('paraguay.validators'));

    it('must be valid when the value is valid', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" car-plate >');
        const tests = [
            { value: 'AAA123', viewValue: 'AAA-123' },
            { value: 'AAAA123', viewValue: 'AAAA-123' },
            { value: '123AAAA', viewValue: '123-AAAA' }
        ];

        // Act / Assert
        const model = input.controller('ngModel');
        tests.forEach(test => {
            input.val(test.value).triggerHandler('input');
            expect(model.$valid).toBe(true);
            expect(model.$viewValue).toBe(test.viewValue);
        });
    });

    it('must ignore validity when the value size is less than 6', () => {
        // Arrange
        const input = TestUtil.compile('<input type="text" ng-model="model" car-plate >');
        const tests = [
            { value: 'AAA12', viewValue: 'AAA-12' },
            { value: 'AAAA1', viewValue: 'AAAA-1' },
            { value: '123AA', viewValue: '123-AA' }
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

        const maskedInput = TestUtil.compile('<input type="text" ng-model="model" car-plate >');

        // Act
        const plainModel = plainInput.controller('ngModel');
        const maskedModel = maskedInput.controller('ngModel');

        // Assert
        expect(maskedModel.$parsers.length).toBe(plainModel.$parsers.length + 1);
        expect(maskedModel.$formatters.length).toBe(plainModel.$formatters.length + 1);
    });

    it('must accept formatted initial model values', function () {
        const oldPlate = TestUtil.compile('<input type="text" ng-model="modelOld" car-plate >', {
            modelOld: 'AAA-123'
        });
        const newCarPlate = TestUtil.compile('<input type="text" ng-model="modelNewCar" car-plate >', {
            modelNewCar: 'AAAA-123'
        });
        const newMotorcyclePlate = TestUtil.compile('<input type="text" ng-model="newMoto" car-plate >', {
            newMoto: '123-AAAA'
        });

        // Act
        const modelOld = oldPlate.controller('ngModel');
        const modelNewCar = newCarPlate.controller('ngModel');
        const newMoto = newMotorcyclePlate.controller('ngModel');

        // Assert
        expect(modelOld.$viewValue).toBe('AAA-123');
        expect(modelNewCar.$viewValue).toBe('AAAA-123');
        expect(newMoto.$viewValue).toBe('123-AAAA');
    });

    it('must format partial values', () => {
        // Arrange
        var input = TestUtil.compile('<input type="text" ng-model="model" car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'A', viewValue: 'A', modelValue: 'A' },
            { value: 'AA', viewValue: 'AA', modelValue: 'AA' },
            { value: 'AAA', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'AAA1', viewValue: 'AAA-1', modelValue: 'AAA1' },
            { value: 'AAA12', viewValue: 'AAA-12', modelValue: 'AAA12' },
            { value: 'AAA123', viewValue: 'AAA-123', modelValue: 'AAA123' },
            { value: 'AAAA', viewValue: 'AAAA', modelValue: 'AAAA' },
            { value: 'AAAA1', viewValue: 'AAAA-1', modelValue: 'AAAA1' },
            { value: 'AAAA12', viewValue: 'AAAA-12', modelValue: 'AAAA12' },
            { value: 'AAAA123', viewValue: 'AAAA-123', modelValue: 'AAAA123' },
            { value: '1', viewValue: '1', modelValue: '1' },
            { value: '12', viewValue: '12', modelValue: '12' },
            { value: '123', viewValue: '123', modelValue: '123' },
            { value: '123A', viewValue: '123-A', modelValue: '123A' },
            { value: '123AA', viewValue: '123-AA', modelValue: '123AA' },
            { value: '123AAA', viewValue: '123-AAA', modelValue: '123AAA' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: 'a', viewValue: 'A', modelValue: 'A' },
            { value: 'aa', viewValue: 'AA', modelValue: 'AA' },
            { value: 'aaa', viewValue: 'AAA', modelValue: 'AAA' },
            { value: 'aaa1', viewValue: 'AAA-1', modelValue: 'AAA1' },
            { value: 'aaa12', viewValue: 'AAA-12', modelValue: 'AAA12' },
            { value: 'aaa123', viewValue: 'AAA-123', modelValue: 'AAA123' },
            { value: 'aBa987', viewValue: 'ABA-987', modelValue: 'ABA987' },
            { value: 'abC123', viewValue: 'ABC-123', modelValue: 'ABC123' },
            { value: '123a', viewValue: '123-A', modelValue: '123A' },
            { value: '123ab', viewValue: '123-AB', modelValue: '123AB' },
            { value: '123abc', viewValue: '123-ABC', modelValue: '123ABC' }
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
        var input = TestUtil.compile('<input type="text" ng-model="model" car-plate >');
        var tests = [
            { value: '', viewValue: '', modelValue: '' },
            { value: '1A', viewValue: '1', modelValue: '1' },
            { value: '1AB', viewValue: '1', modelValue: '1' },
            { value: '1AB2', viewValue: '1', modelValue: '1' },
            { value: '12AB3', viewValue: '12', modelValue: '12' },
            { value: '1234', viewValue: '123', modelValue: '123' },
            { value: '1234A', viewValue: '123', modelValue: '123' },
            { value: 'A1', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B', viewValue: 'A', modelValue: 'A' },
            { value: 'A1B2', viewValue: 'A', modelValue: 'A' },
            { value: 'AB1C', viewValue: 'AB', modelValue: 'AB' },
            { value: 'ABCDE', viewValue: 'ABCD', modelValue: 'ABCD' },
            { value: 'ABCDE1', viewValue: 'ABCD', modelValue: 'ABCD' },
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