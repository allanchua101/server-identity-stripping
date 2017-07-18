Box.Application.addService("modal-service", function (context) {
    var modalService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.close = function (params) {
            var input = params || {};

            $(input.selector).modal("hide");
        };

        _externals.show = function (params) {
            var input = params || {};

            $(input.selector).modal("show");
        };

        _externals.attachOnCloseEvent = function (params) {
            var input = params || {};

            $(input.selector).on("hide.bs.modal", input.event);
        };

        return _externals;
    })(jQuery);

    return modalService;
});