(function() {
    'use strict';
    angular
    .module('doctore', ['ngMaterial', 'ngSanitize', 'chart.js'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('deep-orange');
    });
})();
