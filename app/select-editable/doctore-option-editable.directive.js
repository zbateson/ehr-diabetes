/**
 * DoctoreOptionEditableDirective
 * @namespace select-editable
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .directive('doctoreOptionEditable', DoctoreOptionEditableDirective);

    /**
     * @namespace DoctoreOptionEditableDirective
     * @desc Creates an editable option as an md-select-header with an
     *       input text field and an 'add' button.  Broadcasts
     *       'option-added' to its parent $scope.
     * @memberof select-editable
     */
    function DoctoreOptionEditableDirective() {
        var directive = {
            require: '^doctoreSelectEditable',
            link: linkDirective,
            transclude: true,
            templateUrl: 'app/select-editable/doctore-option-editable.html',
            controller: 'DoctoreOptionEditableController',
            controllerAs: 'vm',
            scope: { },
            bindToController: true
        };
        return directive;
    }

    function linkDirective($scope, $element, $attributes, $controller, $transclude) {
        $scope.vm.isFirstChild = $element.attr('isFirstChild');
        $element.find('label').append($transclude());
        $scope.vm.doctoreSelectEditable = $controller;
    }
})();
