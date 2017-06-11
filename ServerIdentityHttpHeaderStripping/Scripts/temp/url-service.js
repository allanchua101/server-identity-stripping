Box.Application.addService("url-service", function (context) {
    var urlService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.getParameterFromUrl = function (params) {
            var input = params || {},
                paramName = input.paramName,
                qstrs = window.location.search.substr(1).split('&');

            for (var i = 0; i < qstrs.length; i++) {
                var p = qstrs[i].split('=');
                if (p[0] === paramName) {
                    return decodeURIComponent(p[1]);
                }
            }
            return false;
        };

        return _externals;
    })(jQuery);

    return urlService;
});