/**
 * DoctoreController
 * @namespace doctore
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('DoctoreController', DoctoreController);

    /**
     * @namespace DoctoreController
     * @desc
     * @memberof doctore
     */
    DoctoreController.$inject = ['$document', '$element', '$mdDialog'];
    function DoctoreController($document, $element, $mdDialog) {

        // ViewModel
        var vm = this;

        vm.printPreview = "This is a test...";
        vm.openPrintPreview = openPrintPreview;

        ////////////////////////////

        function openPrintPreview(ev) {
            vm.printPreview = $element.find('.print-preview').html();
            $mdDialog.show({
                contentElement: '#printPreviewDialog',
                parent: $document.find('body'),
                clickOutsideToClose: true,
                fullscreen: true
            });
        }
    }
})();
