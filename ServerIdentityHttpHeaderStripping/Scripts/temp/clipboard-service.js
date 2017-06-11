Box.Application.addService("clipboard-service", function (context) {
    var clipboardService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.getCopiedText = function (params) {
            var input = params || {},
                e = input.event,
                incomingText;

            if (e) {
                if (e.originalEvent.clipboardData) {
                    incomingText = (e.originalEvent || e).clipboardData.getData('text/plain');
                } else if (window.clipboardData) {
                    incomingText = window.clipboardData.getData('Text');
                }
            }

            return incomingText;
        };

        return _externals;
    })(jQuery);

    return clipboardService;
});