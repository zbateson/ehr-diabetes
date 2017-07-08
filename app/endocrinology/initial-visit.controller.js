/**
 * InitialVisitController
 * @namespace endocrinology
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .controller('InitialVisitController', InitialVisitController);

    /**
     * @namespace InitialVisitController
     * @desc Handles form variables for an endocrinologist's initial
     *       initial patient visits
     * @memberof endocrinology
     */
    InitialVisitController.$inject = [];
    function InitialVisitController() {

        // ViewModel
        var vm = this;

        /**
         * @member {Date} used for birthDate and t2dmDate and set to
         *         today's date
         */
        vm.maxDate = new Date();
        /**
         * @member {Date} set to what I am guessing would be a median
         *         age
         */
        vm.birthDate = new Date('1980-01-01T00:00:00');
        /** @member {Date} */
        vm.t2dmDate = null;
        /** @member {string} */
        vm.keyPoints = null;

        /** @member {Array} */
        vm.microComplications = null;
        /** @member {Array} */
        vm.macroComplications = null;

        /** @member {string} */
        vm.history = null;
        /** @member {string} */
        vm.pastHistory = null;
        /** @member {Array} */
        vm.medications = {
            diabetes: [ 'INSULIN REGULAR', 'METFORMIN' ],
            dyslipidemia: [ ],
            hypertension: [ ],
            other: [ ]
        };

        /** @member {Array} */
        vm.hba1c = [];
        /** @member {Array} */
        vm.fbs = [];
        /** @member {Array} */
        vm.ldl = [];

        /** @member {number} */
        vm.premeal = null;
        /** @member {number} */
        vm.postmeal = null;

        /** @member {number} */
        vm.acr = null;
        /** @member {string} */
        vm.acrLevel = null;
        /** @member {number} */
        vm.egfr = null;
        /** @member {number} */
        vm.b12 = null;

        /** @member {string} */
        vm.hypos = '2-3';
        /** @member {string} */
        vm.exercise = null;
        /** @member {string} */
        vm.diet = null;
        /** @member {string} */
        vm.smoking = 'Non-smoker';
        /** @member {string} */
        vm.alcohol = 'None';
        /** @member {Array} */
        vm.vaccinations = [ 'Influenza', 'Pneumococcal' ];

        /** @member {Array} */
        vm.injectionSites = [];

        /** @member {string} */
        vm.ophthalmology = null;

        /** @member {Array} */
        vm.allergies = [];

        /** @member {string} */
        vm.feet = 'Intact protective sensation';

        /** @member {string} */
        vm.bp = "120/80";
        /** @member {number} */
        vm.weight = 65;
        /** @member {number} */
        vm.height = 140;

        vm.normalThyroid = true;
        vm.clearChest = true;
        vm.heartSounds = true;
        vm.benignAbdomen = true;
        vm.noFocalNeurological = true;

        /** @member {string} */
        vm.impression = null;

        /** @member {string} */
        vm.recommendation = null;

        vm.complications = [];
        vm.additionalOptions = [];
        vm.selectAdd = "";

        vm.getTrendChartValues = getTrendChartValues;
        vm.getTrendChartLabels = getTrendChartLabels;

        vm.hba1cChartOptions = {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    type: 'time',
                    time: {
                        tooltipFormat: 'll'
                    },
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false,
                        color: [null, null, null, null, null, null, null, null, '#88CC88']
                    },
                    ticks: {
                        min: 0,
                        max: 30,
                        stepSize: 3
                    }
                }]
            },
            hover: {
                mode: 'single'
            },
            title: {
                display: true,
                text: 'HbA1C (%)'
            }
        };

        vm.selectAddButton = function() {
            var value = $.trim(vm.selectAdd);
            if (value.length !== 0) {
                vm.additionalOptions.unshift(vm.selectAdd);
                vm.complications.unshift(vm.selectAdd);
                vm.selectAdd = "";
            }
        }

        vm.selectTypeKeyDown = function(ev) {
            if (ev.keyCode === 27) {
                // ESC
                return;
            }
            ev.stopPropagation();
            if (ev.keyCode === 13) {
                vm.selectAddButton();
                return false;
            }
        };

        function getTrendArrayValue(name) {
            var calculated = "";
            if (vm[name]) {
                vm[name].forEach(function(val) {
                    calculated += val.value + val.date;
                });
            }
            return calculated;
        }

        function getTrendChartObjectFor(name) {
            return {
                value: getTrendArrayValue(name),
                chart: [vm[name].map(function(val) {
                    return val.value;
                })],
                label: vm[name].map(function(val) {
                    return val.date;
                })
            };
        }

        var trendValues = {};
        function getTrendChartValues(name) {
            var part = trendValues[name];
            if (!part || getTrendArrayValue(name) !== part.value || part.chart === null) {
                part = trendValues[name] = getTrendChartObjectFor(name);
            }
            return part.chart;
        }

        function getTrendChartLabels(name) {
            var part = trendValues[name];
            if (!part || getTrendArrayValue(name) !== part.value || part.chart === null) {
                part = trendValues[name] = getTrendChartObjectFor(name);
            }
            return part.label;
        }
    }
})();
