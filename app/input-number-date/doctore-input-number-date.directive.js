/**
 * DoctoreInputNumberDateDirective
 * @namespace input-number-date
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .directive('doctoreInputNumberDate', DoctoreInputNumberDateDirective);

    /**
     * @namespace DoctoreInputNumberDateDirective
     * @desc
     * @memberof input-number-date
     */
    DoctoreInputNumberDateDirective.$inject = [ '$timeout', '$doctoreConstants' ];
    var $timeout;
    var $constants
    var $vm;

    function DoctoreInputNumberDateDirective($angularTimeout, $doctoreConstants) {
        $timeout = $angularTimeout;
        $constants = $doctoreConstants;
        var directive = {
            scope: {
                input: '=ngValue',
                inputType: '@type'
            },
            link: linkDirective,
            bindToController: true,
            controller: 'DoctoreInputTrendController',
            controllerAs: 'vm'
        };
        return directive;
    }

    function linkDirective($scope, $element, $attributes, $controller, $transclude) {
        $vm = $controller;
        $element.on('click', onClick);
        $element.on('focus', onFocus);
        $element.on('keydown', onKeyDown);
    }

    function getSelectionRange(element) {
        var el = angular.element(element);
        var selStart = el.prop('selectionStart');
        var selEnd = el.prop('selectionEnd');
        return [ Math.min(selStart, selEnd), Math.max(selStart, selEnd) ];
    }

    var datePartIndex = {
        year: 0,
        month: 1,
        day: 2
    };

    var datePartRange = [
        [0, 4], [5, 7], [8, 10]
    ];

    var defaultPartValues = [
        'yyyy',
        'mm',
        'dd'
    ];

    function getSelectionRangePartIndex(element) {
        var range = getSelectionRange(element);
        for (var i = 0; i < datePartRange.length; ++i) {
            var partRange = datePartRange[i];
            if (range[0] >= partRange[0] && range[0] <= partRange[1]) {
                return i;
            }
        }
        return 0;
    }

    function setSelectionRange(element, partIndex, keepInput) {
        var el = angular.element(element);
        if ($vm.inputType !== 'number' && el[0].setSelectionRange) {
            // if used in a $timeout, input type could've changed...
            el[0].setSelectionRange(
                datePartRange[partIndex][0],
                datePartRange[partIndex][1]
            );
        }
        if (!keepInput) {
            $vm.runningDateInput = '';
        }
    }

    function selectNextRange(element, partIndex) {
        var nextPart = datePartIndex.day;
        if (partIndex === datePartIndex.year) {
            nextPart = datePartIndex.month;
        }
        setSelectionRange(element, nextPart);
    }

    function selectPrevRange(element, partIndex) {
        var prevPart = datePartIndex.year;
        if (partIndex === datePartIndex.day) {
            prevPart = datePartIndex.month;
        }
        setSelectionRange(element, prevPart);
    }

    function onFocus($event) {
        if ($vm.inputType === 'number') {
            return;
        }
        setSelectionRange($event.target, datePartIndex.year);
    }

    function onClick($event) {
        var target = $event.target;
        if ($vm.inputType === 'number') {
            return;
        }
        $event.stopPropagation();
        $event.preventDefault();

        var partIndex = getSelectionRangePartIndex(target);
        $timeout(function() {
            setSelectionRange(target, partIndex);
        });
    }

    var PART_INCREMENT = false;
    var PART_DECREMENT = true;

    function incrDecrRangePartValue(partIndex, incrOrDecr) {

        $vm.runningDateInput = '';

        var partValues = $vm.input.split('-');
        var strValue = partValues[partIndex];
        var iValue = (isNaN(strValue)) ? 0 : parseInt(strValue, 10);

        if (iValue === 0 && partIndex === datePartIndex.year) {
            iValue = 1999;
        }

        if (incrOrDecr === PART_DECREMENT) {
            iValue = iValue - 1;
        } else {
            iValue = iValue + 1;
        }

        if ((iValue === 13 && partIndex === datePartIndex.month)
            || (iValue === 32 && partIndex === datePartIndex.day)) {
            return;
        }

        strValue = ('0000' + iValue).slice(-strValue.length)
        partValues[partIndex] = strValue;

        var strDate = partValues.join('-');
        if (/^(\d){4}\-(\d){2}\-(\d){2}$/.test(strDate)) {
            var date = new Date(partValues.join('-') + 'T00:00:00');
            if (date.getDate() !== partValues[datePartIndex.day]) {
                // month doesn't have that many days...
                if (partIndex === datePartIndex.day) {
                    return;
                } else {
                    partValues[datePartIndex.year] = ('0000' + date.getFullYear()).slice(-4);
                    partValues[datePartIndex.month] = ('00' + (date.getMonth() + 1)).slice(-2);
                    partValues[datePartIndex.day] = ('00' + date.getDate()).slice(-2);
                }
            }
        }

        strDate = partValues.join("-");
        $vm.input = strDate;
    }

    function setPartDefaultValue(partIndex) {
        $vm.runningDateInput = '';

        var partValues = $vm.input.split('-');
        partValues[partIndex] = defaultPartValues[partIndex];

        $vm.input = partValues.join("-");
    }

    function onNumberKeyDown($event, number, partIndex) {
        $vm.runningInput = $vm.runningInput + number;
        var partValues = $vm.input.split('-');

        if (partIndex === datePartIndex.year) {
            // don't ovewrite the value -- allows quicker changes of short dates
            partValues[partIndex] = partValues[partIndex].slice(0, -$vm.runningInput.length) + $vm.runningInput;
        } else {
            partValues[partIndex] = ('00' + ($vm.runningInput)).slice(-2);
        }

        $event.preventDefault();
        $event.stopPropagation();

        var selectNext = (
            (partIndex === datePartIndex.year && $vm.runningInput.length === 4)
            || (partIndex === datePartIndex.month
                && ($vm.runningInput.length === 2 || parseInt($vm.runningInput, 10) > 1))
        );

        $vm.input = partValues.join('-');
        if (selectNext) {

            $vm.runningInput = '';
            $timeout(function() {
                selectNextRange($event.target, partIndex);
            });
            return;

        } else if (partIndex === datePartIndex.day && ($vm.runningInput.length === 2 || parseInt($vm.runningInput, 10) > 3)) {
            $vm.runningInput = '';
        }

        $timeout(function() {
            setSelectionRange($event.target, partIndex, true);
        });
    }

    function onKeyDown($event) {

        if ($vm.inputType === 'number') {
            return;
        }
        if (!/^(\d|y){4}\-(\d|m){2}\-(\d|d){2}$/.test($vm.input)) {
            $vm.input = 'yyyy-mm-dd';
            setSelectionRange($event.target, datePartIndex.year);
            return;
        }

        var partIndex = getSelectionRangePartIndex($event.target);
        var charCode = String.fromCharCode($event.keyCode);
        if ($constants.hasModifierKey($event)) {
            // disable select all
            if ($event.ctrlKey && $event.keyCode === 65) {
                $event.preventDefault();
            }
            return;
        }

        if ((!$event.shiftKey && $event.keyCode === $constants.KEY_CODE.TAB)
            || $event.keyCode === $constants.KEY_CODE.RIGHT_ARROW) {

            $event.preventDefault();
            $event.stopPropagation();
            selectNextRange($event.target, partIndex);
            return false;

        } else if (($event.shiftKey && $event.keyCode === $constants.KEY_CODE.TAB)
            || $event.keyCode === $constants.KEY_CODE.LEFT_ARROW) {

            $event.preventDefault();
            $event.stopPropagation();
            selectPrevRange($event.target, partIndex);
            return false;
        }

        if ($event.keyCode === $constants.KEY_CODE.UP_ARROW) {

            $event.preventDefault();
            $event.stopPropagation();
            incrDecrRangePartValue(partIndex, PART_INCREMENT);

        } else if ($event.keyCode === $constants.KEY_CODE.DOWN_ARROW) {

            $event.preventDefault();
            $event.stopPropagation();
            incrDecrRangePartValue(partIndex, PART_DECREMENT);

        } else if ($event.keyCode === $constants.KEY_CODE.BACKSPACE
            || $constants.KEY_CODE.DELETE) {

            setPartDefaultValue(partIndex);

        } else if ($event.keyCode === $constants.KEY_CODE.ENTER) {

            // allow default to be called, clear running input
            $vm.runningInput = '';
            return true;

        } else if (isNaN(charCode)) {

            $event.preventDefault();
            $event.stopPropagation();
            return false;

        } else {
            onNumberKeyDown($event, parseInt(charCode, 10), partIndex);
            return;
        }

        $timeout(function() {
            setSelectionRange($event.target, partIndex, true);
        });
        return false;
    }

})();
