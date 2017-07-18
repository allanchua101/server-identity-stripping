Box.Application.addService("dropdown-service", function (context) {
    var dropdownService = (function ($, undefined) {
        var _externals = {},

            /*
             * Selector Constants
             */
            BASE_KENDO_ICON = "k-icon k-i-arrow-s",
            HIDDEN_CLASS = "hidden",
            LIST_SELECTOR = ".k-list",
            LIST_WITH_HEADER_CLASS = "list-with-headers",
            NO_BORDER_DROPDOWN = "no-border-kendo-dropdown",
            OPTION_LABEL_SELECTOR = ".k-list-optionlabel",
            POPUP_LIST_SELCTOR_SUFFIX = "-list",
            RENDERED_DROPDOWN_CONTAINER = "k-dropdown",
            RENDERED_DROPDOWN_ICON = "k-select",
            SELECTED_ITEM_SPAN_SELECTOR = ".k-input",
            SPAN_ELEMENT = "span",
            NON_PLACEHOLDER_ITEM_INDICATOR_CLASS = "rendered-selected-item",
            
            /*
             * Utility Constants
             */
            DIRECT_DESCENDANT_SELECTOR = ">",
            EMPTY_STRING = "",
            FALSE = false,
            ID_SELECTOR = "#",
            NULL = null,
            STR_AUTO = "auto",
            STR_UNDEFINED = "undefined",
            TRUE = true;
        
        /*
         * Private Methods
         */
        function _addNonPlaceholderItemIndicator(dropdown) {
            var dropdownWrapper = $(dropdown.wrapper),
                selectedValueElement = $(SELECTED_ITEM_SPAN_SELECTOR, dropdownWrapper);

            selectedValueElement.addClass(NON_PLACEHOLDER_ITEM_INDICATOR_CLASS);
        }

        function _displayCustomizedIcon(input) {
            if (input.customIcon && input.moduleSelector) {
                _setDropdownIcon(
                    input.moduleSelector,
                    input.customIcon
                );

                if (!input.hasPlaceHolder)
                    _setDropdownContainer(input.moduleSelector);
            }
        }

        function _getDropDown(id) {
            return $(ID_SELECTOR + id).data("kendoDropDownList");
        }

        function _getDropdownPopupList(id) {
            var selector = ID_SELECTOR + id + POPUP_LIST_SELCTOR_SUFFIX;

            return $(selector);
        }

        function _hideOptionLabel(id) {
            var dropdownPopup = _getDropdownPopupList(id);

            $(OPTION_LABEL_SELECTOR, dropdownPopup).addClass(HIDDEN_CLASS);
        }

        function _preventAutoCloseOnSelect(id) {
            var widget = _getDropDown(id),
                elementListWrap = widget.ul.parent(),
                lastTarget;

            if (widget) {
                $(document.body).delegate("*", "mouseover", function (e) {
                    lastTarget = e.target;
                });

                widget.popup.bind("close", function (e) {
                    if ($.contains(elementListWrap[0], lastTarget)) {
                        e.preventDefault();
                    }
                });
            }
        }

        function _preventCloseOnScrollToEdge(id) {
            var widget = _getDropDown(id);

            _stopScroll(id, widget.ul.parent());
        }

        function _removeNonPlaceholderItemIndicator(dropdown) {
            var dropdownWrapper = $(dropdown.wrapper),
                selectedValueElement = $(SELECTED_ITEM_SPAN_SELECTOR, dropdownWrapper);

            selectedValueElement.removeClass(NON_PLACEHOLDER_ITEM_INDICATOR_CLASS);
        }

        function _setDropdownIcon(moduleSelector, icon) {
            var dropdownIcon = $(moduleSelector).find("." + RENDERED_DROPDOWN_ICON + DIRECT_DESCENDANT_SELECTOR + SPAN_ELEMENT);

            dropdownIcon.text(EMPTY_STRING);
            dropdownIcon.addClass(icon);
            dropdownIcon.removeClass(BASE_KENDO_ICON);
        }

        function _setDropdownContainer(moduleSelector) {
            var dropdownContainer = $(moduleSelector).find("." + RENDERED_DROPDOWN_CONTAINER);

            dropdownContainer.addClass(NO_BORDER_DROPDOWN);
        }

        function _setItemWithHeadersStyle(id) {
            var dropdownPopup = _getDropdownPopupList(id);

            $(LIST_SELECTOR, dropdownPopup).addClass(LIST_WITH_HEADER_CLASS);
        }

        function _setListWidthToAuto(id) {
            var widget = _getDropDown(id);

            if (widget) {
                widget.list.width(STR_AUTO);
                $("#" + id + "-list").addClass("no-wrap");

                widget.bind("open", function () {
                    var minWidth = $("#" + id).width() - 6;

                    widget.list.css({
                        "min-width": minWidth
                    });
                });
            }
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

        function _toggleNonPlaceholderIndicatorClass(dropdown) {
            var selectedValue = dropdown.value();

            if (selectedValue === NULL
                || selectedValue === EMPTY_STRING)
                _removeNonPlaceholderItemIndicator(dropdown);
            else
                _addNonPlaceholderItemIndicator(dropdown);
        }

        function _transformRenderParams(params) {
            var input = params || {},
                config = {
                    dataValueField: input.dataValueField,
                    dataTextField: input.dataTextField,
                    cascadeFrom: input.cascadeFrom,
                    change: function (evt) {
                        var dropdown = evt.sender;

                        _toggleNonPlaceholderIndicatorClass(dropdown);

                        if (input.onChange)
                            input.onChange(evt);
                    },
                    select: input.onSelect,
                    enabled: input.enabled,
                    dataBound: input.onDataBound,
                    hideOptionLabel: input.hideOptionLabel,
                    optionLabel: input.optionLabel,
                    template: input.template,
                    valueTemplate: input.valueTemplate,
                    value: input.value,
                    itemWithHeaders: input.itemWithHeaders
                };

            if (typeof input.dsServerFiltering !== STR_UNDEFINED) {
                config.dataSource = {
                    serverFiltering: input.dsServerFiltering,
                    transport: {
                        read: {
                            url: input.dsReadUrl,
                            data: input.dsReadData
                        }
                    }
                };
            }

            if (typeof input.data !== STR_UNDEFINED) {
                config.dataSource = input.data;
            }

            return config;
        }

        /*
         * Public Members
         */
        _externals.addItem = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id),
                index,
                items;

            if (typeof dropdown !== STR_UNDEFINED) {
                items = dropdown.dataSource.data();
                index = input.index || items.length || 0;

                dropdown.dataSource.insert(index, input.item);
            }
        };

        _externals.clearValue = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                dropdown.value(NULL);

            _removeNonPlaceholderItemIndicator(dropdown);
        };

        _externals.disable = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                dropdown.enable(FALSE);
        };

        _externals.destroy = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED
                && dropdown !== NULL)
                dropdown.destroy();
        };

        _externals.enable = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                dropdown.enable(TRUE);
        };

        _externals.hide = function (params) {
            var input = params || {};

            _getDropDown(input.id).wrapper.hide();
        };

        _externals.getDataItem = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                return dropdown.dataItem();
        };

        _externals.getItems = function (params) {
            var input = params || {};

            return _getDropDown(input.id).dataSource.data();
        };

        _externals.getItemViaKeyValue = function (params) {
            var input = params || {},
                id = input.id,
                currentItem,
                dropDown,
                view;

            if (typeof id !== STR_UNDEFINED)
                dropDown = _getDropDown(id);

            if (typeof dropDown !== STR_UNDEFINED) {
                view = dropDown.dataSource.view();

                for (var i = view.length; i--;) {
                    currentItem = view[i];

                    if (currentItem[input.key] === input.value)
                        return currentItem;
                }
            }

            return null;
        };

        _externals.getListView = function (params) {
            var input = params || {},
                id = input.id,
                dropdown;

            if (typeof id !== STR_UNDEFINED)
                dropdown = _getDropDown(id);
            
            if (typeof dropdown !== STR_UNDEFINED)
                return dropdown.listView.element[0];
        };

        _externals.getText = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                return dropdown.text();
        };

        _externals.getValue = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED)
                return dropdown.value();
        };

        _externals.removeItem = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED) {
                dropdown.dataSource.remove(input.item);
            }
        };

        _externals.selectFirstItem = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED
                    && dropdown.dataSource.data().length > 0) {
                dropdown.select(0);
                _toggleNonPlaceholderIndicatorClass(dropdown);
            }
        };

        _externals.selectLastItem = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id),
                lastIndex;

            if (typeof dropdown !== STR_UNDEFINED) {
                lastIndex = dropdown.dataSource.data().length - 1;

                if (lastIndex > -1) {
                    dropdown.select(lastIndex);
                    _toggleNonPlaceholderIndicatorClass(dropdown);
                }
            }
        };

        _externals.setItems = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id),
                itemsReplica;
            
            if (typeof dropdown !== STR_UNDEFINED) {
                itemsReplica = input.items.slice(0);

                dropdown.dataSource.data(itemsReplica);

                if (itemsReplica.length === 0)
                    _removeNonPlaceholderItemIndicator(dropdown);
            }
        };

        _externals.setValue = function (params) {
            var input = params || {},
                value = input.value || NULL,
                id = input.id,
                dropdown;
            
            if (typeof id !== STR_UNDEFINED)
                dropdown = _getDropDown(id);


            if (dropdown) {
                dropdown.value(value);

                _toggleNonPlaceholderIndicatorClass(dropdown);
            }
        };

        _externals.show = function (params) {
            var input = params || {};

            _getDropDown(input.id).wrapper.show();
        };

        _externals.sort = function (params) {
            var input = params || {},
                dropdown = _getDropDown(input.id);

            if (typeof dropdown !== STR_UNDEFINED) {
                dropdown.dataSource.sort({
                    field: input.field,
                    dir: input.dir
                });
            }
        };

        _externals.render = function (params) {
            var input = params || {},
                renderOptions = _transformRenderParams(input.options),
                id = input.id,
                element = $("#" + id);

            if (element.length > 0) {
                element.kendoDropDownList(renderOptions);

                if (typeof renderOptions.hideOptionLabel !== STR_UNDEFINED
                        && renderOptions.hideOptionLabel)
                    _hideOptionLabel(id);

                if (typeof renderOptions.itemWithHeaders !== STR_UNDEFINED
                        && renderOptions.itemWithHeaders)
                    _setItemWithHeadersStyle(id);

                if (renderOptions.value === NULL)
                    _removeNonPlaceholderItemIndicator(
                        _getDropDown(id)
                    );

                // NOTE: This set timeout code allows
                //       the browser to render the widget 
                //       properly before prevent its parent
                //       from scrolling further down.
                setTimeout(function () {
                    _preventCloseOnScrollToEdge(id);
                    _displayCustomizedIcon(input);

                    if (input.options.autoClose === FALSE)
                        _preventAutoCloseOnSelect(id);
                }, 100);

                setTimeout(function () {
                    if (input.options.autoWidth)
                        _setListWidthToAuto(id);
                }, 100);

                setTimeout(function () {
                    _toggleNonPlaceholderIndicatorClass(_getDropDown(id));
                }, 100);
            }
        };

        return _externals;
    })(jQuery);

    return dropdownService;
});