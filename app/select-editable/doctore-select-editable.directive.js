/**
 * DoctoreSelectEditableDirective
 * @namespace select-editable
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .directive('doctoreSelectEditable', DoctoreSelectEditableDirective);

    /**
     * @namespace DoctoreSelectEditableDirective
     * @desc Adds an editable text field and "Add" button at the top of
     *       an md-select to allow adding custom options.
     * @memberof select-editable
     */
    function DoctoreSelectEditableDirective() {
        var directive = {
            scope: {
                ngModel: '='
            },
            bindToController: true,
            link: linkDirective,
            controller: 'DoctoreSelectEditableController',
            controllerAs: 'vm'
        };
        return directive;
    }

    function linkDirective($scope, $element, $attributes, $controller, $transclude) {
        var children = $element.find('doctore-option-editable').parent().children();
        if (children && children.length > 0) {
            angular.element(children[0]).attr('isFirstChild', 'true');
        }
        var options = $element.find('md-option');
        var optArray = [];
        // array.map doesn't seem to work here...
        angular.forEach(options, function(option) {
            optArray.push(angular.element(option).text());
        });
        angular.element(options).detach();
        $scope.vm.options = optArray;
    }
})();
