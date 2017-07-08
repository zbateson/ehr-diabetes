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
    DoctoreController.$inject = ['$document', '$element', '$sce', '$mdDialog'];
    function DoctoreController($document, $element, $sce, $mdDialog) {

        // ViewModel
        var vm = this;

        vm.printPreview = "This is a test...";
        vm.openPrintPreview = openPrintPreview;

        ////////////////////////////

        function openPrintPreview(ev) {
            var html = $element.find('.print-preview').html();
            var canvases = $element.find('.print-preview-charts').find('canvas');
            angular.forEach(canvases, function(canvas) {
                html += "<img src=\"" + canvas.toDataURL() + "\" width=\"100%\""
                    + " height=\"" + canvas.height + "\" />";
            });
            vm.printPreview = html;
            $mdDialog.show({
                contentElement: '#printPreviewDialog',
                parent: $document.find('body'),
                clickOutsideToClose: true,
                fullscreen: true
            });
        }
    }
})();
