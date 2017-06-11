Box.Application.addService("file-service", function (context) {
    var fileService = (function ($, URL, undefined) {
        var _externals = {};

        _externals.getImageDimensions = function (params) {
            var input = params || {},
                image = new Image();

            image.onload = function () {
                input.callback({
                    height: image.height,
                    width: image.width
                });
            };
            image.src = URL.createObjectURL(input.file);
        };

        _externals.getFileExtension = function (params) {
            var input = params || {},
                re = /(?:\.([^.]+))?$/;

            return re.exec(input.fileName)[1];
        };

        return _externals;
    })(jQuery, (window.URL || window.webkitURL));

    return fileService;
});