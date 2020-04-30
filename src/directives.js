angular.module('paraguay.validators', [])
    .directive('ruc', [require('./ruc/ruc')])
    .directive('companyRuc', [require('./ruc/company.ruc')])
    .directive('individualRuc', [require('./ruc/individual.ruc')])
    .directive('carPlate', [require('./plate/plate')])
    .directive('oldCarPlate', [require('./plate/plate.old')])
    .directive('newCarPlate', [require('./plate/plate.newcar')])
    .directive('motorcyclePlate', [require('./plate/plate.motorcycle')]);