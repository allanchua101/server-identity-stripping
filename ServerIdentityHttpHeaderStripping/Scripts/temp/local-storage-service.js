Box.Application.addService("local-storage-service", function (context) {
    var localStorageService = (function ($, localStorage, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.contains = function (params) {
            var input = params || {};

            return localStorage.getItem(input.key) !== null;
        };

        _externals.get = function(params) {
            var input = params || {};

            return localStorage.getItem(input.key);
        };

        _externals.store = function (params) {
            var input = params || {};

            return localStorage.setItem(input.key, input.data);
        };

        return _externals;
    })(jQuery, localStorage);

    return localStorageService;
});