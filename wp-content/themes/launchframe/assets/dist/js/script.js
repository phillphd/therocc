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
        }
    };

    Object.keys(wb).forEach(function (key) {
        if (wb[key].test()) {
            wb[key].run();
        }
    });
})(jQuery, window);