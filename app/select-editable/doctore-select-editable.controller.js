/**
 * DoctoreSelectEditableController
 * @namespace select-editable
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('DoctoreSelectEditableController', DoctoreSelectEditableController);

    /**
     * @namespace DoctoreSelectEditableController
     * @desc Listens for 'option-added' broadcast events, and selects it
     *       by unshifting it to ngModel
     * @memberof select-editable
     */
    DoctoreSelectEditableController.$inject = [ '$scope', '$mdSelect' ];
    function DoctoreSelectEditableController($scope, $mdSelect) {

        /** View Model **/
        var vm = this;

        /** @member {Array} taken from directive scope **/
        vm.ngModel = null;
        vm.optionAdded = optionAdded;
        vm.filter = null;

        ///////////////////////////

        function optionAdded(option) {
            if (vm.ngModel instanceof Array) {
                vm.ngModel.unshift(option);
            } else {
                vm.ngModel = option;
                $mdSelect.hide();
            }
        }
    }
})();
