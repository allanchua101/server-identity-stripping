Box.Application.addService("array-service", function (context) {
    var arrayService = (function (undefined) {
        var _externals = {},

            /*
             * Utility Constants
             */
            FALSE = false,
            STR_UNDEFINED = "undefined";

        /*
         * Public Members
         */
        _externals.arrayMerge = function (params) {
            var input = params || {},
                arr1 = input.array1 || [],
                arr2 = input.array2 || [];

            return $.merge(arr1, arr2);
        };

        _externals.checkIfIntegerArraysAreEqual = function (params) {
            var input = params || {},
                arr1 = input.array1,
                arr2 = input.array2;

            return (arr1.sort().join(',') === arr2.sort().join(','));
        };

        _externals.getUniqueValues = function (params) {
            var input = params || {},
                arr = input.arr;

            if (typeof arr !== STR_UNDEFINED) {
                return arr.filter(function (currentValue, index, data) {
                    return data.indexOf(currentValue) === index;
                });
            }
                
        };

        _externals.grep = function (params) {
            var input = params || {},
                arr = input.arr,
                func = input.func,
                invert = input.invert || FALSE;

            return $.grep(arr, func, invert);
        };

        // NOTE: This method is dedicated 
        //       for processing large arrays
        _externals.processInBatch = function (params) {
            var input = params || {},
                items = input.items,
                process = input.process,
                len = 0,
                i = 0,
                mapItems = function () {
                    var executionStartTime = new Date();

                    if (len === 0)
                        len = items.length;

                    while (i < len && (new Date() - executionStartTime) < 50) {
                        process(items[i]);
                        i++;
                    }

                    if (i === len) {
                        if (typeof input.callback !== STR_UNDEFINED)
                            input.callback();
                    } else {
                        setTimeout(mapItems, 25);
                    }
                };

            setTimeout(mapItems, 250);
        };

        return _externals;
    })();

    return arrayService;
});


