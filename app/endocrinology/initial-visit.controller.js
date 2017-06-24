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

        /** @member {string} */
        vm.impression = null;

        /** @member {string} */
        vm.recommendation = null;

        vm.complications = [];
        vm.additionalOptions = [];
        vm.selectAdd = "";

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
    }
})();
