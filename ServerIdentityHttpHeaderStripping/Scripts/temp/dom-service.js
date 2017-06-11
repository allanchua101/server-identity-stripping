Box.Application.addService("dom-service", function (context) {
    var domService = (function ($, undefined) {
        var _externals = {},
            DISABLED_PROPERTY = "disabled",
            FALSE = false,
            ID_SELECTOR = "#",
            STR_UNDEFINED = "undefined",
            TRUE = true;

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                selector = input.selector,
                element = input.element;

            if (typeof id !== STR_UNDEFINED)
                return $("#" + id);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);

            if (typeof element !== STR_UNDEFINED)
                return $(element);
        }

        /*
         * Public Members
         */
        _externals.addClass = function (params) {
            var input = params || {},
                element = _getElement(input),
                className = input.className;

            if (typeof element !== STR_UNDEFINED)
                element.addClass(className);
        };

        _externals.appendHtmlString = function (params) {
            var input = params || {};

            $(input.html).appendTo(input.parentSelector);
        };

        _externals.checkClassExistence = function (params) {
            var input = params || {},
                element = _getElement(input);

            return element.hasClass(input.className);
        };

        _externals.clearHtml = function (params) {
            var input = params || {},
                element = _getElement(input);

            element.empty();
        };

        _externals.disableElement = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, TRUE);
        };

        _externals.enableElement = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, FALSE);
        };

        _externals.findElement = function (params) {
            var input = params || {},
                element = _getElement(input);
            if (typeof element !== STR_UNDEFINED)
                return element.find(input.targetSelector);
        };

        _externals.getAllElements = function (params) {
            var input = params || {};

            if (typeof input.selector !== STR_UNDEFINED)
                return $(input.selector);
            
        };

        _externals.getClosest = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.closest(input.targetSelector);
        };

        _externals.getElementById = function (params) {
            var input = params || {},
                id = input.id;

            return $("#" + id);
        };

        _externals.getElement = function (params) {
            var input = params || {},
                results;

            if (typeof input.selector !== STR_UNDEFINED) {
                results = $(input.selector);

                if (results.length > 0)
                    return results[0];
            }
        };

        _externals.getElementData = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.data(input.key);
        };

        _externals.getElementAttribute = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.prop(input.name);
        };

        _externals.getElementId = function (params) {
            var input = params || {},
                id = input.element.element.context.id;

            if (typeof id !== STR_UNDEFINED)
                return id;
        };

        _externals.getId = function (params) {
            var input = params || {},
                id = input.element.id;

            if (typeof id !== STR_UNDEFINED)
                return id;
        };

        _externals.getElementParent = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.parent(input.parentSelector);
        };

        _externals.getElementsByClass = function (params) {
            var input = params || {};

            if (typeof input.selector !== STR_UNDEFINED)
                return $(input.selector).toArray();

            if (typeof input.className !== STR_UNDEFINED)
                return $("." + input.className).toArray();
        };

        _externals.getElementsBySelector = function (params) {
            var input = params || {};

            return $(input.selector).toArray();
        };

        _externals.getNextSibling = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.next();
        };

        _externals.getPreviousSibling = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.prev();
        };

        _externals.getText = function (params) {
            var input = params || {};

            if (typeof input.selector !== STR_UNDEFINED)
                return $(input.selector).text();

            if (typeof input.element !== STR_UNDEFINED)
                return $(input.element).text();
        };

        _externals.getValue = function (params) {
            var input = params || {};

            if (typeof input.id !== STR_UNDEFINED)
                return $(ID_SELECTOR + input.id).val();

            if (typeof input.selector !== STR_UNDEFINED)
                return $(input.selector).val();

            if (typeof input.element !== STR_UNDEFINED)
                return $(input.element).val();
        };

        _externals.is = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                return element.is(input.testSelector);
        };

        _externals.prependHtmlStringBefore = function (params) {
            var input = params || {};

            $(input.parentSelector).before(input.html);
        };

        _externals.remove = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.remove();
        };

        _externals.removeAttribute = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.removeAttr(input.attributeName);
        };

        _externals.removeChildNodes = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.empty();
        };

        _externals.removeClass = function (params) {
            var input = params || {},
                element = _getElement(input),
                className = input.className;

            if (typeof element !== STR_UNDEFINED)
                element.removeClass(className);
        };

        _externals.setElementAttribute = function (params) {
            var input = params || {},
                value = input.value,
                attributeName = input.attributeName,
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.prop(attributeName, value);
        };

        _externals.setElementDataAttribute = function (params) {
            var input = params || {},
                value = input.value,
                attributeName = input.attributeName,
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.data(attributeName, value);
        };

        _externals.setHtml = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.html(input.content);
        };

        _externals.setText = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED)
                element.text(input.text);
        };

        _externals.slideToggle = function (params) {
            var input = params || {},
                element = _getElement(input),
                duration = input.duration || 400;


            if (typeof element !== STR_UNDEFINED)
                element.slideToggle(duration, input.callback);
        };

        _externals.slideUp = function (params) {
            var input = params || {},
                element = _getElement(input),
                duration = input.duration || 400;


            if (typeof element !== STR_UNDEFINED)
                element.slideUp(duration, input.callback);
        };

        _externals.toggleClass = function (params) {
            var input = params || {},
                element = _getElement(input),
                className = input.className;

            if (typeof element !== STR_UNDEFINED)
                element.toggleClass(className);
        };

        return _externals;
    })(jQuery);

    return domService;
});