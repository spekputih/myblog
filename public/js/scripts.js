/*
* Author: Wisely Themes
* Author URI: http://www.wiselythemes.com
* Theme Name: Rider
* Version: 1.0.0
*/

/*jslint browser: true, devel: true, this: true, for: true, multivar: true */
/*global jQuery, window, google, Waypoint, Freewall, RichMarker, RichMarkerPosition, InfoBox, CountUp, grecaptcha, chosen, mobileMenuTitle, twitter_username, map_initialZoom, map_initialLatitude, map_initialLongitude, map_viewMoreButton, use_default_map_style*/

var Rider;

(function ($) {

    "use strict";

    $(document).ready(function () {

        Rider = {

            initialized: false,
            mobMenuFlag: false,
            mobileMenuTitle: mobileMenuTitle,
            twitter_username: twitter_username,
            map_initialZoom: map_initialZoom,
            map_initialLatitude: map_initialLatitude,
            map_initialLongitude: map_initialLongitude,
            map_viewMoreButton: map_viewMoreButton,
            use_default_map_style: use_default_map_style,
            sendingMail: false,

            init: function () {

                var $tis = this;

                if ($tis.initialized) {
                    return;
                }

                $tis.initialized = true;
                $tis.build();
                $tis.events();
            },

            build: function () {

                var $tis = this;

                /**
                 * Dinamically create the menu for mobile devices
                 */
                $tis.createMobileMenu();

                /**
                 * Set the hero height to 100% of window height
                 */
                $tis.heroHeight();

                /**
                 * Get latest tweets
                 */
                $tis.getLatestTweets();

                /**
                 * Get Instagram feed
                 */
                $tis.getInstagram();

                /**
                 * Create Owl Sliders
                 */
                $tis.createOwlSliders();

                /**
                 * Create Revolution Slider
                 */
                $tis.createRevSlider();

                /**
                 * Create custom select boxes
                 */
                $tis.createSelectBoxes();

                /**
                 * Create custom check boxes
                 */
                $tis.createCheckBoxes();

                /**
                 * Build home portfolio grid
                 */
                $tis.portfolioGrid();

                /**
                 * Gallery Scroll
                 */
                $tis.galleryScroll();

                /**
                 * Create PrettyPhoto links
                 */
                $tis.createPrettyPhoto();

                /**
                 * Create Tooltip objects
                 */
                $("[data-toggle=\"tooltip\"]").tooltip();

                /**
                 * Initiate Parallax
                 */
                $tis.parallaxItems();

                /**
                 * Activate placeholder in older browsers
                 */
                $("input, textarea").placeholder();
            },

            events: function () {

                var $tis = this;

                /**
                 * Functions called on window resize
                 */
                $tis.windowResize();

                /**
                 * Make the navbar stick to the top on scroll
                 */
                $tis.stickyNav();

                /**
                 * If #content has class colored, make the sidebar with a minimun height equal to .main height
                 */
                $tis.resizeSidebar();

                /**
                 * Resize App Features image parent
                 */
                $tis.resizeAppFeaturesImg();

                /**
                 * Buttons click event
                 */
                $tis.buttonsClick();

                /**
                 * Initialize countUp plugin
                 */
                $tis.initCountUp();

                /**
                 * Contact form submit
                 */
                $tis.contactForm();

                /**
                 * Animate elements on scrolling
                 */
                $tis.animateElems();
            },

            createMobileMenu: function (w) {

                var $tis = this,
                    $wrapper = $("#wrapper"),
                    $navMobile,
                    etype;

                if ($.browser.mobile) {
                    etype = "touchstart";
                } else {
                    etype = "click";
                }

                if (w !== null) {
                    w = $(window).innerWidth();
                }

                if (w <= 975 && !$tis.mobMenuFlag) {

                    $("body").prepend("<nav class=\"nav-mobile\"><i class=\"fa fa-times\"></i><h2><i class=\"fa fa-bars\"></i>" + $tis.mobileMenuTitle + "</h2><ul></ul></nav>");

                    $(".nav-mobile > ul").html($(".nav").html());

                    $(".nav-mobile b").remove();

                    $(".nav-mobile ul.dropdown-menu").removeClass().addClass("dropdown-mobile");

                    $navMobile = $(".nav-mobile");

                    $("#nav-mobile-btn").bind(etype, function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        setTimeout(function () {
                            $wrapper.addClass("open");
                            $navMobile.addClass("open");
                        }, 25);

                        $(document).bind(etype, function (e) {
                            if (!$(e.target).hasClass("nav-mobile") && !$(e.target).parents(".nav-mobile").length) {
                                $wrapper.removeClass("open");
                                $navMobile.removeClass("open");
                                $(document).unbind(etype);
                            }
                        });

                        $(">i", $navMobile).bind(etype, function () {
                            $wrapper.removeClass("open");
                            $navMobile.removeClass("open");
                            $(document).unbind(etype);
                        });
                    });

                    $tis.mobMenuFlag = true;
                }
            },

            heroHeight: function () {

                if ($(".herofullheight").length) {
                    $(".herofullheight").css({minHeight: $(window).innerHeight() + "px"});

                    $(window).resize(function () {
                        $(".herofullheight").css({minHeight: $(window).innerHeight() + "px"});
                    });
                }
            },

            getLatestTweets: function () {

                var $tis = this,
                    twitterBox = document.createElement("div"),
                    len = $(".twitter .item").length,
                    index = 0;

                if (len === 0) {
                    return false;
                }

                twitterBox.setAttribute("id", "twitter-box");

                $("body").append(twitterBox);

                $("#twitter-box").css({display: "none"});

                try {
                    $("#twitter-box").tweet({
                        username: $tis.twitter_username,
                        modpath: "twitter/",
                        count: len,
                        loading_text: "Loading tweets...",
                        template: "<header><h3>{name}</h3><a href=\"http://twitter.com/{screen_name}\" target=\"_blank\">@{screen_name}</a>&nbsp;.&nbsp;<a href=\"http://twitter.com/{screen_name}/statuses/{tweet_id}/\" target=\"_blank\" class=\"time\">{tweet_relative_time}</a></header><div class=\"text\">{text}</div>"
                    });
                } catch (err) {
                    console.log("Your twitter account is misconfigured." + err);
                }

                $("#twitter-box li").each(function () {
                    if (index < len) {
                        $(".twitter .item").eq(index).html($(this).html());
                        index += 1;
                    } else {
                        return false;
                    }
                });

                $("#twitter-box").remove();
            },

            getInstagram: function () {

                var $tis = this;

                if ($(".instagram").length && $(".instagram > ul").length < 1) {

                    $.ajax({
                        type: "post",
                        url: "instagram/instagram.php",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (json) {
                            var feed = $.parseJSON(json),
                                len = 6,
                                index = 0,
                                feedLen = 0,
                                i = 0,
                                list = $(".instagram").append("<ul></ul>").find("ul");

                            if (feed !== "" && feed.hasOwnProperty("data")) {
                                feedLen = feed.data.length;
                            }

                            while (i < feedLen) {
                                if (index < len) {
                                    list.append("<li><a href=\"" + feed.data[i].link + "\" target=\"_blank\"><img src=\"" + feed.data[i].images.standard_resolution.url + "\" alt=\"\" /></a></li>");
                                    index += 1;
                                }
                                i += 1;
                            }

                            $tis.createPrettyPhoto();
                        },
                        error: function () {
                            console.log("Error getting Instagram feed");
                        }
                    });
                }
            },

            createPrettyPhoto: function () {
                if ($("a[data-gal^=\"prettyPhoto\"]").length && $.fn.prettyPhoto) {
                    $("a[data-gal^=\"prettyPhoto\"]").prettyPhoto({theme: "rider", hook: "data-gal", social_tools: false});
                }
            },

            createOwlSliders: function () {

                $(document).ready(function () {

                    if ($("#our-work-carousel").length) {
                        $("#our-work-carousel").owlCarousel({
                            nav: true,
                            navText: "",
                            dots: true,
                            loop: true,
                            margin: 4,
                            responsive: {
                                "0": {
                                    items: 1
                                },
                                "590": {
                                    items: 2
                                },
                                "975": {
                                    items: 3
                                }
                            }
                        });
                    }

                    if ($("#agency-carousel").length) {
                        $("#agency-carousel").owlCarousel({
                            nav: false,
                            navText: "",
                            dots: true,
                            loop: false,
                            margin: 15,
                            responsive: {
                                "0": {
                                    items: 1
                                },
                                "480": {
                                    items: 2
                                },
                                "992": {
                                    items: 3
                                },
                                "1199": {
                                    items: 4
                                }
                            }
                        });
                    }

                    if ($("#app-carousel").length) {
                        $("#app-carousel").owlCarousel({
                            nav: true,
                            navText: "",
                            dots: true,
                            loop: false,
                            margin: 2,
                            responsive: {
                                "0": {
                                    items: 1
                                },
                                "480": {
                                    items: 2
                                },
                                "992": {
                                    items: 3
                                },
                                "1199": {
                                    items: 4
                                }
                            }
                        });
                    }

                    if ($("#testimonials-slider").length) {
                        $("#testimonials-slider").owlCarousel({
                            items: 1,
                            nav: false,
                            dots: true,
                            autoHeight: true,
                            animateOut: "fadeOut",
                            mouseDrag: false
                        });
                    }

                    if ($("#testimonials-slider-2").length) {
                        $("#testimonials-slider-2").owlCarousel({
                            nav: false,
                            navText: "",
                            dots: true,
                            loop: false,
                            margin: 28,
                            responsive: {
                                "0": {
                                    items: 1
                                },
                                "590": {
                                    items: 2
                                },
                                "975": {
                                    items: 3
                                }
                            }
                        });
                    }

                    if ($("#twitter-slider").length) {
                        $("#twitter-slider").owlCarousel({
                            items: 1,
                            nav: false,
                            dots: true,
                            autoHeight: true,
                            animateOut: "fadeOut",
                            mouseDrag: false
                        });
                    }

                    if ($("#similar-projects-carousel").length) {
                        $("#similar-projects-carousel").owlCarousel({
                            nav: true,
                            navText: "",
                            dots: true,
                            loop: true,
                            margin: 32,
                            responsive: {
                                "0": {
                                    items: 2
                                },
                                "590": {
                                    items: 3
                                },
                                "975": {
                                    items: 4
                                }
                            }
                        });
                    }


                    if ($("#gallery-detail-large").length && $("#gallery-detail-thumbs").length) {
                        var sync1 = $("#gallery-detail-large"),
                            sync2 = $("#gallery-detail-thumbs"),

                            syncPosition = function (el) {
                                /*jshint validthis: true */

                                var current = el.item.index,
                                    onscreen = sync2.find(".owl-item.active").length - 1,
                                    start = sync2.find(".owl-item.active").first().index(),
                                    end = sync2.find(".owl-item.active").last().index();

                                sync2
                                    .find(".owl-item")
                                    .removeClass("synced")
                                    .eq(current)
                                    .addClass("synced");

                                if (sync2.data("owl.carousel") !== undefined) {

                                    if (current > end) {
                                        sync2.data("owl.carousel").to(current, 100, true);
                                    }
                                    if (current < start) {
                                        sync2.data("owl.carousel").to(current - onscreen, 100, true);
                                    }
                                }
                            };


                        sync1.imagesLoaded(function () {

                            $(".item", sync2).each(function () {
                                var $item = $(this);
                                $item.css({"background-image": "url(" + $("img", $item).attr("src") + ")"});
                                $("img", $item).remove();
                            });

                            sync1.owlCarousel({
                                items: 1,
                                nav: false,
                                dots: false,
                                loop: false,
                                autoHeight: true,
                                responsiveRefreshRate: 200,
                                onChanged: syncPosition
                            });

                            sync2.owlCarousel({
                                responsive: {
                                    "0": {
                                        items: 2
                                    },
                                    "300": {
                                        items: 3
                                    },
                                    "629": {
                                        items: 4
                                    },
                                    "751": {
                                        items: 3
                                    },
                                    "975": {
                                        items: 4
                                    },
                                    "1183": {
                                        items: 5
                                    }
                                },
                                dots: true,
                                nav: false,
                                margin: 5,
                                smartSpeed: 200,
                                slideSpeed: 500,
                                responsiveRefreshRate: 100,
                                onInitialized: function () {
                                    sync2.find(".owl-item").eq(0).addClass("synced");
                                }
                            });

                            sync2.on("click", ".owl-item", function (e) {
                                e.preventDefault();
                                var current = $(this).index(),
                                    start = sync2.find(".owl-item.active").first().index(),
                                    end = sync2.find(".owl-item.active").last().index();

                                sync1.data("owl.carousel").to(current, 300, true);

                                if (current === end) {
                                    sync2.trigger("next.owl.carousel");
                                }

                                if (current === start) {
                                    sync2.trigger("prev.owl.carousel");
                                }
                            });
                        });
                    }
                });
            },

            createRevSlider: function () {

                $(document).ready(function () {

                    if ($("#rev_slider_corporate").length) {
                        if ($("#rev_slider_corporate").revolution !== undefined) {
                            $("#rev_slider_corporate").show().revolution({
                                sliderType: "standard",
                                jsFileLocation: "revolution/js/",
                                sliderLayout: "fullwidth",
                                dottedOverlay: "none",
                                delay: 9000,
                                navigation: {
                                    keyboardNavigation: "off",
                                    keyboard_direction: "horizontal",
                                    mouseScrollNavigation: "off",
                                    mouseScrollReverse: "default",
                                    onHoverStop: "off",
                                    touch: {
                                        touchenabled: "on",
                                        swipe_threshold: 75,
                                        swipe_min_touches: 1,
                                        swipe_direction: "horizontal",
                                        drag_block_vertical: false
                                    },
                                    arrows: {
                                        enable: true,
                                        style: "rider",
                                        hide_onmobile: true,
                                        hide_under: 600,
                                        hide_onleave: true,
                                        hide_delay: 200,
                                        hide_delay_mobile: 1200,
                                        left: {
                                            h_align: "left",
                                            v_align: "center",
                                            h_offset: 30,
                                            v_offset: 0
                                        },
                                        right: {
                                            h_align: "right",
                                            v_align: "center",
                                            h_offset: 30,
                                            v_offset: 0
                                        }
                                    }
                                },
                                viewPort: {
                                    enable: true,
                                    outof: "pause",
                                    visible_area: "80%",
                                    presize: false
                                },
                                responsiveLevels: [1240, 1024, 778, 480],
                                visibilityLevels: [1240, 1024, 778, 480],
                                gridwidth: [1240, 1024, 778, 480],
                                gridheight: [650, 600, 500, 400],
                                lazyType: "none",
                                scrolleffect: {
                                    blur: "on",
                                    maxblur: "20",
                                    on_slidebg: "on",
                                    direction: "top",
                                    multiplicator: "3",
                                    multiplicator_layers: "2",
                                    tilt: "10",
                                    disable_on_mobile: "off"
                                },
                                parallax: {
                                    type: "scroll",
                                    origo: "slidercenter",
                                    speed: 2000,
                                    levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 47, 48, 49, 50, 51, 55]
                                },
                                shadow: 0,
                                spinner: "spinner3",
                                stopLoop: "off",
                                stopAfterLoops: -1,
                                stopAtSlide: -1,
                                shuffle: "off",
                                autoHeight: "off",
                                hideThumbsOnMobile: "off",
                                hideSliderAtLimit: 0,
                                hideCaptionAtLimit: 0,
                                hideAllCaptionAtLilmit: 0,
                                debugMode: false,
                                fallbacks: {
                                    simplifyAll: "off",
                                    nextSlideOnWindowFocus: "off",
                                    disableFocusListener: false
                                }
                            });
                        }
                    }

                    if ($("#rev_slider_app").length) {
                        if ($("#rev_slider_app").revolution !== undefined) {
                            $("#rev_slider_app").show().revolution({
                                sliderType: "hero",
                                jsFileLocation: "revolution/js/",
                                sliderLayout: "fullwith",
                                dottedOverlay: "none",
                                delay: 9000,
                                navigation: {
                                },
                                responsiveLevels: [1240, 1024, 778, 480],
                                visibilityLevels: [1240, 1024, 778, 480],
                                gridwidth: [1240, 1024, 778, 480],
                                gridheight: [750, 700, 650, 660],
                                lazyType: "none",
                                parallax: {
                                    type: "scroll",
                                    origo: "slidercenter",
                                    speed: 1000,
                                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
                                },
                                shadow: 0,
                                spinner: "spinner2",
                                autoHeight: "off",
                                fullScreenAutoWidth: "off",
                                fullScreenAlignForce: "off",
                                fullScreenOffsetContainer: "",
                                fullScreenOffset: "80",
                                disableProgressBar: "on",
                                hideThumbsOnMobile: "off",
                                hideSliderAtLimit: 0,
                                hideCaptionAtLimit: 0,
                                hideAllCaptionAtLilmit: 0,
                                debugMode: false,
                                fallbacks: {
                                    simplifyAll: "off",
                                    disableFocusListener: false
                                }
                            });
                        }
                    }
                });
            },

            createSelectBoxes: function () {

                if ($("select").length && typeof chosen === "object") {
                    $("select").chosen({
                        allow_single_deselect: true,
                        disable_search_threshold: 12
                    });
                }
            },

            createCheckBoxes: function () {

                if ($("input[type=\"checkbox\"]").length) {
                    $("input[type=\"checkbox\"]").checkbox({
                        checkedClass: "fa fa-check-square-o",
                        uncheckedClass: "fa fa-square-o"
                    });
                }
            },

            portfolioGrid: function () {

                if ($("#freewall").length) {
                    $("#freewall .item").each(function () {
                        var $item = $(this);
                        $item.width(Math.floor(220 + 200 * Math.random()));
                        $item.css({"background-image": "url(" + $(">img", $item).attr("src") + ")"});
                        $(">img", $item).remove();
                    });

                    var wall = new Freewall("#freewall");
                    wall.reset({
                        selector: ".item",
                        animate: false,
                        cellW: 20,
                        cellH: 240,
                        gutterX: 1,
                        gutterY: 1,
                        onResize: function () {
                            wall.fitWidth();
                        }
                    });
                    wall.fitWidth();
                }
            },

            parallaxItems: function () {

                if (!$.browser.mobile) {
                    $.stellar({
                        horizontalScrolling: false,
                        responsive: true,
                        positionProperty: "position"
                    });
                } else {
                    $(".parallax").css({"background-position": "0%", "background-size": "cover", "background-attachment": "scroll"});
                }
            },

            googleMap: function (markers, office_map_canvas, office_id, overlay) {

                overlay = overlay || false;

                if (office_map_canvas === undefined || markers.length === 0) {
                    return false;
                }

                var $tis = this,
                    styles = [],
                    styledMap,
                    myLatlng,
                    mapOptions,
                    map,
                    mapMarkers = [],
                    createMarker,
                    i,
                    controlsPos;

                if ($tis.map_initialLatitude === null) {
                    $tis.map_initialLatitude = markers[0].latitude;
                }

                if ($tis.map_initialLongitude === null) {
                    $tis.map_initialLongitude = markers[0].longitude;
                }

                if (overlay) {
                    if ($(window).innerWidth() <= 751) {
                        myLatlng = new google.maps.LatLng(markers[office_id].latitude, markers[office_id].longitude);
                    } else {
                        myLatlng = new google.maps.LatLng(markers[office_id].latitude, markers[office_id].longitude + 0.025);
                    }
                } else {
                    if (office_id !== undefined || office_id === null) {
                        myLatlng = new google.maps.LatLng(markers[office_id].latitude, markers[office_id].longitude);
                    } else {
                        myLatlng = new google.maps.LatLng($tis.map_initialLatitude, $tis.map_initialLongitude);
                    }
                }

                if (!this.use_default_map_style) {
                    styles = [
                        {
                            featureType: "all",
                            elementType: "all",
                            stylers: [
                                {saturation: -100}
                            ]
                        }
                    ];
                }

                styledMap = new google.maps.StyledMapType(styles, {name: "Rider"});

                if (overlay) {
                    controlsPos = google.maps.ControlPosition.LEFT_CENTER;
                } else {
                    controlsPos = google.maps.ControlPosition.RIGHT_CENTER;
                }

                mapOptions = {
                    center: myLatlng,
                    zoom: $tis.map_initialZoom,
                    scrollwheel: false,
                    panControl: false,
                    mapTypeControl: false,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: controlsPos
                    }
                };

                map = new google.maps.Map(document.getElementById(office_map_canvas), mapOptions);

                map.mapTypes.set("map_style", styledMap);
                map.setMapTypeId("map_style");

                createMarker = function (obj) {

                    var lat = obj.latitude,
                        lng = obj.longitude,
                        myOptions,

                        marker = new RichMarker({
                            position: new google.maps.LatLng(lat, lng),
                            map: map,
                            anchor: RichMarkerPosition.MIDDLE,
                            shadow: "none",
                            content: "<div class=\"marker\"><i class=\"fa " + obj.map_marker_icon + "\"></i></div>"
                        }),

                        content = "<div class=\"infoWindowOffice\">" + "<h3>" + obj.title + "</h3>" + "<a href=\"" + obj.link + "\"><img src=\"" + obj.image + "\" alt=\"" + obj.title + "\"></a>" + "<div class=\"description\">" + obj.description + "</div>";

                    if (obj.link !== "" && obj.link !== undefined) {
                        content += "<div class=\"center\"><a class=\"btn btn-color btn-small\" href=\"" + obj.link + "\">" + $tis.map_viewMoreButton + "</a></div></div>";
                    } else {
                        content += "</div>";
                    }

                    myOptions = {
                        content: content,
                        zIndex: null,
                        alignBottom: true,
                        pixelOffset: new google.maps.Size(-85, -34),
                        closeBoxMargin: "10px 10px 10px 10px",
                        closeBoxURL: "images/close_infobox.png",
                        infoBoxClearance: new google.maps.Size(5, 5),
                        isHidden: false,
                        pane: "floatPane",
                        enableEventPropagation: false
                    };

                    mapMarkers.push(marker);

                    mapMarkers[mapMarkers.length - 1].infobox = new InfoBox(myOptions);

                    google.maps.event.addListener(marker, "click", function () {
                        $.each(mapMarkers, function () {
                            this.infobox.close();
                        });

                        this.infobox.open(map, this);
                    });
                };

                for (i = 0; i < markers.length; i += 1) {
                    if (markers[i] !== undefined) {
                        createMarker(markers[i]);
                    }
                }
            },

            windowResize: function () {

                var $tis = this;

                $(window).resize(function () {
                    var w = $(window).innerWidth();

                    $tis.resizeSidebar(w);
                    $tis.createMobileMenu(w);
                    $tis.resizeAppFeaturesImg(w);
                    $tis.setGallerySize(w);
                });
            },

            stickyNav: function () {

                var $navSection = $("#nav-section"),
                    sticky = new Waypoint.Sticky({
                        element: $navSection
                    });

                sticky = sticky;

                $("body").waypoint(function (dir) {
                    if (dir === "down") {
                        $navSection.addClass("shrink");
                    } else {
                        $navSection.removeClass("shrink");
                    }
                }, {offset: -320});
            },

            resizeSidebar: function (w) {

                if (w !== null) {
                    w = $(window).innerWidth();
                }

                if ($(".colored .sidebar").length || $(".gray .sidebar").length) {
                    if (w >= 751) {
                        $(".sidebar").each(function () {
                            var h = $(this).closest(".content").find(".main").height();
                            $(this).css({minHeight: (h + 135) + "px"});
                        });
                    } else {
                        $(".sidebar").each(function () {
                            $(this).css({"min-height": "0px"});
                        });
                    }
                }
            },

            resizeAppFeaturesImg: function () {

                if ($(".app-features").length) {
                    var leftHeight = $(".app-features .items-left").height(),
                        rightHeight = $(".app-features .items-right").height(),
                        imgHeight = $(".app-features .app-features-img").height(),
                        aux = leftHeight;

                    if (rightHeight > leftHeight) {
                        aux = rightHeight;
                    }

                    if (imgHeight <= aux) {
                        $(".app-features .app-features-img").css("height", aux);
                    } else {
                        $(".app-features .app-features-img").css("height", "auto");
                    }
                }
            },

            buttonsClick: function () {

                $(".btn-search").bind("click", function () {
                    $("#search-form").toggleClass("open");
                    $("#nav-section").toggleClass("search-open");
                    if ($(this).hasClass("fa-search")) {
                        $(this).removeClass("fa-search");
                        $(this).addClass("fa-times");
                    } else {
                        $(this).addClass("fa-search");
                        $(this).removeClass("fa-times");
                    }
                });

                //"Slide to" buttons click event
                $(".scrollto").click(function (e) {
                    e.preventDefault();

                    var d = $($(this).attr("href")).offset().top;

                    $("html, body").animate({scrollTop: d - 40}, 1000, "easeInOutExpo");

                    return false;
                });
            },

            initCountUp: function () {

                var options = {
                        useEasing: true,
                        useGrouping: true,
                        separator: ",",
                        decimal: "."
                    },
                    timers = [],
                    checkViewPort;

                $(".timer").each(function (i) {
                    var tis = $(this);
                    tis.attr("id", "timer" + i);
                    timers["timer" + i] = new CountUp("timer" + i, 0, parseInt(tis.data("to"), 10), 0, 4.5, options);
                });

                checkViewPort = function () {
                    var s = $(window).scrollTop(),
                        h = $(window).height();

                    $(".timer").each(function () {
                        var $this = $(this);

                        if (s + h >= $this.offset().top) {
                            timers[$this.attr("id")].start();
                        }
                    });
                };

                $(window).scroll(function () {
                    checkViewPort();
                });

                checkViewPort();
            },

            contactForm: function () {

                var $tis = this;

                $(".submit_form").click(function (e) {
                    e.preventDefault();

                    var $submit_btn = $(this),
                        $form = $submit_btn.closest("form"),
                        $fields = $("input, textarea", $form),
                        len = 0,
                        re = /\S+@\S+\.\S+/,
                        html = "contact",
                        error = false,
                        showError,
                        showSuccess,
                        stopSpin,
                        capResponse;

                    $fields.each(function () {
                        var $field = $(this);

                        if ($field.attr("type") === "hidden") {
                            if ($field.hasClass("subject")) {
                                html += "&subject=" + $field.val();
                            } else if ($field.hasClass("fromName") || $field.hasClass("fromname")) {
                                html += "&fromname=" + $field.val();
                            } else if ($field.hasClass("fromEmail") || $field.hasClass("fromemail")) {
                                html += "&fromemail=" + $field.val();
                            } else if ($field.hasClass("emailTo") || $field.hasClass("emailto")) {
                                html += "&emailto=" + $field.val();
                            }
                        } else {
                            if ($field.hasClass("required") && $field.val() === "") {
                                $field.addClass("invalid");
                                error = true;
                            } else if ($field.attr("type") === "email" && $field.val() !== "" && re.test($field.val()) === false) {
                                $field.addClass("invalid");
                                error = true;
                            } else if ($field.attr("id") !== "g-recaptcha-response" && $field.attr("id") !== "recaptcha-token") {
                                $field.removeClass("invalid");
                                if ($field.hasClass("subject")) {
                                    html += "&subject=" + $field.val();
                                    html += "&subject_label=" + $field.attr("name");
                                } else if ($field.hasClass("fromName") || $field.hasClass("fromname")) {
                                    html += "&fromname=" + $field.val();
                                    html += "&fromname_label=" + $field.attr("name");
                                } else if ($field.hasClass("fromEmail") || $field.hasClass("fromemail")) {
                                    html += "&fromemail=" + $field.val();
                                    html += "&fromemail_label=" + $field.attr("name");
                                } else {
                                    html += "&field" + len + "_label=" + $field.attr("name");
                                    html += "&field" + len + "_value=" + $field.val();
                                    len += 1;
                                }
                            }
                        }
                    });

                    html += "&len=" + len;

                    showError = function () {
                        var iClass = $("i", $submit_btn).attr("class");

                        $("i", $submit_btn).removeClass(iClass).addClass("fa fa-times").delay(1500).queue(function (next) {
                            $(this).removeClass("fa fa-times").addClass(iClass);
                            next();
                        });
                        $submit_btn.addClass("btn-danger").delay(1500).queue(function (next) {
                            $(this).removeClass("btn-danger");
                            next();
                        });
                    };

                    showSuccess = function () {
                        var iClass = $("i", $submit_btn).attr("class");

                        $("i", $submit_btn).removeClass(iClass).addClass("fa fa-check").delay(1500).queue(function (next) {
                            $(this).removeClass("fa fa-check").addClass(iClass);
                            next();
                        });
                        $submit_btn.addClass("btn-success").delay(1500).queue(function (next) {
                            $(this).removeClass("btn-success");
                            next();
                        });
                    };

                    stopSpin = function () {
                        $("i", $submit_btn).removeClass("fa-cog fa-spin").addClass("fa-envelope");
                    };

                    if (!error && !$tis.sendingMail) {
                        $tis.sendingMail = true;
                        $("i", $submit_btn).removeClass("fa-envelope").addClass("fa-cog fa-spin");

                        if ($(".g-recaptcha").length) {
                            capResponse = grecaptcha.getResponse();

                            $.ajax({
                                type: "POST",
                                url: "recaptcha/verify.php",
                                data: "captcha=" + capResponse,
                                success: function (json) {
                                    var result = JSON.parse(json);

                                    $(".recaptcha_only_if_incorrect").hide();

                                    if (result.status === 0) {
                                        $(".recaptcha_only_if_incorrect").show();

                                        stopSpin();
                                        showError();

                                        $tis.sendingMail = false;

                                    } else if (result.status === 1) {
                                        $.ajax({
                                            type: "POST",
                                            url: "contact.php",
                                            data: html,
                                            success: function (msg) {
                                                stopSpin();

                                                if (msg === "ok") {
                                                    showSuccess();
                                                    $form[0].reset();
                                                } else {
                                                    showError();
                                                }

                                                $tis.sendingMail = false;
                                            },
                                            error: function () {
                                                stopSpin();
                                                showError();
                                                $tis.sendingMail = false;
                                            }
                                        });

                                        grecaptcha.reset();
                                    }
                                },

                                error: function () {
                                    stopSpin();
                                }
                            });

                        } else {
                            $.ajax({
                                type: "POST",
                                url: "contact.php",
                                data: html,
                                success: function (msg) {
                                    stopSpin();

                                    if (msg === "ok") {
                                        showSuccess();
                                        $form[0].reset();
                                    } else {
                                        showError();
                                    }

                                    $tis.sendingMail = false;
                                },
                                error: function () {
                                    stopSpin();

                                    showError();
                                    $tis.sendingMail = false;
                                }
                            });
                        }

                    } else {
                        showError();
                    }

                    return false;
                });
            },

            setGallerySize: function (w) {
                var lists = 0,
                    galHeight = 0,
                    listHeight = 304;

                if (w < 767) {
                    listHeight = 254;
                }

                $(".gallery-scroller").each(function () {
                    var $gallery = $(this);

                    lists = $("> ul", $gallery).length;

                    galHeight = listHeight * lists;

                    $gallery.height(galHeight);
                });
            },

            galleryScroll: function () {

                if ($(".gallery-scroller").length) {

                    var x, left, down, scrolling = false;

                    this.setGallerySize($(window).innerWidth());

                    $(".gallery-right").on("click", function () {
                        if (scrolling) {
                            return false;
                        }

                        var $gallery = $(this).siblings(".gallery-scroller");

                        scrolling = true;
                        $gallery.animate({scrollLeft: $gallery.scrollLeft() + 380}, 800, "easeOutCirc", function () {
                            scrolling = false;
                        });
                    });

                    $(".gallery-left").on("click", function () {
                        if (scrolling) {
                            return false;
                        }

                        var $gallery = $(this).siblings(".gallery-scroller");

                        scrolling = true;
                        $gallery.animate({scrollLeft: $gallery.scrollLeft() - 380}, 800, "easeOutCirc", function () {
                            scrolling = false;
                        });
                    });

                    $(".gallery-scroller").mousedown(function (e) {
                        e.preventDefault();
                        down = true;
                        x = e.pageX;
                        left = $(this).scrollLeft();
                        $(this).addClass("grabbing");
                    }).mouseup(function () {
                        $(this).removeClass("grabbing");
                    });

                    $("body").mousemove(function (e) {
                        if (down) {
                            var newX = e.pageX;

                            $(".gallery-scroller").scrollLeft(left - newX + x);
                        }
                    });

                    $("body").mouseup(function () {
                        down = false;
                    });
                }
            },

            animateElems: function () {

                if ($(window).innerWidth() >= 751) {

                    var animate = function () {
                        $("[data-animation-delay]").each(function () {
                            var $this = $(this),
                                s = $(window).scrollTop(),
                                h = $(window).height(),
                                d = parseInt($this.attr("data-animation-delay"), 10),
                                dir = $this.data("animation-direction");

                            if (dir === undefined) {
                                return false;
                            }

                            $this.addClass("animate-" + dir);

                            if (s + h >= $this.offset().top) {
                                if (isNaN(d) || d === 0) {
                                    $this.removeClass("animate-" + dir).addClass("animation-" + dir);
                                } else {
                                    setTimeout(function () {
                                        $this.removeClass("animate-me").addClass("animation-" + dir);
                                    }, d);
                                }
                            }
                        });
                    };

                    $(window).scroll(function () {
                        animate();
                    });

                    animate();
                } else {
                    $("[data-animation-delay]").each(function () {
                        $(this).removeAttr("data-animation-delay");
                    });
                }
            }

        };

        Rider.init();
    });
}(jQuery));
