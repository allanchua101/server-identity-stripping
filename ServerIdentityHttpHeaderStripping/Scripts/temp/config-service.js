Box.Application.addService("config-service", function (context) {
    var configService = (function () {
        var _externals = {},
            _getService = function (serviceName) {
                return context.getService(serviceName);
            },

            /*
             * Selector Variables
             */
            BODY_SELECTOR = "body",

            /*
             * Service References
             */
            domService = _getService("dom-service"),

            /*
             * Key Variables
             */
            TARGET_VIEW_URL_KEY = "targetviewurl",
            API_SESSION_ID_KEY = "apisessionid";

        _externals.getTargetViewUrl = function () {
            return domService.getElementData({
                selector: BODY_SELECTOR,
                key: TARGET_VIEW_URL_KEY
            });
        };

        _externals.getApiSessionId = function () {
            return domService.getElementData({
                selector: BODY_SELECTOR,
                key: API_SESSION_ID_KEY
            });
        };

        return _externals;
    })();

    return configService;
});