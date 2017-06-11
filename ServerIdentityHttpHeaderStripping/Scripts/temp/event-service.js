Box.Application.addService("event-service", function (context) {
    var eventService = (function ($, undefined) {
        var _externals = {},
            STR_UNDEFINED = "undefined";

        /*
         * Public Members
         */
        _externals.attachEvent = function (params) {
            var input = params || {},
                document = input.document,
                element = input.element,
                eventName = input.eventName,
                selector = input.selector,
                event = input.event;

            if (typeof selector !== STR_UNDEFINED)
                $(selector).on(eventName, event);

            if (typeof element !== STR_UNDEFINED)
                $(element).on(eventName, event);

            if (typeof document !== STR_UNDEFINED)
                $(document).on(eventName, event);
        };

        _externals.delegateEvent = function (params) {
            var input = params || {};

            $(input.selector).on(
                input.eventName,
                input.itemsSelector,
                input.event
            );
        };

        _externals.triggerEvent = function (params) {
            var input = params || {};

            $(input.element).trigger(input.event);
        };

        return _externals;
    })(jQuery);

    return eventService;
});