Box.Application.addService("notification-service", function (context) {
    var notificationService = (function ($, toastr, undefined) {
        var _externals = {},
            _jqExtend = $.extend;

        /*
         * Private Methods
         */
        function _showMessage(params) {
            params = params || {};
            toastr.remove();

            if (typeof (params.title) === "undefined")
                toastr[params.method](params.msg);
            else
                toastr[params.method](params.msg, params.title);
        }

        /*
         * Public Members
         */
        _externals.clear = function () {
            toastr.remove();
        };

        _externals.showError = function (params) {
            params = params || {};

            _jqExtend(params, {
                method: "error"
            });

            _showMessage(params);
        };

        _externals.showInfo = function (params) {
            params = params || {};

            _jqExtend(params, {
                method: "info"
            });

            _showMessage(params);
        };

        _externals.showSuccess = function (params) {
            params = params || {};

            _jqExtend(params, {
                method: "success"
            });

            _showMessage(params);
        };

        _externals.showWarning = function (params) {
            params = params || {};

            _jqExtend(params, {
                method: "warning"
            });

            _showMessage(params);
        };

        return _externals;
    })(jQuery, toastr);

    return notificationService;
});