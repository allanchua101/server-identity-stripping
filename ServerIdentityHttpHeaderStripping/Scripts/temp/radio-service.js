Box.Application.addService("radio-service", function (context) {
    var radioService = (function ($, undefined) {
        var _externals = {},

            /*
             * Event Constants
             */
            CLICK_EVENT = "click",
            SIGHTLY_CLICK_EVENT = "sightly-click",

            /*
             * Property Constants
             */
            CHECKED_PROPERTY_KEY = "checked",
            DISABLED_PROPERTY = "disabled",

            /*
             * Selector Constants
             */
            CHECKED_PSUEDO_CLASS_SELECTOR = ":checked",
            LABEL_ELEMENT = "label",
            PADDING_NONE_CLASS = "padding-none",
            RADIO_INLINE_CLASS = "radio-inline",
            SIGHTLY_RADIO_LABEL_CLASS = "sightly-radio-label",

            /*
             * Template Constants
             */
            CHECKBOX_GROUP_TEMPLATE = "label > input[type='radio'][name='{CHECKBOX-NAME}']",
            CHECKBOX_NAME_TEMPLATE = "{CHECKBOX-NAME}",

            /*
             * Utility Constants
             */
            CLASS_SELECTOR = ".",
            STR_UNDEFINED = "undefined",
            TRUE = true,
            FALSE = false;

        /*
         * Private Members
         */
        function _getClassSelector(className) {
            return CLASS_SELECTOR + className;
        }

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                element = input.element,
                selector = input.selector;

            if (typeof id !== STR_UNDEFINED)
                return $("#" + id);

            if (typeof element !== STR_UNDEFINED)
                return $(element);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);
        }

        /*
         * Public Members
         */
        _externals.check = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element) {
                element.prop(CHECKED_PROPERTY_KEY, TRUE)
                       .trigger(SIGHTLY_CLICK_EVENT);
            }
        };

        _externals.convertToSightlyRadio = function (params) {
            var input = params || {},
                checkboxesSelector = CHECKBOX_GROUP_TEMPLATE.replace(CHECKBOX_NAME_TEMPLATE, input.name),
                checkboxes = $(checkboxesSelector),
                selectedParent,
                parentLabels;

            if (checkboxes) {
                parentLabels = checkboxes.parent(LABEL_ELEMENT);
                parentLabels.addClass(SIGHTLY_RADIO_LABEL_CLASS);
                parentLabels.parent(_getClassSelector(RADIO_INLINE_CLASS))
                            .addClass(PADDING_NONE_CLASS);
                selectedParent = $(checkboxesSelector + CHECKED_PSUEDO_CLASS_SELECTOR).parent(_getClassSelector(SIGHTLY_RADIO_LABEL_CLASS));
                selectedParent.addClass(CHECKED_PROPERTY_KEY);

                checkboxes.on(SIGHTLY_CLICK_EVENT, function () {
                    var sender = $(this),
                        parentLabel = sender.parent(_getClassSelector(SIGHTLY_RADIO_LABEL_CLASS));

                    parentLabels.removeClass(CHECKED_PROPERTY_KEY);
                    parentLabel.addClass(CHECKED_PROPERTY_KEY);
                }).on(CLICK_EVENT, function () {
                    $(this).trigger(SIGHTLY_CLICK_EVENT);
                });
            }
        };

        _externals.disable = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, TRUE);
        };

        _externals.enable = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(DISABLED_PROPERTY, FALSE);
        };

        _externals.getValue = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                return element.val();
        };

        _externals.isChecked = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                return element.is(CHECKED_PSUEDO_CLASS_SELECTOR);
        };

        _externals.uncheck = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.prop(CHECKED_PROPERTY_KEY, FALSE);
        };

        return _externals;
    })(jQuery);

    return radioService;
});