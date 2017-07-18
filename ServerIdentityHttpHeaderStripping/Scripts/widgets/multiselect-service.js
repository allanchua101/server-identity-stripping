Box.Application.addService("multiselect-service", function (context) {
    var multiSelectService = (function ($, undefined) {
        var _externals = {},

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
         * Private Methods
         */
        function _getMultiSelect(id) {
            return $("#" + id).data("kendoMultiSelect");
        }

        function _stopScroll(dropdownId, element) {
            var activeElement;

            $(element).bind('mousewheel DOMMouseScroll', function (e) {
                var scrollTo = null;

                if (!$(activeElement).closest("#" + dropdownId + "-list").length) {
                    return;
                }

                if (e.type === 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type === 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }

                if (scrollTo) {
                    e.preventDefault();
                    element.scrollTop(scrollTo + element.scrollTop());
                }
            });

            $(element).on('mouseover', function (e) {
                activeElement = e.target;
            });
        }

        function _transformRenderParams(params) {
            var input = params || {},
                dataSource = {
                    data: input.data,
                    transport: {
                        read: {
                            url: input.sourceUrl,
                            type: (input.requestType || GET_METHOD),
                            data: input.getRequestParams
                        }
                    },
                    serverFiltering: input.serverFiltering
                };

            if (dataSource.transport.read.type === POST_METHOD) {
                dataSource.transport.read.dataType = (input.datatype || JSON_DATA_TYPE);
                dataSource.transport.read.contentType = (input.contenttype || APPLICATION_JSON_CONTENT_TYPE);
                dataSource.transport.parameterMap = function (data) {
                    return JSON.stringify(data);
                };
            }

            return {
                autoBind: input.autoBind,
                delay: input.delay,
                dataTextField: input.dataTextField,
                dataValueField: input.dataValueField,
                itemTemplate: input.itemTemplate,
                placeholder: input.placeholder,
                minLength: input.minLength,
                filter: "contains",
                dataSource: dataSource,
                change: input.onChange,
                select: input.onSelect
            };
        }

        /*
         * Public Members
         */
        _externals.clearItems = function (params) {
            var input = params || {},
                multiSelect = _getMultiSelect(input.id);

            multiSelect.value([]);
        };

        _externals.getSearchText = function (params) {
            var input = params || {};

            return $(_getMultiSelect(input.id).input).val();
        };

        _externals.getItems = function (params) {
            var input = params || {};

            return _getMultiSelect(input.id).dataItems();
        };

        _externals.render = function (params) {
            var input = params || {},
                renderOptions = _transformRenderParams(input.options),
                id = input.id,
                element = $("#" + id),
                widget;

            if (element.length > 0) {
                element.kendoMultiSelect(renderOptions);

                // NOTE: This set timeout code allows
                //       the browser to render the widget 
                //       properly before prevent its parent
                //       from scrolling further down.
                setTimeout(function () {
                    widget = _getMultiSelect(id);
                    _stopScroll(id, widget.ul.parent());
                }, 100);
            }
        };

        _externals.setValue = function (params) {
            var input = params || {};

            _getMultiSelect(input.id).value(input.value);
        };

        return _externals;
    })(jQuery);

    return multiSelectService;
});