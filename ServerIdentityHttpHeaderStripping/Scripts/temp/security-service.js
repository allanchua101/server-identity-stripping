Box.Application.addService("security-service", function (context) {
    var ajaxService = (function ($, undefined) {
        var _externals = {};

        /*
         * Public Members
         */
        _externals.getSHA256Hash = function (params) {
            var input = params || {},
                stringToHash = input.stringToHash;

            var words = CryptoJS.enc.Utf8.parse(stringToHash);
            var hash = CryptoJS.SHA256(words);
            return hash.toString(CryptoJS.enc.Base64);
        };

        return _externals;
    })(jQuery);

    return ajaxService;
});