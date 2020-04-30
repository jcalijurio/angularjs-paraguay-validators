angular.module('paraguay.validators', [])
/**
 * @deprecated since version 1.2, use py-ruc instead.
 */
    .directive('ruc', [require('./ruc/ruc')])
    .directive('pyRuc', [require('./ruc/ruc')])
/**
 * @deprecated since version 1.2, use py-company-ruc instead.
 */
    .directive('companyRuc', [require('./ruc/company.ruc')])
    .directive('pyCompanyRuc', [require('./ruc/company.ruc')])
/**
 * @deprecated since version 1.2, use py-individual-ruc instead.
 */
    .directive('individualRuc', [require('./ruc/individual.ruc')])
    .directive('pyIndividualRuc', [require('./ruc/individual.ruc')])
/**
 * @deprecated since version 1.2, use py-car-plate instead.
 */
    .directive('carPlate', [require('./plate/plate')])
    .directive('pyCarPlate', [require('./plate/plate')])
/**
 * @deprecated since version 1.2, use py-old-car-plate instead.
 */
    .directive('oldCarPlate', [require('./plate/plate.old')])
    .directive('pyOldCarPlate', [require('./plate/plate.old')])
/**
 * @deprecated since version 1.2, use py-new-car-plate instead.
 */
    .directive('newCarPlate', [require('./plate/plate.newcar')])
    .directive('pyNewCarPlate', [require('./plate/plate.newcar')])
/**
 * @deprecated since version 1.2, use py-motorcycle-plate instead.
 */
    .directive('motorcyclePlate', [require('./plate/plate.motorcycle')])
    .directive('pyMotorcyclePlate', [require('./plate/plate.motorcycle')]);