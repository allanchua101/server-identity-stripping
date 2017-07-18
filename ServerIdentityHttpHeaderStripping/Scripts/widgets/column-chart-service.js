Box.Application.addService("column-chart-service", function (context) {
    var service = (function ($, undefined) {
        var _externals = {},

            /*
             * Chart Setting Variables
             */
            CHART_TYPE = "column",
            DEFAULT_ANIMATION_DURATION = 500,
            DEFAULT_BAR_WIDTH = 70,
            DEFAULT_TOOLTIP_FOOTER_FORMAT = "</table>",
            DEFAULT_TOOLTIP_HEADER_FORMAT = "<span style='font-size:10px'>{point.key}</span><table>",
            DEFAULT_TOOLTIP_POINT_FORMAT = "<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y}</b></td></tr>",

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
            var input = params || {};

            return {
                chart: {
                    type: CHART_TYPE
                },
                title: {
                    text: input.title || EMPTY_STRING
                },
                xAxis: {
                    categories: input.categories || [],
                    tickLength: input.tickLength || 0
                },
                yAxis: {
                    min: input.minYAxis || 0,
                    max: input.maxYAxis || 1,
                    labels: {
                        formatter: input.yAxislabelsInputFormatter || NULL,
                    },
                    title: {
                        text: input.yAxisTitle || EMPTY_STRING
                    },
                    lineWidth: input.yAxixLineWidth || 1
                },
                tooltip: {
                    headerFormat: input.tooltipHeaderFormat || DEFAULT_TOOLTIP_HEADER_FORMAT,
                    pointFormat: input.tooltipPointFormat || DEFAULT_TOOLTIP_POINT_FORMAT,
                    valuePrefix: input.tooltipValuePrefix || NULL,
                    valueSuffix: input.tooltipValueSuffix || NULL,
                    footerFormat: input.tooltipFooterFormat || DEFAULT_TOOLTIP_FOOTER_FORMAT,
                    formatter: input.tooltipFormatter || NULL,
                    shared: TRUE,
                    useHTML: TRUE
                },
                plotOptions: {
                    series: {
                        pointWidth: input.barWidth || DEFAULT_BAR_WIDTH,
                        animation: {
                            duration: input.animationDuration || DEFAULT_ANIMATION_DURATION
                        }
                    }
                },
                series: [{
                    name: input.seriesName,
                    data: input.seriesData
                }],
                exporting: {
                    enabled: input.exportingEnabled || FALSE
                },
                legend: {
                    symbolHeight: input.showLegend ? NULL : 0,
                    symbolWidth: input.showLegend ? NULL : 0,
                    symbolRadius: input.showLegend ? NULL : 0
                },
                credits: {
                    enabled: FALSE
                }
            };
        }

        /*
         * Public Members
         */
        _externals.redraw = function (params) {
            var input = params || {},
                chart = NULL,
                element = _getElement(input);

            if (element) {
                chart = element.highcharts();
                chart.redraw();
            }
        };

        _externals.render = function (params) {
            var input = params || {},
                config = _transformParameters(input),
                element = _getElement(input);

            if (element)
                element.highcharts(config);
        };

        _externals.setCategories = function (params) {
            var input = params || {},
                element = _getElement(input),
                chart,
                xAxis;

            if (element) {
                chart = element.highcharts();
                xAxis = chart.xAxis;

                if (xAxis.length > 0) {
                    xAxis[0].setCategories(input.categories, FALSE);
                }
            }
        };

        _externals.setFirstSeriesData = function (params) {
            var input = params || {},
                element = _getElement(input),
                chart,
                series;

            if (element) {
                chart = element.highcharts();
                series = chart.series;

                if (series.length > 0) {
                    series[0].setData(input.data, FALSE);
                }
            }
        };

        return _externals;
    })(jQuery);

    return service;
});