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
        mobileNavTrigger: {
            test: function test() {
                return true;
            },
            run: function run() {
                $(".mobile-nav-trigger").click(function (event) {
                    $("body").toggleClass("open-nav");
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
                        styles: [{
                            "featureType": "landscape.man_made",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#f7f1df"
                            }]
                        }, {
                            "featureType": "landscape.natural",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#d0e3b4"
                            }]
                        }, {
                            "featureType": "landscape.natural.terrain",
                            "elementType": "geometry",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "poi.business",
                            "elementType": "all",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "poi.medical",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#fbd3da"
                            }]
                        }, {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#bde6ab"
                            }]
                        }, {
                            "featureType": "road",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "road",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffe15f"
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#efd151"
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffffff"
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "black"
                            }]
                        }, {
                            "featureType": "transit.station.airport",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#cfb2db"
                            }]
                        }, {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#a2daf2"
                            }]
                        }]
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