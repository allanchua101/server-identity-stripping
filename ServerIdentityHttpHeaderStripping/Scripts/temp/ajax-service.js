Box.Application.addService("ajax-service", function (context) {
    var ajaxService = (function ($, undefined) {
        var _externals = {},
            STR_UNDEFINED = "undefined",

            /*
             * Method Variables
             */
            POST_METHOD = "POST",
            GET_METHOD = "GET",
            /*
             * Type Variables
             */
            JSON_DATA_TYPE = "json",
            APPLICATION_JSON_CONTENT_TYPE = "application/json";

        /*
         * Public Members
         */
        _externals.abortRequest = function (params) {
            var input = params || {},
                promise = input.promise;

            if (promise)
                promise.abort();
        };

        _externals.send = function (params) {
            var input = params || {},
                callParams = {
                    url: input.url,
                    data: input.data,
                    type: (input.type || GET_METHOD),
                    success: function (data) {

                        if (typeof input.onSuccess !== STR_UNDEFINED)
                            input.onSuccess(data);
                    },
                    statusCode: {
                        401: function () {
                            // Status code 401 means unauthorized.
                            window.location = "/Home/Logout/";
                        }
                    },
                    error: function (err) {

                        if (typeof input.onError !== STR_UNDEFINED)
                            input.onError(err);
                    }
                };

            if (callParams.type === POST_METHOD) {
                callParams.dataType = (input.datatype || JSON_DATA_TYPE);
                callParams.contentType = (input.contenttype || APPLICATION_JSON_CONTENT_TYPE);
                callParams.data = JSON.stringify(callParams.data);
            }

            return $.ajax(callParams);
        };

        return _externals;
    })(jQuery);

    return ajaxService;
});