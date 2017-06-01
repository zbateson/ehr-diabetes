
/**
 * DoctoreConstantsFactory
 * @namespace doctore
 */
(function() {
    'use strict';

    angular
        .module('doctore')
        .factory('$doctoreConstants', doctoreConstantsFactory);

    /**
     * @namespace DoctoreConstantsFactory
     * @desc copied constants from material's 'private' $mdConstant for
     *       keyboard constants
     * @memberof doctore
     */
    function doctoreConstantsFactory() {

        var self = {
            isInputKey : function(e) { return (e.keyCode >= 31 && e.keyCode <= 90); },
            isNumPadKey : function(e) { return (3 === e.location && e.keyCode >= 97 && e.keyCode <= 105); },
            isMetaKey: function(e) { return (e.keyCode >= 91 && e.keyCode <= 93); },
            isFnLockKey: function(e) { return (e.keyCode >= 112 && e.keyCode <= 145); },
            isNavigationKey : function(e) {
                var kc = self.KEY_CODE, NAVIGATION_KEYS =  [kc.SPACE, kc.ENTER, kc.UP_ARROW, kc.DOWN_ARROW];
                return (NAVIGATION_KEYS.indexOf(e.keyCode) != -1);
            },
            hasModifierKey: function(e) {
                return e.ctrlKey || e.metaKey || e.altKey;
            },
            /**
             * Common Keyboard actions and their associated keycode.
             */
            KEY_CODE: {
                COMMA: 188,
                SEMICOLON : 186,
                ENTER: 13,
                ESCAPE: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT_ARROW : 37,
                UP_ARROW : 38,
                RIGHT_ARROW : 39,
                DOWN_ARROW : 40,
                TAB : 9,
                BACKSPACE: 8,
                DELETE: 46
            },
        };
        return self;
    }

})();
