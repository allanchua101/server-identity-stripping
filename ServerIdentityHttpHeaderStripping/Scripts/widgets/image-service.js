Box.Application.addService("image-service", function (context) {
    var imageService = (function ($, undefined) {
        var _externals = {},

             /*
             * Utility Constants
             */
             STR_UNDEFINED = "undefined";

        function _getElement(params) {
            var input = params || {},
                id = input.id,
                selector = input.selector;
            if (typeof id !== STR_UNDEFINED)
                return $("#" + id);

            if (typeof selector !== STR_UNDEFINED)
                return $(selector);
        }

        /*
         * Public Members
         */
        _externals.setImageSrc = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element) {
                if (input.file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        element.attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.file);
                }
                else
                {
                    element.attr('src', input.src);
                }
            }
        };

        _externals.clearSrc = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (typeof element !== STR_UNDEFINED) {
                element.removeAttr("src");
            }
        };

        return _externals;
    })(jQuery);

    return imageService;

});