AngularJS Paraguay Validators
==============
[![npm version](https://img.shields.io/npm/v/angularjs-paraguay-validators.svg)](https://www.npmjs.com/package/angularjs-paraguay-validators)

AngularJS Paraguay RUC number and Car Plate validators / AngularJS Validaciones de numero RUC y Placa de vehículo.
This library is a port of [paraguay-validators](https://www.npmjs.com/package/paraguay-validators) package for AngularJS.

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
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" ruc />

<!-- for individual RUC type -->
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" individual-ruc />

<!-- for company RUC type -->
<input type="tel" name="ruc-name" id="ruc-id" ng-model="model" company-ruc />
```

### PLATE ###

```html
<!-- for all valid formats -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" car-plate />

<!-- for old format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" old-car-plate />

<!-- for new car format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" new-car-plate />

<!-- for motorcyle format -->
<input type="text" name="plate-name" id="plate-id" ng-model="model" motorcycle-plate />
```

## ROADMAP ##

New validators to be implemented.

  - Phone
  - Postal Code 