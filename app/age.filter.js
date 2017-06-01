(function() {
    'use strict';

    angular
    .module('doctore')
    .filter('age', function() { return ageFilter; });

    function ageFilter(input) {
        if (!input || !input instanceof Date) {
            return input;
        }
        var diff = new Date(new Date() - input);
        return diff.getUTCFullYear() - 1970;
    }
})();
