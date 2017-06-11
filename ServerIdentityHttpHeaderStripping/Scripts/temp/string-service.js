Box.Application.addService("string-service", function (context) {
    var stringService = (function ($, kendo, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.trim = function (params) {
            var input = params || {};

            return $.trim(input.string);
        };

        _externals.endsWith = function (params) {
            var input = params || {},
                index = input.str.indexOf(
                            input.suffix,
                            input.str.length - input.suffix.length
                        );

            return index !== -1;
        };

        _externals.format = function (params) {
            var input = params || {};

            return kendo.toString(input.value, input.format);
        };

        _externals.formatNumber = function (params) {
            var input = params || {};

            return kendo.toString(input.value, "n0");
        };

        _externals.formatTwoDecimalValue = function (params) {
            var input = params || {};

            return kendo.toString(input.value, "n2");
        };

        return _externals;
    })(jQuery, kendo);

    return stringService;
});