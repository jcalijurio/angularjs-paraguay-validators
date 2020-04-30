AngularJS Paraguay Validators
==============
[![npm version](https://img.shields.io/npm/v/angularjs-paraguay-validators.svg)](https://www.npmjs.com/package/angularjs-paraguay-validators)
[![Build Status](https://travis-ci.org/jcalijurio/angularjs-paraguay-validators.svg)](https://travis-ci.org/jcalijurio/angularjs-paraguay-validators)

AngularJS Paraguay Validators is a library that provides validators and masks for RUC numbers and Car Plate / AngularJS Paraguay Validators és una biblioteca que proporciona validaciones y máscaras para números RUC y Placas de vehículo.
This library is a port of [paraguay-validators](https://www.npmjs.com/package/paraguay-validators) package for AngularJS.

> Warning: For compability with others libraries we are introducing the 'py' prefix to solve the incompatibility problems. So, the directives without 'py' prefix are now deprecated and will be removed soon.

## Instalation ##

### With npm

```bash
npm i angularjs-paraguay-validators
```

Adding script reference

```html
<script src="node_modules/angularjs-paraguay-validators/angularjs-paraguay-validator.min.js">
```

## Validations ##

### RUC ###

```html
<!-- for both RUC types -->
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" py-ruc />

<!-- for individual RUC type -->
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" py-individual-ruc />

<!-- for company RUC type -->
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" py-company-ruc />
```

### PLATE ###

```html
<!-- for all valid formats -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" py-car-plate />

<!-- for old format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" py-old-car-plate />

<!-- for new car format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" py-new-car-plate />

<!-- for motorcyle format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" py-motorcycle-plate />
```

## ROADMAP ##

New validators and masks to be implemented.

  - Phone
  - Postal Code