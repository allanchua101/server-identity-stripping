Box.Application.addService("pagination-service", function (context) {
    var paginationService = (function ($, undefined) {
        var _externals = {},
          /*
           * Event Constants
           */
          CLICK_EVENT = "click",

          /*
           * Key Constants
           */
          DATA_ACTION_KEY = "action",
          DATA_ACTIVE_PAGE_KEY = "active-page",
          DATA_COUNT_KEY = "count",
          DATA_PAGE_VALUE_KEY = "page-value",
          
          /*
           * Regex Pattern Constants
           */
          PAGE_NUMBER_REGEX_PATTERN = /\|PAGE_NUMBER\|/g,
          PAGINATION_ID_REGEX_PATTERN = /\|PAGINATION_ID\|/g,
          PAGINATION_ITEMS_REGEX_PATTERN = /\|PAGINATION_ITEMS\|/g,
          
          /*
           * Selector Constants
           */
          ACTIVE_CLASS = "active",
          HIDDEN_CLASS = "hidden",
          LIST_ITEM = "li",
          LIST_VIEW_CONTAINER_SELECTOR = "ul[id$='-listview']",
          NEXT_ELLIPSIS_CLASS = "next-ellipsis",
          NO_BORDER_CLASS = "no-border",
          NON_CLICKABLE = "non-clickable",
          PAGE_ITEM_CLASS = "page-item",
          PAGER_BTN_NEXT_CLASS = "f-pager-next",
          PAGER_BTN_PREV_CLASS = "f-pager-prev",
          PREV_ELLIPSIS_CLASS = "prev-ellipsis",
          
          /*
           * Template Constants
           */
          LIST_ITEM_SELECTOR_TEMPLATE = "li[data-count='|PAGE_NUMBER|']",
          LIST_ITEM_TEMPLATE = "<li class='page-item clickable' data-count='|PAGE_NUMBER|'>" +
                                    "<a>|PAGE_NUMBER|</a>" +
                               "</li>",
          LIST_VIEW_TEMPLATE = "<ul id='|PAGINATION_ID|-listview' class='pagination'>" +
                                    "<li class='page-item clickable f-pager-prev' data-action='prev'><a><i class='glyphicon glyphicon-chevron-left'></i></a></li>" +
                                    "<li class='page-item no-pointer prev-ellipsis hidden'><a>...</a></li>" +
                                    "|PAGINATION_ITEMS|" +
                                    "<li class='page-item no-pointer next-ellipsis  hidden'><a>...</a></li>" +
                                    "<li class='page-item clickable f-pager-next' data-action='next'><a><i class='glyphicon glyphicon-chevron-right'></i></a></li>" +
                               "</ul>",
          
          /*
           * Utility Constants
           */
          DEFAULT_ACTIVE_PAGE_NUMBER = 1,
          DEFAULT_VISIBLE_PAGE_COUNT = 10,
          EMPTY_STRING = "",
          FALSE = false,
          NULL = null,
          STR_BOOLEAN = "boolean",
          STR_FUNCTION = "function",
          STR_NEXT = "next",
          STR_PREV = "prev",
          TRUE = true;

        /*
         * Private Methods
         */
        function _attachEvent(pager, config) {
            var pageItemSelector = _getClassSelector(PAGE_ITEM_CLASS);


            $(pager).on(CLICK_EVENT, pageItemSelector, function () {
                _onPagerClick.call(this, config);
            });
        }

        function _createListItemFragments(pageNumber) {
            return LIST_ITEM_TEMPLATE.replace(
                PAGE_NUMBER_REGEX_PATTERN, pageNumber
            );
        }

        function _createPagerListView(id, config) {
            var listItemfragments = EMPTY_STRING,
                listViewTemplate = LIST_VIEW_TEMPLATE,
                pagerContainer = _getPagerContainer(id),
                totalPagesToDisplay = _getTotalPagesToDisplay(config);
                
            for (var i = 0, number; i < totalPagesToDisplay; i++) {
                number = (i + 1);

                listItemfragments += _createListItemFragments(number);
            }

            listViewTemplate = listViewTemplate.replace(
                                    PAGINATION_ID_REGEX_PATTERN, id
                               ).replace(
                                    PAGINATION_ITEMS_REGEX_PATTERN, listItemfragments
                               );
            
            pagerContainer.html(listViewTemplate);
        }

        function _getClassSelector(className) {
            return "." + className;
        }

        function _getIdSelector(id) {
            return "#" + id;
        }

        function _getLastActivePage(pager) {
            // NOTE: This method is being used before pager
            // list view data updates. In order to get the
            // correct last active page.
            var activePageNumber = pager.data(DATA_ACTIVE_PAGE_KEY),
                activePageSelector = LIST_ITEM_SELECTOR_TEMPLATE;

            activePageSelector = activePageSelector.replace(PAGE_NUMBER_REGEX_PATTERN, activePageNumber);

            return pager.find(activePageSelector);
        }

        function _getPagerContainer(id) {
            var containerSelector = _getIdSelector(id);

            return $(containerSelector);
        }

        function _getTotalPagesToDisplay(config) {
            var totalPages = config.totalPageCount,
                output;

            if (totalPages < config.pageSize)
                output = totalPages;
            else
                output = config.pageSize;

            return output;
        }

        function _render(id, config) {
            var pagerContainer = _getPagerContainer(id) || [],
                totalPageCount = config.totalPageCount,
                pager;
            
            if (pagerContainer && pagerContainer.length > 0) {
                _createPagerListView(id, config);

                if (totalPageCount > 0) {
                    pager = pagerContainer.find(LIST_VIEW_CONTAINER_SELECTOR);

                    _setActive(pager, DEFAULT_ACTIVE_PAGE_NUMBER, config);
                    _setButtonState(pager, DEFAULT_ACTIVE_PAGE_NUMBER, totalPageCount);
                    _setEllipsisVisibility(pager, config);
                    _setOptions(pager, config);

                    _attachEvent(pager, config);
                }
            }
        }

        function _setActive(pager, pageNumber, options) {
            var self = pager,
                pageItemSelector = _getClassSelector(PAGE_ITEM_CLASS),
                items,
                itemSelector;

            items = self.find(pageItemSelector);
            itemSelector = LIST_ITEM_SELECTOR_TEMPLATE.replace(PAGE_NUMBER_REGEX_PATTERN, pageNumber);

            items.removeClass(ACTIVE_CLASS);
            $(itemSelector, self).addClass(ACTIVE_CLASS);
            self.data(DATA_ACTIVE_PAGE_KEY, pageNumber);

            if (options.dataField && options.data.length > 0)
                self.data(DATA_PAGE_VALUE_KEY, options.data[pageNumber - 1][options.dataField]);
        }

        function _setButtonState(pager, activePageIndex, totalPages) {
            var self = pager,
                nextBtnSelector = _getClassSelector(PAGER_BTN_NEXT_CLASS),
                prevBtnSelector = _getClassSelector(PAGER_BTN_PREV_CLASS);

            self.find(nextBtnSelector).removeClass(NON_CLICKABLE);
            self.find(prevBtnSelector).removeClass(NON_CLICKABLE);

            if (activePageIndex === totalPages) {
                self.find(nextBtnSelector).addClass(NON_CLICKABLE);
            } else if (activePageIndex === DEFAULT_ACTIVE_PAGE_NUMBER) {
                self.find(prevBtnSelector).addClass(NON_CLICKABLE);
            }
        }

        function _setEllipsisVisibility(pager, options) {
            var self = pager,
                firstItem = self.find(LIST_ITEM).eq(2),
                lastItem = self.find(LIST_ITEM).eq((options.pageSize + 1)),
                nextEllipsisSelector = _getClassSelector(NEXT_ELLIPSIS_CLASS),
                prevEllipsisSelector = _getClassSelector(PREV_ELLIPSIS_CLASS);

            self.find(nextEllipsisSelector).addClass(HIDDEN_CLASS);
            self.find(prevEllipsisSelector).addClass(HIDDEN_CLASS);

            if (lastItem.data(DATA_COUNT_KEY) < options.totalPageCount
                && options.totalPageCount > options.pageSize)
                self.find(nextEllipsisSelector).removeClass(HIDDEN_CLASS);
            
            if (firstItem.data(DATA_COUNT_KEY) > DEFAULT_ACTIVE_PAGE_NUMBER)
                self.find(prevEllipsisSelector).removeClass(HIDDEN_CLASS);    
        }

        function _setOptions(pager, options) {
            var self = pager;

            if (typeof options.bordered === STR_BOOLEAN
                && options.bordered === FALSE) {

                self.addClass(NO_BORDER_CLASS);
            }
        }

        function _transformParams(params) {
            var input = params || {},
                config = {
                  bordered: TRUE,
                  pages: input.pages || 0,
                  pageSize: input.visiblePageCount || DEFAULT_VISIBLE_PAGE_COUNT,
                  data: input.data || [],
                  dataField: input.dataFieldValue || NULL,
                  onChange: input.onChange || NULL
              };

            config.totalPageCount = config.data.length || config.pages;

            if (typeof input.bordered === STR_BOOLEAN && input.bordered === FALSE) {
                config.bordered = FALSE;
            }

            return config;
        }

        /*
         * Private Events
         */
        function _onPagerClick() {
            var self = $(this),
                pager = self.closest(LIST_VIEW_CONTAINER_SELECTOR),
                action = self.data(DATA_ACTION_KEY),
                activePageIndex = pager.data(DATA_ACTIVE_PAGE_KEY),
                args = arguments[0],
                callback = args.onChange,
                firstItem = pager.find(LIST_ITEM).eq(2),
                lastActivePage = _getLastActivePage(pager),
                lastItem = pager.find(LIST_ITEM).eq((args.pageSize + 1)),
                newListItem = LIST_ITEM_TEMPLATE,
                totalPages = args.totalPageCount;
                
            
            if (action === STR_NEXT) {
                activePageIndex++;

                if (activePageIndex > args.pageSize && activePageIndex <= totalPages) {
                    if (activePageIndex > lastItem.data(DATA_COUNT_KEY)) {
                        newListItem = newListItem.replace(PAGE_NUMBER_REGEX_PATTERN, activePageIndex);
                        firstItem.remove();
                        lastActivePage.after(newListItem);
                    }
                }
            } else if (action === STR_PREV) {
                activePageIndex--;

                if (activePageIndex < firstItem.data(DATA_COUNT_KEY)) {
                    newListItem = newListItem.replace(PAGE_NUMBER_REGEX_PATTERN, activePageIndex);
                    lastItem.remove();
                    lastActivePage.before(newListItem);
                }
            } else {
                if (activePageIndex === self.data(DATA_COUNT_KEY))
                    return;

                activePageIndex = self.data(DATA_COUNT_KEY);
            }

            _setActive(pager, activePageIndex, args);
            _setButtonState(pager, activePageIndex, totalPages);
            _setEllipsisVisibility(pager, args);

            if (typeof callback === STR_FUNCTION) {
                callback(self, {
                    activePage: pager.data(DATA_ACTIVE_PAGE_KEY),
                    value: pager.data(DATA_PAGE_VALUE_KEY)
                });
            }
        }

        /*
         * Public Members
         */

        _externals.destroy = function (params) {
            var input = params || {},
                pagerSelector = _getIdSelector(input.id),
                pager = $(pagerSelector);

            if (pager && pager.length > 0) {
                pager.empty();
            }
        };

        _externals.render = function (params) {
            var input = params || {},
                options = _transformParams(input.options);

            
            _render(input.id, options);
        };

        return _externals;

    })(jQuery);

    return paginationService;
});