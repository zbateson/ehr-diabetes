/**
 * DoctoreOptionEditableController
 * @namespace select-editable
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('DoctoreOptionEditableController', DoctoreOptionEditableController);

    /**
     * @namespace DoctoreOptionEditableDirective
     * @desc Handles events and emits 'option-added' to $scope.$parent.
     * @memberof select-editable
     */
    DoctoreOptionEditableController.$inject = [ '$scope' ];
    function DoctoreOptionEditableController($scope) {

        /** View Model **/
        var vm = this;

        vm.doctoreSelectEditable = null;
        /** @member {boolean} set to true if this editable option is at the top */
        vm.isFirstChild = false;
        /** @member {Array} array of added options (if isFirstChild is false) */
        vm.optionsAboveInput = [];
        /** @member {Array} array of added options (if isFirstChild is true) */
        vm.optionsBelowInput = [];
        /** @member {string} the bound model of the input field */
        vm.add = '';

        vm.onKeyDown = onKeyDown;

        vm.onClick = onClick;

        /////////////////////////////

        function addTypedOptionAndClearField() {
            var value = $.trim(vm.add);
            if (value.length !== 0) {
                if (vm.isFirstChild) {
                    vm.doctoreSelectEditable.options.unshift(value);
                } else {
                    vm.doctoreSelectEditable.options.push(value);
                }
                vm.doctoreSelectEditable.optionAdded(value);
                vm.add = '';
            }
        }

        function onKeyDown($event) {
            // ESC key
            if ($event.keyCode === 27) {
                vm.add = '';
                return;
            }
            $event.stopPropagation();
            if ($event.keyCode === 13) {
                addTypedOptionAndClearField();
                return false;
            }
        }

        function addChanged() {
            vm.doctoreSelectEditable.filter = vm.add;
        }

        function onClick($event) {
            addTypedOptionAndClearField();
        }
    }
})();
