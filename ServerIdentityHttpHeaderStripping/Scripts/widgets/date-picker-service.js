Box.Application.addService("date-picker-service", function (context) {
    var datePickerService = (function ($, kendo, undefined) {
        var _externals = {},

            /*
             * Selector Constants
             */
            BASE_DATE_PICKER_ICON = "k-icon k-i-calendar",
            CALENDAR_SELECTOR_SUFFIX = "_dateview",
            DATE_PICKER_START_SELECTOR = "[aria-controls^='",
            DATE_PICKER_END_SELECTOR = "']",
            NO_TODAY_HIGHLIGHT_CLASS = "date-picker-no-today-highlight",
            SPAN_ELEMENT = "span",

            /*
             * Template Constants
             */
            HIGHLIGHTED_MONTH_CONTENT_TEMPLATE = "# for(var i = 0, len = data.dates.length; i < len; i++) { " +
                                                        "var d = data.dates[i], " +
                                                            "found = false; " +
                                                        "if (data.date.getFullYear() === d.getFullYear() && " +
                                                            "data.date.getMonth() === d.getMonth() && " +
                                                            "data.date.getDate() === d.getDate()) { " +
                                                                "found = true; " +
                                                                "break; " +
                                                        "} " +
                                                 "} " +
                                                 "if(found) { #" +
                                                    "<div class='highlighted-date'>#= data.value #" + "</div> " +
                                                 "# } else { #" +
                                                    "#= data.value #" +
                                                 "# } #",

            /*
             * Utility Constants
             */
            EMPTY_STRING = "",
            FALSE = false,
            ID_SELECTOR = "#",
            NULL = null,
            STR_UNDEFINED = "undefined",
            TRUE = true;

        /*
         * Private Methods
         */
        function _getDatePickerCalendar(id) {
            return $(ID_SELECTOR + id + CALENDAR_SELECTOR_SUFFIX);
        }

        function _getDatePicker(id) {
            return $(ID_SELECTOR + id).data("kendoDatePicker");
        }

        function _getPickerSelector(Id) {
            return $(DATE_PICKER_START_SELECTOR + Id + DATE_PICKER_END_SELECTOR);
        }

        function _getPickerIconSelector(Element) {
            return $(Element).children(SPAN_ELEMENT);
        }

        function _removeTodayBackground(id) {
            var datePickerCalendar = _getDatePickerCalendar(id);

            $(datePickerCalendar).addClass(NO_TODAY_HIGHLIGHT_CLASS);
        }

        function _setDatePickerIcon(pickerId, pickerIcon) {
            var pickerSelector = NULL,
                pickerIconSelector = NULL;

            if (pickerIcon) {
                pickerSelector = _getPickerSelector(pickerId);
                pickerIconSelector = _getPickerIconSelector(pickerSelector);

                pickerIconSelector.text(EMPTY_STRING);
                pickerIconSelector.addClass(pickerIcon);
                pickerIconSelector.removeClass(BASE_DATE_PICKER_ICON);
            }
        }

        function _setHighlightedMonthContent(params) {
            params.month = {
                content: HIGHLIGHTED_MONTH_CONTENT_TEMPLATE
            };
        }

        function _transformRenderParams(params) {
            var input = params || {};

            return {
                value: input.value,
                icon: input.icon,
                max: input.max,
                min: input.min,
                change: input.onChange,
                dates: input.dates,
                removeTodayBackground: input.removeTodayBackground
            };
        }

        /*
         * Public Members
         */
        _externals.clearValue = function (params) {
            var input = params || {},
                datePicker = _getDatePicker(input.id);

            datePicker.value(NULL);
        };

        _externals.disable = function (params) {
            var input = params || {},
                datePicker = _getDatePicker(input.id);

            if (datePicker !== NULL)
                datePicker.enable(FALSE);
        };

        _externals.enable = function (params) {
            var input = params || {},
                datePicker = _getDatePicker(input.id);

            if (datePicker !== NULL)
                datePicker.enable(TRUE);
        };

        _externals.getFormattedValue = function (params) {
            var input = params || {},
                datePicker = _getDatePicker(input.id),
                value;

            if (datePicker !== NULL) {
                value = datePicker.value();
                return kendo.toString(value, input.format);
            }
        };

        _externals.getValue = function (params) {
            var input = params || {};

            return _getDatePicker(input.id).value();
        };

        _externals.render = function (params) {
            var input = params || {},
                id = input.id,
                options = input.options,
                renderParams = _transformRenderParams(options);

            if (typeof options.highlightDates !== STR_UNDEFINED
                    && options.highlightDates) {
                _setHighlightedMonthContent(renderParams);
            }

            $(ID_SELECTOR + id).kendoDatePicker(renderParams);

            if (typeof renderParams.removeTodayBackground !== STR_UNDEFINED
                    && renderParams.removeTodayBackground) {
                _removeTodayBackground(id);
            }

            _setDatePickerIcon(input.id, renderParams.icon);
        };

        _externals.setValue = function (params) {
            var input = params || {};

            return _getDatePicker(input.id).value(input.value);
        };

        _externals.setMinValue = function (params) {
            var input = params || {},
                id = input.id,
                datePicker = _getDatePicker(id);

            datePicker.min(input.minValue);
        };

        return _externals;
    })(jQuery, kendo);

    return datePickerService;
});