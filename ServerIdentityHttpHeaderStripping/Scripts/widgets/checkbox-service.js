Box.Application.addService("checkbox-service", function (context) {
    var checkboxService = (function ($, undefined) {
        var _externals = {},
            /*
             * Property Constants
             */
            CHECKED_PROPERTY_KEY = "checked",
            DISABLED_PROPERTY = "disabled",
            
            /*
             * Utility Constants
             */
            STR_UNDEFINED = "undefined",
            TRUE = true,
            FALSE = false;

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                element = input.element,
                selector = input.selector;

            if (typeof id !== STR_UNDEFINED)
                return $("#" + id);

            if (typeof element !== STR_UNDEFINED)
                return $(element);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);
        }

        /*
         * Public Members
         */
        _externals.check = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(CHECKED_PROPERTY_KEY, TRUE);
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

        _externals.isChecked = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                return element.prop(CHECKED_PROPERTY_KEY);
        };

        _externals.uncheck = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(CHECKED_PROPERTY_KEY, FALSE);
        };

        return _externals;
    })(jQuery);

    return checkboxService;
});