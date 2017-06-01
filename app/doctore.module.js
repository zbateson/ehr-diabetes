(function() {
    'use strict';
    angular
    .module('doctore', ['ngMaterial', 'ngSanitize'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('deep-orange');
    });
})();
