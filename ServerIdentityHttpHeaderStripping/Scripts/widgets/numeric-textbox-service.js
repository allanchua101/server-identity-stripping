Box.Application.addService("numeric-textbox-service", function (context) {
    var numericTextboxService = (function ($, undefined) {
        var _externals = {},
            /*
             * Constants
             */
            FALSE = false,
            NULL = null,
            STR_UNDEFINED = "undefined",
            TRUE = true;


        /*
         * Private Methods
         */
        function _getNumericTextBox(id) {
            return $("#" + id).data("kendoNumericTextBox");
        }

        function _transformRenderParams(params) {
            var input = params || {};

            return {
                format: input.format,
                min: input.min,
                max: input.max,
                value: input.value,
                decimals: input.decimals,
                spinners: input.spinners,
                change: input.onChange
            };
        }

        /*
         * Public Members
         */
        _externals.clearValue = function (params) {
            var input = params || {},
                numericTextbox = _getNumericTextBox(input.id);

            if (typeof numericTextbox !== STR_UNDEFINED)
                numericTextbox.value(NULL);
        };

        _externals.destroy = function (params) {
            var input = params || {},
                numericTextbox = _getNumericTextBox(input.id);

            if (numericTextbox !== NULL)
                numericTextbox.destroy();
        };

        _externals.disable = function (params) {
            var input = params || {},
                numericTextbox = _getNumericTextBox(input.id);

            if (numericTextbox !== NULL)
                numericTextbox.enable(FALSE);
        };

        _externals.enable = function (params) {
            var input = params || {},
                numericTextbox = _getNumericTextBox(input.id);

            if (numericTextbox !== NULL)
                numericTextbox.enable(TRUE);
        };

        _externals.getValue = function (params) {
            var input = params || {};

            return _getNumericTextBox(input.id).value();
        };

        _externals.hide = function (params) {
            var input = params || {};

            _getNumericTextBox(input.id).wrapper.hide();
        };

        _externals.hideSpinners = function (params) {
            var input = params || {},
                numericTexbox = _getNumericTextBox(input.id);


            numericTexbox.wrapper
                         .find(".k-numeric-wrap")
                         .removeClass("expand-padding")
                         .find(".k-select")
                         .hide();
        };

        _externals.render = function (params) {
            var input = params || {},
                renderParams = _transformRenderParams(input.options);

            $("#" + input.id).kendoNumericTextBox(renderParams);
        };

        _externals.setValue = function (params) {
            var input = params || {};

            return _getNumericTextBox(input.id).value(input.value);
        };

        _externals.show = function (params) {
            var input = params || {};

            _getNumericTextBox(input.id).wrapper.show();
        };

        return _externals;
    })(jQuery);

    return numericTextboxService;
});