Box.Application.addService("keypress-service", function (context) {
    var keypressService = (function ($, undefined) {
        var _externals = {},
            /*
             * Exception Constants
             */
            KEYCODE_NOT_PROVIDED_EXCEPTION = "Keycode not provided",
            /*
             * Keycode Constants
             */
            LESS_THAN_SIGN_KEYCODE = 60,
            GREATER_THAN_SIGN_KEYCODE = 62,
            WHITE_SPACE_KEYCODE = 32,
            /*
             * Utility Constants
             */
            STR_UNDEFINED = "undefined";

        /*
         * Public Members
         */
        _externals.isHtmlDelimeter = function (params) {
            var input = params || {},
                keyCode = input.keyCode;

            if (typeof keyCode === STR_UNDEFINED)
                throw new Error(KEYCODE_NOT_PROVIDED_EXCEPTION);

            return (keyCode === LESS_THAN_SIGN_KEYCODE
                        || keyCode === GREATER_THAN_SIGN_KEYCODE);
        };

        _externals.isWhiteSpace = function (params) {
            var input = params || {},
                keyCode = input.keyCode;

            if (typeof keyCode === STR_UNDEFINED)
                throw new Error(KEYCODE_NOT_PROVIDED_EXCEPTION);

            return (keyCode === WHITE_SPACE_KEYCODE);
        };

        return _externals;
    })(jQuery);

    return keypressService;
});