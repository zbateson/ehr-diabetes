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
    DoctoreInputTrendController.$inject = [ '$filter', '$element' ];
    function DoctoreInputTrendController($filter, $element) {

        /** View Model **/
        var vm = this;

        /** @member {Array} taken from directive scope */
        vm.ngModel = [];
        /** @member {string} */
        vm.label = 'Number';
        /** @member {number} min value for number input */
        vm.min = 0;
        /** @member {number} max value for number input */
        vm.max = 0;
        /** @member {number} step value for number input */
        vm.step = 1;
        /** @member {boolean} true if the date input field should be shown */
        vm.isNumberField = true;

        /** @member {string} the value of the input field */
        vm.input = '';

        /** @member {boolean} true if the chart canvas should be shown */
        vm.showChart = false;

        vm.chartData = [1, 2, 3];
        vm.chartLabels = ['Jan', 'Feb', 'March'];

        vm.transformChip = transformChip;

        vm.setFocused = setFocused;
        vm.setHasValue = setHasValue;

        ///////////////////////////

        function getDateDiff(newDate, oldDate) {
            if (newDate === null) {
                newDate = new Date();
            }
            if (oldDate === null) {
                oldDate = new Date();
            }
            var diffYear = newDate.getFullYear() - oldDate.getFullYear();
            var diffMonth = newDate.getMonth() - oldDate.getMonth();
            var diffDate = newDate.getDate() - oldDate.getDate();
            return [ diffYear, diffMonth, diffDate ];
        }

        function getLabelForDate(curDate, prevDate, nextDate) {
            var diffCurPrev = getDateDiff(curDate, prevDate);
            var diffCurNext = getDateDiff(nextDate, curDate);

            if (curDate === null) {
                curDate = new Date();
            }

            var label = [
                '\'' + $filter('date')(curDate, 'yy'),
                $filter('date')(curDate, 'MMM'),
                $filter('date')(curDate, 'dd'),
            ];

            if (diffCurPrev[0] === 0 && diffCurNext[0] === 0 && prevDate !== null) {
                label[0] = '';
                if (Math.abs(diffCurPrev[1]) > 0 && Math.abs(diffCurNext[1]) > 0) {
                    label[2] = '';
                }
            } else if (Math.abs(diffCurPrev[1]) < 2 && Math.abs(diffCurNext[1]) < 2) {
                label[1] = '';
                label[2] = '';
            }
            return label.join(' ');
        }

        function generateChartData() {
            vm.chartData = [];
            vm.chartLabels = [];
            for (var i = 0; i < vm.ngModel.length; ++i) {
                var lastDate = (i < 1) ? null : vm.ngModel[i - 1].date;
                var nextDate = (i === vm.ngModel.length - 1) ? null : vm.ngModel[i + 1].date;
                var part = vm.ngModel[i];
                vm.chartData.push(part.value);
                vm.chartLabels.push(getLabelForDate(part.date, lastDate, nextDate));
            }
        }

        function setFocused(isFocused) {
            $element.toggleClass('doctore-input-focused', !!isFocused);
        }

        function setHasValue(hasValue) {
            $element.toggleClass('doctore-input-has-value', !!hasValue);
        }

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
            generateChartData();
            return result;
        }
    }
})();
