/**
 * DoctoreInputTrendDirective
 * @namespace input-trend
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .directive('doctoreInputTrend', DoctoreInputTrendDirective);

    /**
     * @namespace DoctoreInputTrendDirective
     * @desc Allows typing a series of integer values and dates as a
     *       trending set of values
     * @memberof select-editable
     */
    DoctoreInputTrendDirective.$inject = [];
    function DoctoreInputTrendDirective() {
        var directive = {
            scope: {
                ngModel: '=',
                numberLabel: '@'
            },
            templateUrl: 'app/input-trend/doctore-input-trend.html',
            transclude: true,
            bindToController: true,
            controller: 'DoctoreInputTrendController',
            controllerAs: 'vm'
        };
        return directive;
    }

})();
