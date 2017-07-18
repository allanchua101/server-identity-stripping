Box.Application.addService("line-chart-service", function (context) {
    var service = (function ($, undefined) {
        var _externals = {},

            /*
             * Chart Setting Variables
             */
            DEFAULT_CHART_SPACING_TOP = 60,
            DEFAULT_CHART_TYPE = "line",
            DEFAULT_LEGEND_COLOR = "#9c9ea0",
            DEFAULT_LEGEND_FONT_WEIGHT = "normal",
            DEFAULT_LEGEND_FONT_FAMILY = "OpenSansLight",
            DEFAULT_LEGEND_FONT_SIZE = "13px",
            DEFAULT_LEGEND_HORIZONTAL_ALIGN = "left",
            DEFAULT_LEGEND_LAYOUT = "horizontal",
            DEFAULT_LEGEND_VERTICAL_ALIGN = "top",
            DEFAULT_SERIES_LINE_WIDTH = 4,
            DEFAULT_X_AXIS_FONT = "OpenSansLight",
            DEFAULT_X_AXIS_FONT_SIZE = "12px",
            DEFAULT_Y_AXIS_FONT = "OpenSansLight",
            DEFAULT_Y_AXIS_FONT_SIZE = "11px",

            /*
             * Utility Variables
             */
            EMPTY_STRING = "",
            FALSE = false,
            NULL = null,
            STR_UNDEFINED = "undefined",
            TRUE = true;

        /*
         * Private Members
         */
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

        function _transformParameters(params) {
            var input = params || {},
                isLegendEnabled = typeof input.isLegendEnabled !== STR_UNDEFINED ? input.isLegendEnabled : TRUE;

            return {
                chart: {
                    height: input.chartHeight,
                    type: input.chartType || DEFAULT_CHART_TYPE,
                    spacingTop: input.chartSpacingTop || DEFAULT_CHART_SPACING_TOP
                },
                title: {
                    text: input.title || EMPTY_STRING
                },
                xAxis: {
                    categories: input.categories || [],
                    labels: {
                        style: {
                            fontFamily: input.xAxisFont || DEFAULT_X_AXIS_FONT,
                            fontSize: input.xAxisFontSize || DEFAULT_X_AXIS_FONT_SIZE
                        }
                    },
                    tickLength: input.tickLength || 0
                },
                yAxis: {
                    min: input.minYAxis || 0,
                    max: input.maxYAxis || 1,
                    labels: {
                        style: {
                            fontFamily: input.yAxisFont || DEFAULT_Y_AXIS_FONT,
                            fontSize: input.yAxisFontSize || DEFAULT_Y_AXIS_FONT_SIZE
                        },
                        formatter: input.yAxislabelsInputFormatter || NULL
                    },
                    title: {
                        text: input.yAxisTitle || EMPTY_STRING
                    }
                },
                plotOptions: {
                    series: {
                        lineWidth: input.seriesLineWidth || DEFAULT_SERIES_LINE_WIDTH
                    }
                },
                series: input.series || [],
                tooltip: {
                    pointFormatter: input.tooltipPointFormatter || NULL
                },
                exporting: {
                    enabled: input.exportingEnabled || FALSE
                },
                legend: {
                    enabled: isLegendEnabled,
                    layout: input.legendLayout || DEFAULT_LEGEND_LAYOUT,
                    align: input.legendHorizontalAlign || DEFAULT_LEGEND_HORIZONTAL_ALIGN,
                    verticalAlign: input.legendVerticalAlign || DEFAULT_LEGEND_VERTICAL_ALIGN,
                    x: input.legendXCoordinate || -5,
                    y: input.legendYCoordinate || DEFAULT_CHART_SPACING_TOP * -1,
                    floating: input.isLegendFloating || TRUE,
                    itemStyle: {
                        color: input.legendColor || DEFAULT_LEGEND_COLOR,
                        fontFamily: input.legendFontFamily || DEFAULT_LEGEND_FONT_FAMILY,
                        fontSize: input.legendFontSize || DEFAULT_LEGEND_FONT_SIZE,
                        fontWeight: input.fontWeight || DEFAULT_LEGEND_FONT_WEIGHT
                    }
                },
                credits: {
                    enabled: FALSE
                }
            };
        }

        /*
         * Public Members
         */
        _externals.render = function (params) {
            var input = params || {},
                config = _transformParameters(input),
                element = _getElement(input);

            if (element)
                element.highcharts(config);
        };

        return _externals;
    })(jQuery);

    return service;
});