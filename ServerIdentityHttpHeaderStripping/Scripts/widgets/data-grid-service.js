Box.Application.addService("data-grid-service", function (context) {
    var dataGridService = (function ($, undefined) {
        var _externals = {},

            /*
             * Attribute Keys
             */
            TITLE_ATTRIBUTE = "title",

            /*
             * Event Constants
             */
            MOUSE_ENTER_EVENT = "mouseenter",

            /*
             * Selector Constants
             */
            GRID_DETAIL_CONTAINER = "<div/>",
            GRID_TD_SELECTOR = ".k-grid-content td[role='gridcell'], [role='rowgroup'] td[role='gridcell']",
            ID_SELECTOR_SYMBOL = "#",

            /*
             * Utility Constants
             */
            APPLICATION_JSON_CONTENT_TYPE = "application/json",
            JSON_DATA_TYPE = "json",
            NULL = null,
            POST_METHOD = "POST",
            STR_UNDEFINED = "undefined",
            TRUE = true;

        /*
         * Private Methods
         */
        function _getGrid(id) {
            return $("#" + id).data("kendoGrid");
        }

        function _transformRenderParams(params) {
            var input = params || {},
                dataSource = {
                    aggregate: input.aggregate
                },
                config = {
                    autoBind: input.autoBind,
                    columns: input.columns,
                    dataBound: input.onDataBound,
                    detailCollapse: input.detailCollapse,
                    detailExpand: input.detailExpand,
                    detailInit: input.detailInit,
                    detailTemplate: input.detailTemplate,
                    columnReorder: input.onColumnReorder,
                    height: input.height,
                    scrollable: input.scrollable,
                    pageable: input.pageable,
                    reorderable: input.reorderable,
                    sortable: input.sortable,
                };

            if (typeof input.data !== STR_UNDEFINED
                 && input.data instanceof Array) {
                dataSource.data = input.data;
            }

            if (typeof input.group !== STR_UNDEFINED
                && input.group instanceof Object) {
                dataSource.group = input.group;
            }

            if (typeof input.transport !== STR_UNDEFINED) {
                dataSource.transport = input.transport;
                dataSource.serverPaging = TRUE;
                dataSource.serverSorting = TRUE;

                if (input.transport.read.type === POST_METHOD) {
                    dataSource.transport.read.dataType = (input.dataType || JSON_DATA_TYPE);
                    dataSource.transport.read.contentType = (input.contentType || APPLICATION_JSON_CONTENT_TYPE);
                    dataSource.transport.parameterMap = function (data) {
                        return JSON.stringify(data);
                    };
                    dataSource.schema = {
                        data: function (subset) {
                            return subset.Data;
                        },
                        total: function (subset) {
                            return subset.Total;
                        }
                    };
                }
            }

            if (typeof input.pageSize !== STR_UNDEFINED)
                dataSource.pageSize = input.pageSize;

            if (typeof input.filter !== STR_UNDEFINED)
                dataSource.filter = input.filter;

            config.dataSource = dataSource;

            return config;
        }

        /*
         * Private Events
         */
        function _onGridTableDimensionMouseEnter() {
            var sender = this,
                jqSender = $(this);

            if (sender.offsetWidth <= sender.scrollWidth
                    && !jqSender.prop(TITLE_ATTRIBUTE))
                jqSender.prop(TITLE_ATTRIBUTE, jqSender.text());
        }

        /*
         * Public Members
         */
        _externals.addItem = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                index,
                items;

            if (typeof grid !== STR_UNDEFINED) {
                items = grid.dataSource.data();
                index = input.index;

                if (typeof index === STR_UNDEFINED)
                    index = items.length || 0;

                grid.dataSource.insert(index, input.item);
            }
        };

        _externals.addItems = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                items;

            if (typeof grid !== STR_UNDEFINED) {
                items = grid.dataSource.data().slice(0);

                $.merge(items, input.items.slice(0));

                grid.dataSource.data(items);
            }
        };

        _externals.clearItems = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                grid.dataSource.data([]);
        };

        _externals.enableColumnTooltips = function (params) {
            var input = params || {},
                element = $(ID_SELECTOR_SYMBOL + input.id);

            element.on(
                MOUSE_ENTER_EVENT, GRID_TD_SELECTOR,
                _onGridTableDimensionMouseEnter
            );
        };

        _externals.getAggrgegates = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                aggregates = grid.dataSource.aggregates();

            return aggregates;
        };

        _externals.getColumnIndex = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                cols = [],
                title = input.title;

            if (typeof grid !== STR_UNDEFINED) {
                cols = grid.columns;

                for (var i = cols.length; i--;) {
                    if (cols[i].title === title) {
                        return i;
                    }
                }
            }

            return NULL;
        };

        _externals.getItems = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                return grid.dataSource.data();

            return [];
        };

        _externals.getSortSettings = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                settings = NULL;

            if (typeof grid !== STR_UNDEFINED) {
                settings = grid.dataSource.sort();

                if (typeof settings !== STR_UNDEFINED
                        && settings.length > 0) {
                    return {
                        field: settings[0].field,
                        direction: settings[0].dir
                    };
                }
            }

            return NULL;
        };

        _externals.getTargetItem = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                prop = input.prop,
                value = input.value,
                currentView = grid.dataSource.data(),
                item;

            for (var i = currentView.length; i--;) {
                item = currentView[i];
                if (item[prop] === value)
                    return item;
            }

            return null;
        };

        _externals.getVisibleColumnTitles = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                cols = [],
                column,
                columnTitles = [];

            if (typeof grid !== STR_UNDEFINED) {
                cols = grid.columns;

                for (var i = 0, len = cols.length; i < len; i++) {
                    column = cols[i];
                    if (!column.hidden)
                        columnTitles.push(column.title);
                }
            }

            return columnTitles;
        };

        _externals.hideColumn = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                grid.hideColumn(input.index);
        };

        _externals.read = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            return grid.dataSource.read();
        };

        _externals.refreshGrid = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                grid.refresh();
        };

        _externals.removeItem = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);


            if (typeof grid !== STR_UNDEFINED)
                grid.dataSource.remove(input.item);
        };

        _externals.render = function (params) {
            var input = params || {},
                renderParams = _transformRenderParams(input.options);

            $(ID_SELECTOR_SYMBOL + input.id).kendoGrid(renderParams);
        };

        _externals.renderDetail = function (params) {
            var input = params || {},
                renderParams = _transformRenderParams(input.options);

            $(GRID_DETAIL_CONTAINER).appendTo(input.detailCell)
                                    .kendoGrid(renderParams);
        };

        _externals.setActivePage = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                dataSource;

            if (typeof grid !== STR_UNDEFINED) {
                dataSource = grid.dataSource;
                if (dataSource.options.serverPaging) {
                    dataSource.page(input.pageIndex);
                }

            }
        };

        _externals.setItems = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                dataSource;

            if (typeof grid !== STR_UNDEFINED) {
                dataSource = grid.dataSource;
                dataSource.data(input.data);
                dataSource.page(1);
            }
        };

        _externals.setOptions = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                grid.setOptions(input.options);
        };

        _externals.showAllColumns = function (params) {
            var input = params || {},
                grid = _getGrid(input.id),
                cols = [];

            if (typeof grid !== STR_UNDEFINED) {
                cols = grid.columns;

                for (var i = cols.length; i--;) {
                    grid.showColumn(i);
                }
            }
        };

        _externals.showColumn = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            if (typeof grid !== STR_UNDEFINED)
                grid.showColumn(input.index);
        };

        _externals.sort = function (params) {
            var input = params || {},
                data = input.data || {},
                grid = _getGrid(input.id);

            grid.dataSource.sort({
                field: data.sortField,
                dir: data.sortDirection
            });
        };

        _externals.getGridSort = function (params) {
            var input = params || {},
                grid = _getGrid(input.id);

            return grid.dataSource.sort();
        };

        return _externals;
    })(jQuery);

    return dataGridService;
});