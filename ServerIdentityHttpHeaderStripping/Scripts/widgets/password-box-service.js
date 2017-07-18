Box.Application.addService("password-box-service", function (context) {
    var passwordBoxService = (function ($, undefined) {
        var _externals = {},
            /*
             * UTILITY CONSTANTS
             */
            NULL = null,
            TYPE_PROPERTY = "type";

        /*
         * Private Methods
         */
        function _getPasswordBox(id) {
            var passwordBox = $("#" + id);

            return passwordBox.length > 0 ? passwordBox : NULL;
        }

        /*
         * Public Members
         */
        _externals.hidePassword = function (params) {
            var input = params || {},
                passwordBox = _getPasswordBox(input.id);

            if (passwordBox !== NULL)
                passwordBox.prop(TYPE_PROPERTY, "password");
        };

        _externals.showPassword = function (params) {
            var input = params || {},
                passwordBox = _getPasswordBox(input.id);

            if (passwordBox !== NULL)
                passwordBox.prop(TYPE_PROPERTY, "text");
        };

        return _externals;
    })(jQuery);

    return passwordBoxService;
});