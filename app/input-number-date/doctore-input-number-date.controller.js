/**
 * DoctoreInputNumberDateController
 * @namespace input-number-date
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('DoctoreInputNumberDateController', DoctoreInputNumberDateController);

    /**
     * @namespace DoctoreInputNumberDateController
     * @desc
     * @memberof input-number-date
     */
    DoctoreInputNumberDateController.$inject = [];
    function DoctoreInputNumberDateController() {

        /** View Model **/
        var vm = this;

        /** @member {string} taken from directive scope */
        vm.ngModel = '';

        /** @member {string} input type (either number or text) */
        vm.inputType = null;

        /**
         * @member {string} the running value of the date input field -
         *  e.g. the year field as it's being typed, or the month field
         */
        vm.runningDateInput = '';
    }
})();
