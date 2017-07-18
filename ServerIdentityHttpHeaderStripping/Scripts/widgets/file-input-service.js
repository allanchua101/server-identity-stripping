Box.Application.addService("file-input-service", function (context) {
    var fileInputService = (function ($, undefined) {
        var _externals = {},
            EMPTY_STRING = "",
            STR_UNDEFINED = "undefined";

        /*
         * Public Members
         */
        _externals.clear = function (params) {
            var input = params || {},
                id = input.id,
                selector = input.selector,
                element;

            if (typeof id !== STR_UNDEFINED)
                element = $("#" + id);

            if (typeof selector !== STR_UNDEFINED)
                element = $(selector);

            element.val(EMPTY_STRING);
        };

        return _externals;
    })(jQuery);

    return fileInputService;
});