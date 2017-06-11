Box.Application.addService("templating-service", function (context) {
    var templateService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.buildString = function (inputString, obj) {
            for (var prop in obj) {
                inputString = inputString.replace(
                    new RegExp('{{' + prop + '}}', 'g'),
                    obj[prop]
                );
            }

            return inputString;
        };

        return _externals;
    })(jQuery);

    return templateService;
});