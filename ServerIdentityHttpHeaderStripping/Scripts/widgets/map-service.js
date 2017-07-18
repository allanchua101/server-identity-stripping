Box.Application.addService("map-service", function (context) {
    var gMapNs = google.maps,
        gMapEventNs = gMapNs.event,
        MapControl,
        mapService;

    /*
     * Map Control Constructor
     */
    MapControl = function (params) {
        var input = params || {},
            options = input.options || {},
            defaults = {
                center: {
                    lat: 32.950681,
                    lng: -96.825914
                },
                zoom: 2,
                minZoom: 2
            },
            context = this,
            mapElement = $(input.selector)[0];

        context.mapOptions = {};

        // Assign default configurations to the mapOptions properties
        // and override it with provided options from invoker
        $.extend(context.mapOptions, defaults, options);

        context.mapComponent = new gMapNs.Map(mapElement, context.mapOptions);
        context.markers = [];
        context.fusionTableLayers = [];
        context.initialLoad = true;

        context.attachEvents(input);
    };

    /*
     * Map Control Prototype Members
     */
    MapControl.prototype = (function (undefined) {
        var _externals = {},
            NULL = null,
            STR_UNDEFINED = "undefined";

        _externals.addFusionTableLayer = function (params) {
            var input = params || {},
                context = this,
                fusionLayer;

            fusionLayer = new gMapNs.FusionTablesLayer({
                suppressInfoWindows: true,
                query: input.query,
                styles: input.styles
            });

            context.fusionTableLayers.push(fusionLayer);
            fusionLayer.setMap(context.mapComponent);
        };

        _externals.addKmlLayer = function (params) {
            var input = params || {},
                context = this,
                ctaLayer;

            ctaLayer = new gMapNs.KmlLayer({
                url: input.url,
                map: context.mapComponent
            });
        };

        _externals.addMarker = function (params) {
            var input = params || {},
                context = this,
                marker = new gMapNs.Marker({
                    title: input.title,
                    position: new gMapNs.LatLng(input.lat, input.lng),
                    map: context.mapComponent,
                    data: input.data
                });

            context.markers.push(marker);
        };

        _externals.attachEvents = function (params) {
            var input = params || {},
                context = this;

            gMapEventNs.addListener(context.mapComponent, 'idle', function () {
                if (context.initialLoad) {
                    context.initialLoad = false;

                    if (typeof input.onLoad !== STR_UNDEFINED)
                        input.onLoad();
                }
            });
        };

        _externals.clearMarkers = function () {
            var markers = this.markers;

            for (var i = markers.length; i--;) {
                markers[i].setMap(NULL);
            }

            context.markers = [];
        };

        _externals.clearFusionTableLayers = function() {
            var context = this,
                fusionLayers = context.fusionTableLayers;

            for (var i = fusionLayers.length; i--;) {
                fusionLayers[i].setMap(NULL);
            }
            fusionLayers = [];
        };

        _externals.removeFusionTableLayer = function (params) {
            var input = params || {},
                fusionLayers = this.fusionTableLayers,
                item;

            for (var i = fusionLayers.length; i--;) {
                item = fusionLayers[i];

                if (item.data[input.prop] === input.value) {
                    item.setMap(NULL);
                    fusionLayers.splice(i, 1);
                    break;
                }
            }
        };

        _externals.removeMarker = function (params) {
            var input = params || {},
                markers = this.markers,
                item;

            for (var i = markers.length; i--;) {
                item = markers[i];

                if (item.data[input.prop] === input.value) {
                    item.setMap(NULL);
                    markers.splice(i, 1);
                    break;
                }
            }
        };

        return _externals;
    })();

    /*
     * Map Service Interface
     */
    mapService = (function ($, undefined) {
        var _externals = {},
            /*
             * UTILITY CONSTANTS
             */
            NULL = null;

        /*
         * Public Members
         */
        _externals.render = function (params) {
            return new MapControl(params);
        };

        _externals.getCoordinates = function (params) {
            var input = params || {},
                geocoder = new gMapNs.Geocoder(),
                placeService,
                geocodeInput = {
                    address: input.searchText
                },
                callback = function (place) {
                    var location;

                    if (place !== NULL) {
                        location = place.geometry.location;

                        input.callback(
                            location.lat(),
                            location.lng(),
                            input.data
                        );
                    } else {
                        input.callback();
                    }
                };

            geocoder.geocode(
                geocodeInput,
                function (predictions) {
                    if (predictions && predictions.length > 0) {
                        placeService = new gMapNs.places.PlacesService(input.map.mapComponent);
                        placeService.getDetails({
                            placeId: predictions[0].place_id
                        }, callback);
                    } else {
                        callback();
                    }
                }
            );
        };

        return _externals;
    })(jQuery);

    return mapService;
});