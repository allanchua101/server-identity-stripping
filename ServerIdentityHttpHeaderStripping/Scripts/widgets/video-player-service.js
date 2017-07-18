Box.Application.addService("video-player-service", function (context) {
    var videoPlayerService = (function (window, undefined) {
        var _externals = {},

            /*
             * Utility Variables
             */
            FALSE = false,
            STR_UNDEFINED = "undefined";

        /*
         * Private Methods
         */
        function _getPlayer(params) {
            var input = params || {},
                id = input.id,
                player = input.player;

            if (typeof id !== STR_UNDEFINED)
                return YT.get(id);

            if (typeof player !== STR_UNDEFINED)
                return player;
        }

        /*
         * Public Methods
         */
        _externals.cueVideoId = function (params) {
            var input = params || {},
                player = _getPlayer(input);

            if (player) {
                player.cueVideoById({
                    videoId: input.videoId
                });
            }
        };

        _externals.destroy = function (params) {
            var input = params || {},
                player = _getPlayer(input);

            if (player)
                player.destroy();
        };

        _externals.getById = function (params) {
            var input = params || {},
                player = _getPlayer(input);

            return player;
        };

        _externals.loadVideoById = function (params) {
            var input = params || {},
                player = _getPlayer(input);

            player.loadVideoById({
                videoId: input.videoId
            });
        };

        _externals.renderPlayer = function (params) {
            var input = params || {};

            window.YouTubeIframeLoader.load(function (YT) {
                new YT.Player(input.divId, {
                    autoPlay: input.autoPlay,
                    videoId: input.videoId,
                    playerVars: { rel: FALSE },
                    events: {
                        'onReady': input.callback
                    }
                });
            });
        };

        _externals.stopVideo = function (params) {
            var input = params || {},
                player = _getPlayer(input);

            if (player)
                player.stopVideo();
        };

        return _externals;

    })(window);
    return videoPlayerService;
});