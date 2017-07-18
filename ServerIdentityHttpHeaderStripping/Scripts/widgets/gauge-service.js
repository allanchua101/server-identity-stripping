Box.Application.addService("gauge-service", function (context) {
    var service = (function ($, undefined) {
        var _externals = {},

            /*
             * Chart Setting Variables
             */
            CENTER_ALIGN = "center",
            DEFAULT_COLOR = "#00B0FF",
            DEFAULT_PANE_BACKGROUND = "#EEE",
            GAUGE_INNER_RADIUS = "95%",
            GAUGE_OUTER_RADIUS = "100%",
            MIDDLE_ALIGN = "middle",
            SOLID_GAUGE_CHART_TYPE = "solidgauge",
            TOP_ALIGN = "top",

            /*
             * Utility Variables
             */
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
                    type: SOLID_GAUGE_CHART_TYPE,
                    backgroundColor: input.chartBackgroundColor || NULL,
                    height: input.height
                },
                credits: {
                    enabled: FALSE
                },
                title: {
                    useHTML: (typeof input.isTitleHtml !== STR_UNDEFINED
                                    ? input.isTitleHtml : TRUE),
                    text: input.title,
                    verticalAlign: input.titleVerticalAlign || TOP_ALIGN,
                    floating: TRUE,
                    style: {
                        color: input.titleColor || DEFAULT_COLOR
                    }
                },
                subtitle: {
                    useHTML: (typeof input.isSubTitleHtml !== STR_UNDEFINED
                                    ? input.isSubTitleHtml : TRUE),
                    text: input.subTitle,
                    verticalAlign: input.subTitleVerticalAlign || MIDDLE_ALIGN,
                    floating: TRUE,
                    style: {
                        textAlign: input.subTitleCenterAlign || CENTER_ALIGN
                    }
                },
                tooltip: {
                    enabled: FALSE
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    size: input.panelSize || NULL,
                    background: {
                        backgroundColor: input.paneBackground || DEFAULT_PANE_BACKGROUND,
                        innerRadius: input.paneInnerRadius || GAUGE_INNER_RADIUS,
                        outerRadius: input.paneOuterRadius || GAUGE_OUTER_RADIUS,
                        borderWidth: 0
                    }
                },
                yAxis: {
                    min: input.minValue || 0,
                    max: input.maxValue || 1,
                    labels: {
                        enabled: FALSE
                    },
                    lineWidth: 0,
                    minorTickInterval: NULL,
                    tickPixelInterval: 400,
                    tickWidth: 0
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius: input.paneInnerRadius || GAUGE_INNER_RADIUS
                    }
                },
                series: [{
                    borderColor: input.metricBorderColor || DEFAULT_COLOR,
                    data: [{
                        color: input.metricColor || DEFAULT_COLOR,
                        y: input.value
                    }],
                    dataLabels: {
                        enabled: FALSE
                    }
                }]
            };
        }

        /*
         * Public Members
         */
        _externals.redraw = function (params) {
            var input = params || {},
                element = _getElement(input);

            if (element)
                element.highcharts().redraw();
        };

        _externals.render = function (params) {
            var input = params || {},
                config = _transformParameters(input),
                element = _getElement(input);

            if (element)
                element.highcharts(config);
        };

        _externals.setMaxValue = function (params) {
            var input = params || {},
                element = _getElement(input),
                chart;

            if (element) {
                chart = element.highcharts();

                chart.yAxis[0].update({
                    max: input.maxValue
                }, FALSE);
            }
        };

        _externals.setTitle = function (params) {
            var input = params || {},
                element = _getElement(input),
                chart;

            if (element) {
                chart = element.highcharts();

                chart.setTitle({ text: input.title });
            }
        };

        _externals.setValue = function (params) {
            var input = params || {},
                element = _getElement(input),
                chart;

            if (element) {
                chart = element.highcharts();

                chart.series[0].data[0].update({
                    y: input.value
                }, FALSE);
            }
        };

        return _externals;
    })(jQuery);

    return service;
});