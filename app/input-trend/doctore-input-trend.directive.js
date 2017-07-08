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
            scope: true,
            templateUrl: 'app/input-trend/doctore-input-trend.html',
            transclude: true,
            bindToController: {
                ngModel: '=',
                label: '@',
                min: '@',
                max: '@',
                step: '@'
            },
            link: linkDirective,
            controller: 'DoctoreInputTrendController',
            controllerAs: 'vm'
        };
        return directive;
    }

    function linkDirective($scope, $element, $attributes, $controller, $transclude) {
        angular.element($element.children()[0]).on('click', function($event) {
            var elm = angular.element($event.target);
            while (elm.length !== 0 && elm[0] !== $element[0]) {
                if (elm.prop('tagName').toLowerCase() === 'md-chip') {
                    return;
                }
                elm = elm.parent();
            }
            $element.find('input').focus();
        });
    }

})();
