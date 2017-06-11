Box.Application.addService("busy-indicator-service", function (context) {
    var busyIndicatorService = (function ($, undefined) {
        var _externals = {},

        /*
         * Selector Constants
         */
        BUSY_INDICATOR_MESSAGE_LIST_ID = "busy-indicator-message-list",
        BUSY_INDICATOR_CONTAINER_ID = "#busy-indicator-container",
        HIDDEN_CLASS = "hidden",

        /*
         * Template Constants
         */
        MESSAGE_ITEM_TEMPLATE = "<li><label>[MESSAGE]</label></li>",
        MESSAGE_TEMPLATE = "[MESSAGE]",

        /*
         * Utility Constants
         */
        _messages = [],
        EMPTY_STRING = "",
        ID_SELECTOR = "#",
        STR_UNDEFINED = "undefined";

        /*
         * Private Members
         */
        function _addMessage(msg) {
            _messages.push(msg);
            _updateMessages();
        }

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                element = input.element,
                selector = input.selector;

            if (typeof id !== STR_UNDEFINED)
                return $(ID_SELECTOR + id);

            if (typeof element !== STR_UNDEFINED)
                return $(element);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);
        }

        function _removeMessage(msg) {
            var busyIndicator = $(BUSY_INDICATOR_CONTAINER_ID);

            _messages = $.grep(_messages, function (value) {
                return value !== msg;
            });

            if (_messages.length) {
                _updateMessages();
            } else {
                busyIndicator.addClass(HIDDEN_CLASS);
            }
        }

        function _updateMessages() {
            var i = 0,
                len = _messages.length,
                messages = EMPTY_STRING,
                messageList = _getElement({ id: BUSY_INDICATOR_MESSAGE_LIST_ID });

            for (; i < len; i++) {
                messages += MESSAGE_ITEM_TEMPLATE.replace(MESSAGE_TEMPLATE, _messages[i]);
            }

            messageList.html(messages);
        }

        /*
         * Public Members
         */
        _externals.show = function (params) {
            var input = params || {},
                busyIndicator = $(BUSY_INDICATOR_CONTAINER_ID);

            busyIndicator.removeClass(HIDDEN_CLASS);
            _addMessage(input.msg);
        };

        _externals.hide = function (params) {
            var input = params || {};

            _removeMessage(input.msg);
        };

        return _externals;
    })(jQuery);

    return busyIndicatorService;
});