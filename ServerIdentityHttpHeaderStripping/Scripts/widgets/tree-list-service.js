Box.Application.addService("tree-list-service", function (context) {
    var treeListService = (function ($, undefined) {
        var _externals = {},

            /*
             * Selector Constants
             */
            DIRECT_DECENDANT_SELECTOR = ">",
            ID_SELECTOR_SYMBOL = "#",
            TABLE_BODY_TAG = "tbody",
            TABLE_ROW_TAG = "tr",

            /*
             * Utility Constants
             */
            KENDO_TREE_LIST = "kendoTreeList",
            SINGLE_SPACE = " ",
            STR_UNDEFINED = "undefined";

        /*
         * Private Methods
         */
        function _getAllItems(id) {
            return $(ID_SELECTOR_SYMBOL + id + SINGLE_SPACE +
                TABLE_BODY_TAG + DIRECT_DECENDANT_SELECTOR + TABLE_ROW_TAG);
        }

        function _getItem(params) {
            var input = params || {};

            return $(ID_SELECTOR_SYMBOL + input.id + SINGLE_SPACE +
                TABLE_BODY_TAG).find(input.element);
        }

        function _getTreeList(id) {
            return $(ID_SELECTOR_SYMBOL + id).data(KENDO_TREE_LIST);
        }

        function _transformRenderParams(params) {
            var input = params || {},
                config = {
                    autobind: input.autobind,
                    columns: input.columns,
                    columnMenu: input.columnMenu,
                    editable: input.editable,
                    excel: input.excel,
                    filterable: input.filterable,
                    height: input.height,
                    messages: input.messages,
                    pdf: input.pdf,
                    resizable: input.resizable,
                    reorderable: input.reorderable,
                    scrollable: input.scrollable,
                    selectable: input.selectable,
                    sortable: input.sortable,
                    toolbar: input.toolbar
                };

            if (typeof input.data !== STR_UNDEFINED
                 && input.data instanceof Array) {
                config.dataSource = {
                    data: input.data,
                    schema: input.schema,
                    expanded: input.expanded
                };
            }

            return config;
        }

        /*
         * Public Members
         */
        _externals.expandItem = function (params) {
            var input = params || {},
                item = _getItem(input),
                treeList = _getTreeList(input.id);

            if (typeof treeList !== STR_UNDEFINED) {
                treeList.expand(item);
            }
        };

        _externals.expandItems = function (params) {
            var input = params || {},
                treeList = _getTreeList(input.id),
                items = input.items,
                i = 0,
                len = items.length;

            if (typeof treeList !== STR_UNDEFINED) {
                for (; i < len; i++) {
                    treeList.expand(items[i]);
                }
            }
        };

        _externals.collapseAll = function (params) {
            var input = params || {},
                treeList = _getTreeList(input.id),
                items = _getAllItems(input.id),
                i = 0,
                len = items.length;

            if (typeof treeList !== STR_UNDEFINED) {
                for (; i < len; i++) {
                    treeList.collapse(items[i]);
                }
            }
        };

        _externals.render = function (params) {
            var input = params || {},
                renderParams = _transformRenderParams(input.options);

            $(ID_SELECTOR_SYMBOL + input.id).kendoTreeList(renderParams);
        };

        _externals.setItems = function (params) {
            var input = params || {},
                treeList = _getTreeList(input.id);

            if (typeof treeList !== STR_UNDEFINED) {
                treeList.dataSource.data(input.data);
            }
        };

        return _externals;
    })(jQuery);

    return treeListService;
});