Box.Application.addService("tooltip-service", function (context) {
    var tooltipService = (function ($, undefined) {
        var _externals = {},
            /*
             * Event Constants
             */
            POPOVER_SHOWN_EVENT = "shown.bs.popover",
            CLICK_EVENT = "click",

            /*
             * Popover Key Constants
             */
            POPOVER_KEY = "bs.popover",

            /*
             * Popover Option Constants
             */
            AUTO_PLACEMENT = "auto",
            CLICK_TRIGGER = "click",
            DESTROY_POPOVER = "destroy",
            HIDE_POPOVER = "hide",

            /*
             * Selector Constants
             */
            DEFAULT_CONTAINER = "body",
            RENDERED_POPOVER_ARIA_SELECTOR = "aria-describedby",
            RENDERED_POPOVER_CLOSE_BTN_SELECTOR = ".close",
            RENDERED_POPOVER_CONTAINER_SELECTOR = ".popover",

            /*
             * Template Constants
             */
            DEFAULT_CLOSE_BTN = "<button type='button' class='close'>&times;</button>",

            /*
             * Utility Constants
             */
            FALSE = false,
            ID_SELECTOR = "#",
            STR_UNDEFINED = "undefined",
            TRUE = true;

        /*
         * Private Members
         */
        function _getElement(params) {
            var input = params || {},
                id = input.id,
                selector = input.selector,
                element = input.element;

            if (typeof id !== STR_UNDEFINED)
                return $(ID_SELECTOR + id);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);

            if (typeof element !== STR_UNDEFINED)
                return $(element);
        }

        function _getTitle(str) {
            if (typeof str !== STR_UNDEFINED) {
                return str + DEFAULT_CLOSE_BTN;
            }
        }

        /*
         * Private Events
         */
        function _onPopOverClosedBtnClicked(e) {
            var element = $(e.data);
            
            element.popover(HIDE_POPOVER);
            element.data(POPOVER_KEY).inState.click = FALSE;
        }

        function _onPopOverShown(e) {
            var element = $(e.target),
                id = element.attr(RENDERED_POPOVER_ARIA_SELECTOR),
                popover = $(ID_SELECTOR + id);

            popover.find(RENDERED_POPOVER_CLOSE_BTN_SELECTOR)
                   .on(CLICK_EVENT, popover, _onPopOverClosedBtnClicked);
        }

        /*
         * Public Members
         */
        _externals.addTooltip = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element) {
                element.popover(DESTROY_POPOVER);

                element.popover({
                    html: TRUE,
                    title: _getTitle(input.title),
                    content: input.content,
                    placement: input.placement || AUTO_PLACEMENT,
                    trigger: input.trigger || CLICK_TRIGGER,
                    container: DEFAULT_CONTAINER,
                })
                .on(POPOVER_SHOWN_EVENT, _onPopOverShown);
            }
        };

        _externals.hideTooltips = function () {
            var popovers = $(RENDERED_POPOVER_CONTAINER_SELECTOR);

            popovers.popover(HIDE_POPOVER);

            for (var i = popovers.length; i--;) {
                $(popovers[i]).data(POPOVER_KEY).inState.click = FALSE;
            }
        };

        return _externals;
    })(jQuery);

    return tooltipService;
});