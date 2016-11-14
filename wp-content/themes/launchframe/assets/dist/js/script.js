"use strict";

(function ($, w) {
    "use strict";
    /* global
     * console, setTimeout */

    var theWindow = $(window);
    var wb = {
        scrolled: {
            test: function test() {
                return true;
            },
            run: function run() {
                theWindow.on("scroll", function () {
                    stop = theWindow.scrollTop();
                    if (stop > 100) {
                        $("body").addClass("scrolled");
                    } else {
                        $("body").removeClass("scrolled");
                    }
                });
            }
        },
        map: {
            test: function test() {
                return true;
            },
            run: function run() {
                google.maps.event.addDomListener(window, "load", init);
                function init() {
                    var mapOptions = {
                        zoom: 14,
                        center: new google.maps.LatLng(35.859310, -86.475816),
                        styles: [{ "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
                    };
                    var mapElement = document.getElementById("map");
                    var map = new google.maps.Map(mapElement, mapOptions);
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(35.859310, -86.475816),
                        map: map,
                        title: "River Oaks Community Church"
                    });
                }
            }
        }
    };

    Object.keys(wb).forEach(function (key) {
        if (wb[key].test()) {
            wb[key].run();
        }
    });
})(jQuery, window);