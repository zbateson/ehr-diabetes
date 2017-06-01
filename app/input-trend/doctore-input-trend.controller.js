/**
 * DoctoreInputTrendController
 * @namespace input-trend
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('DoctoreInputTrendController', DoctoreInputTrendController);

    /**
     * @namespace DoctoreInputTrendController
     * @desc
     * @memberof input-trend
     */
    DoctoreInputTrendController.$inject = [ '$filter' ];
    function DoctoreInputTrendController($filter) {

        /** View Model **/
        var vm = this;

        /** @member {Array} taken from directive scope */
        vm.ngModel = [];
        /** @member {string} */
        vm.numberLabel = 'Number';
        /** @member {boolean} true if the date input field should be shown */
        vm.isNumberField = true;

        /** @member {string} the value of the input field */
        vm.input = '';

        vm.transformChip = transformChip;

        ///////////////////////////

        function transformChip(input) {
            var result = null;
            if (vm.isNumberField) {
                result = { value: input, date: null };
                vm.input = $filter('date')(new Date(), 'yyyy-MM-dd');
            } else {
                if (/^(\d){4}\-(\d){2}\-(\d){2}$/.test(input)) {
                    vm.ngModel[vm.ngModel.length - 1].date = new Date(input + 'T00:00:00');
                    vm.ngModel.sort(function(chip1, chip2) {
                        return chip1.date.valueOf() - chip2.date.valueOf();
                    });
                }
                vm.input = '';
            }
            vm.isNumberField = !vm.isNumberField;
            return result;
        }
    }
})();
