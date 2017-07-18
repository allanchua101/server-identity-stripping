Box.Application.addService("textbox-service", function (context) {
    var textboxService = (function ($, undefined) {
        var _externals = {},
            /*
             * Property Constants
             */
            DISABLED_PROPERTY = "disabled",
            READONLY_PROPERTY = "readonly",
            /*
             * Utility Constants
             */
             EMPTY_STRING = "",
             FALSE = false,
             STR_UNDEFINED = "undefined",
             TRUE = true;

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                selector = input.selector;

            if (typeof id !== STR_UNDEFINED)
                return $("#" + id);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);
        }

        /*
         * Public Members
         */
        _externals.clear = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.val(EMPTY_STRING);
        };

        _externals.disable = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, TRUE);
        };

        _externals.enable = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, FALSE);
        };

        _externals.getValue = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                return element.val();
        };

        _externals.setReadOnly = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(READONLY_PROPERTY, input.isReadOnly);
        };

        _externals.setValue = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.val(input.text);
        };

        return _externals;
    })(jQuery);

    return textboxService;
});