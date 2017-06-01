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

        /** @member {string} input type */
        vm.inputType = null;
        /** @member {string} */

        /** @member {Date} max date value for date input */
        vm.maxDateValue = new Date();
        /** @member {Date} min date value for date input */
        vm.minDateValue = new Date('1900-01-01T00:00:00');

        /** @member {string} the value of the input field */
        vm.input = '';

        /**
         * @member {string} the running value of the date input field -
         *  e.g. the year field as it's being typed, or the month field
         */
        vm.runningDateInput = '';
    }
})();
