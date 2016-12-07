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
        videolauncher: {
            test: function test() {
                return true;
            },
            run: function run() {
                var b = $("body");
                var playerHtml = "<div class=\"video-player\"><div class=\"player-container\"><div class=\"player-inner-wrap\"><div class=\"iframe-wrapper\"><div class=\"close-btn\"><svg width=\"12px\" height=\"12px\" viewPort=\"0 0 12 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"1\" y1=\"11\" x2=\"11\" y2=\"1\" stroke=\"#FFF\" stroke-width=\"2\"/><line x1=\"1\" y1=\"1\" x2=\"11\" y2=\"11\" stroke=\"#FFF\" stroke-width=\"2\"/></svg></div></div></div></div></div>";
                b.append(playerHtml);

                var player = $(".video-player");
                b.on("click", ".video-container", function (event) {
                    event.preventDefault();
                    var url = "https://player.vimeo.com/video/" + $(this).data("vimeoid") + "?byline=0&badge=0";
                    var iframeHtml = "<iframe src=\"" + url + "\" width=\"100%\" height=\"100%\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                    b.addClass("video-on");
                    player.css("display", "block");
                    setTimeout(function () {
                        player.css("opacity", "1");
                        player.addClass("zoomed");
                        setTimeout(function () {
                            player.find(".iframe-wrapper").append(iframeHtml);
                        }, 500);
                    }, 50);
                });
                player.on("click", ".close-btn", function (event) {
                    event.preventDefault();
                    player.css("opacity", "0").removeClass("zoomed");
                    b.removeClass("video-on");
                    setTimeout(function () {
                        player.css("display", "none");
                        player.find("iframe").remove();
                    }, 500);
                });
            }
        },
        oneYearBible: {
            test: function test() {
                return $(".bible-content").length;
            },
            run: function run() {
                var time = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var month = months[time.getMonth()];
                $("#" + month).show();
            }
        },
        map: {
            test: function test() {
                return $("#map").length;
            },
            run: function run() {
                google.maps.event.addDomListener(window, "load", init);
                function init() {
                    var mapOptions = {
                        zoom: 15,
                        center: new google.maps.LatLng($("#map").data("lattitude"), $("#map").data("longitude")),
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
                        position: new google.maps.LatLng($("#map").data("lattitude"), $("#map").data("longitude")),
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