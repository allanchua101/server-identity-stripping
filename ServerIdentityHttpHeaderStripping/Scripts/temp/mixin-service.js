Box.Application.addService("mixin-service", function (context) {
    var mixinService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.extend = function (params) {
            var input = params || {};

            return $.extend({}, input.obj1, input.obj2);
        };

        return _externals;
    })(jQuery);

    return mixinService;
});