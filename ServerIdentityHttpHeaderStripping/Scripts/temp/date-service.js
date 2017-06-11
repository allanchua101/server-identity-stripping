Box.Application.addService("date-service", function (context) {
    var dateService = (function ($, undefined) {
        var _externals = {},

            /*
             * Utility Constants
             */
            DATE_SEPARATOR = "/",
            SINGLE_SPACE = " ",
            TIME_SEPARATOR = ":",
            US_LOCALES_DATE_FORMAT = "en-US";

        /*
         * Private Methods
         */
        function _getDayTotalMilliSeconds() {
            return 1000 * 60 * 60 * 24;
        }

        /*
         * Public Members
         */
        _externals.addBusinessDaysToDate = function (params) {
            var input = params || {},
                businessDays = input.businessDays,
                date = input.date,
                day = date.getDay();

            date = new Date(date.getTime());

            date.setDate(date.getDate() + businessDays + (day === 6 ? 2 : +!day) + (Math.floor((businessDays - 1 + (day % 6 || 1)) / 5) * 2));

            return date;
        };

        _externals.formatDateToLocaleString = function (params) {
            var input = params || {},
                newDateInstance = new Date(input.date);
            
            // This method is used for displaying formatted dates only
            // and should not be used for saving dates data.
            return newDateInstance.toLocaleDateString(
                        US_LOCALES_DATE_FORMAT,
                        input.options
                   );
        };

        _externals.getDateDifferenceInDays = function (params) {
            var input = params || {},
                baseDate = input.baseDate,
                dateToSubtract = input.dateToSubtract,
                baseDateUtc,
                dateToSubtractUtc;

            baseDateUtc = Date.UTC(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
            dateToSubtractUtc = Date.UTC(dateToSubtract.getFullYear(), dateToSubtract.getMonth(), dateToSubtract.getDate());

            return Math.floor((baseDateUtc - dateToSubtractUtc) / _getDayTotalMilliSeconds());
        };

        _externals.getFormattedDate = function (params) {
            var input = params || {},
                date = input.date;

            return (date.getMonth() + 1) + DATE_SEPARATOR + date.getDate() + DATE_SEPARATOR + date.getFullYear() + SINGLE_SPACE +
                    date.getHours() + TIME_SEPARATOR + date.getMinutes() + TIME_SEPARATOR + date.getSeconds();
        };

        return _externals;
    })(jQuery);

    return dateService;
});