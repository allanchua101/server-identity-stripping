Box.Application.addService("validation-service", function (context) {
    var validationService = (function ($, undefined) {
        var _externals = {},
            /*
             * Utility Constants 
             */
             FALSE = false,
             TRUE = true;

        /*
         * Public Members
         */
        _externals.checkIfNumeric = function (params) {
            var input = params || {};

            return !isNaN(input.value);
        };

        _externals.checkIfNumberIsNegative = function (params) {
            var input = params || {},
                value = input.value;

            if (value <= 0)
                return TRUE;
            else
                return FALSE;

        };

        _externals.checkHtmlExistence = function (params) {
            var input = params || {},
                inputText = input.text;

            return /</g.test(inputText) ||
                    />/g.test(inputText);
        };

        _externals.checkIfUrlHasInvalidSpace = function (params) {
            var input = params || {},
                url = input.url,
                urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

            return urlRegex.test(url);
        };

        _externals.checkIfValidDropboxLink = function (params) {
            var input = params || {},
                url = input.url,
                dropboxRegex = /www.dropbox.com\/s\/([a-zA-Z0-9\-_]+)\//;

            return dropboxRegex.test(url);
        };

        _externals.checkIfValidEmail = function (params) {
            var input = params || {},
                email = input.email,
                re = /^[,\s]*([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)[,\s]*(,[,\s]*([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)[,\s]*)*$/i;

            // Check if the input is a valid single email address or multiple email addresses using comma as a separator
            return re.test(email);
        };

        _externals.checkIfValidMultipleUrls = function (params) {
            var input = params || {},
                url = input.url,
                urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+(,\s?https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))*$/;

            return urlRegex.test(url);
        };

        _externals.checkIfValidUrlLink = function (params) {
            var input = params || {},
                url = input.url,
            urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


            return urlRegex.test(url);
        };

        _externals.checkIfValidYoutubeLink = function (params) {
            var input = params || {},
                url = input.url,
                regexYoutubeLink = /watch\?v=([a-zA-Z0-9\-_]+)/,
                regexYoutubeShortenLink = /youtu.be\/([a-zA-Z0-9\-_]+)/,
                validateUrlResult;

            if (regexYoutubeLink.test(url) === TRUE || regexYoutubeShortenLink.test(url) === TRUE)
                validateUrlResult = TRUE;

            if (regexYoutubeLink.test(url) === FALSE && regexYoutubeShortenLink.test(url) === FALSE)
                validateUrlResult = FALSE;

            return validateUrlResult;
        };

        return _externals;
    })(jQuery);

    return validationService;
});