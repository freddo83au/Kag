/* =========================================================
   KLEEN & GREEN PROPERTY SERVICES
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LIGHT / DARK MODE
       ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle");

    let savedTheme = null;

    try {
        savedTheme =
            localStorage.getItem("kleen-green-theme");
    } catch (error) {
        savedTheme = null;
    }

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    function applyTheme(theme) {

        const dark = theme === "dark";

        document.body.classList.toggle(
            "dark-mode",
            dark
        );

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                dark ? "true" : "false"
            );

            themeToggle.setAttribute(
                "aria-label",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }
    }

    applyTheme(
        savedTheme ||
        (prefersDark ? "dark" : "light")
    );

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const dark =
                    document.body.classList.contains(
                        "dark-mode"
                    );

                const nextTheme =
                    dark ? "light" : "dark";

                try {
                    localStorage.setItem(
                        "kleen-green-theme",
                        nextTheme
                    );
                } catch (error) {
                    /* Continue if storage is unavailable. */
                }

                applyTheme(nextTheme);
            }
        );
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobile-toggle");

    const navigation =
        document.getElementById("main-navigation");

    if (mobileToggle && navigation) {

        mobileToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );
            }
        );

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "open"
                        );

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );
            });
    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header =
        document.getElementById("site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       BEFORE / AFTER SLIDER
       ===================================================== */

    const beforeAfter =
        document.getElementById(
            "before-after"
        );

    if (beforeAfter) {

        const beforeImage =
            beforeAfter.querySelector(
                ".before-after-before"
            );

        const divider =
            beforeAfter.querySelector(
                ".before-after-divider"
            );

        const handle =
            beforeAfter.querySelector(
                ".before-after-handle"
            );

        let dragging = false;

        function moveSlider(clientX) {

            const rect =
                beforeAfter.getBoundingClientRect();

            let position =
                (
                    (clientX - rect.left) /
                    rect.width
                ) * 100;

            position =
                Math.max(
                    0,
                    Math.min(
                        100,
                        position
                    )
                );

            if (beforeImage) {

                beforeImage.style.width =
                    position + "%";
            }

            if (divider) {

                divider.style.left =
                    position + "%";
            }
        }

        function startDrag(event) {

            dragging = true;

            event.preventDefault();
        }

        function stopDrag() {

            dragging = false;
        }

        function drag(event) {

            if (!dragging) {
                return;
            }

            let clientX;

            if (
                event.touches &&
                event.touches.length
            ) {

                clientX =
                    event.touches[0].clientX;

            } else {

                clientX =
                    event.clientX;
            }

            moveSlider(clientX);
        }

        if (handle) {

            handle.addEventListener(
                "mousedown",
                startDrag
            );

            handle.addEventListener(
                "touchstart",
                startDrag,
                {
                    passive: false
                }
            );
        }

        beforeAfter.addEventListener(
            "mousedown",
            startDrag
        );

        beforeAfter.addEventListener(
            "touchstart",
            startDrag,
            {
                passive: false
            }
        );

        window.addEventListener(
            "mousemove",
            drag
        );

        window.addEventListener(
            "touchmove",
            drag,
            {
                passive: false
            }
        );

        window.addEventListener(
            "mouseup",
            stopDrag
        );

        window.addEventListener(
            "touchend",
            stopDrag
        );
    }


    /* =====================================================
       QUOTE FORM
       ===================================================== */

    const quoteForm =
        document.getElementById(
            "quote-form"
        );

    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                alert(
                    "Thanks! Your quote request has been received. We will be in touch shortly."
                );

                quoteForm.reset();
            }
        );
    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(
        function (element) {

            element.textContent =
                new Date().getFullYear();
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    function updateActiveNavigation() {

        let current =
            "home";

        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }
            }
        );

        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    href ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            }
        );
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       HUNTER VALLEY MAP
       ===================================================== */

    const mapElement =
        document.getElementById(
            "hunter-map"
        );

    if (
        !mapElement ||
        typeof L === "undefined"
    ) {

        console.error(
            "Hunter Valley map could not be loaded."
        );

        return;
    }


    /* =====================================================
       CREATE MAP
       ===================================================== */

    const isMobileMap =
        window.matchMedia(
            "(max-width: 850px)"
        ).matches;

    const map =
        L.map(
            "hunter-map",
            {
                scrollWheelZoom: false,

                zoomControl: !isMobileMap,

                dragging: !isMobileMap,

                touchZoom: !isMobileMap,

                doubleClickZoom: !isMobileMap,

                boxZoom: !isMobileMap,

                keyboard: !isMobileMap
            }
        );


    /* =====================================================
       DEFAULT MAP POSITION
       ===================================================== */

    map.setView(
        [
            -33.05,
            151.63
        ],
        9.13
    );


    /* =====================================================
       FINAL MOBILE MAP LOCK
       ===================================================== */

    if (isMobileMap) {

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        map.scrollWheelZoom.disable();

        /*
         * Prevent the map from interfering with normal
         * page scrolling on mobile.
         */
        mapElement.style.touchAction =
            "pan-y";

        /*
         * Keep the map at its default position.
         */
        map.setView(
            [
                -33.05,
                151.63
            ],
            9.13,
            {
                animate: false
            }
        );
    }


    /* =====================================================
       OPENSTREETMAP
       ===================================================== */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    /* =====================================================
       CUSTOM GREEN PIN
       ===================================================== */

    const greenIcon =
        L.divIcon({

            className:
                "kleen-map-pin",

            html:
                '<div class="map-pin"></div>',

            iconSize:
                [
                    38,
                    48
                ],

            iconAnchor:
                [
                    19,
                    48
                ]
        });


    /* =====================================================
       SERVICE AREAS
       ===================================================== */

    const locations = [

        {
            name: "Kurri Kurri",
            lat: -32.82,
            lng: 151.48
        },

        {
            name: "Maitland",
            lat: -32.73,
            lng: 151.56
        },

        {
            name: "Cessnock",
            lat: -32.83,
            lng: 151.36
        },

        {
            name: "Singleton",
            lat: -32.57,
            lng: 151.18
        },

        {
            name: "Pokolbin",
            lat: -32.80,
            lng: 151.28
        },

        {
            name: "Newcastle",
            lat: -32.93,
            lng: 151.78
        },

        {
            name: "Lake Macquarie",
            lat: -33.08,
            lng: 151.60
        },

        {
            name: "Port Stephens",
            lat: -32.72,
            lng: 152.10
        }

    ];


    /* =====================================================
       STORE MARKERS
       ===================================================== */

    const markers = {};


    /* =====================================================
       CREATE MAP MARKERS
       ===================================================== */

    locations.forEach(
        function (location) {

            const marker =
                L.marker(
                    [
                        location.lat,
                        location.lng
                    ],
                    {
                        icon: greenIcon
                    }
                )
                .addTo(map);

            const key =
                location.name
                    .toLowerCase()
                    .trim();

            markers[key] =
                marker;


            /* =============================================
               POPUP
               ============================================= */

            marker.bindPopup(

                "<strong>Kleen &amp; Green</strong><br>" +

                "Professional cleaning services<br>" +

                location.name

            );


            /* =============================================
               TOOLTIP
               ============================================= */

            marker.bindTooltip(

                "Kleen &amp; Green services " +
                location.name,

                {
                    direction: "top",

                    offset:
                        [
                            0,
                            -42
                        ],

                    opacity: .95
                }

            );


            /* =============================================
               PIN HOVER IN
               ============================================= */

            marker.on(
                "mouseover",
                function () {

                    const pin =
                        marker.getElement();

                    if (!pin) {
                        return;
                    }

                    const graphic =
                        pin.querySelector(
                            ".map-pin"
                        );

                    if (graphic) {

                        graphic.classList.add(
                            "map-pin-active"
                        );
                    }

                    highlightAreaLabel(
                        location.name,
                        true
                    );

                }
            );


            /* =============================================
               PIN HOVER OUT
               ============================================= */

            marker.on(
                "mouseout",
                function () {

                    const pin =
                        marker.getElement();

                    if (pin) {

                        const graphic =
                            pin.querySelector(
                                ".map-pin"
                            );

                        if (graphic) {

                            graphic.classList.remove(
                                "map-pin-active"
                            );
                        }
                    }

                    highlightAreaLabel(
                        location.name,
                        false
                    );

                }
            );

        }
    );


    /* =====================================================
       FIND / HIGHLIGHT SERVICE AREA LABEL
       ===================================================== */

    function highlightAreaLabel(
        name,
        active
    ) {

        const labels =
            document.querySelectorAll(
                ".map-area-list span"
            );

        labels.forEach(
            function (label) {

                const labelName =
                    label.textContent
                        .replace("✓", "")
                        .trim()
                        .toLowerCase();

                if (
                    labelName ===
                    name.toLowerCase()
                ) {

                    if (active) {

                        label.classList.add(
                            "map-area-active"
                        );

                    } else {

                        label.classList.remove(
                            "map-area-active"
                        );
                    }
                }

            }
        );
    }


    /* =====================================================
       MAKE WHITE LABELS INTERACTIVE
       ===================================================== */

    const areaLabels =
        document.querySelectorAll(
            ".map-area-list span"
        );

    areaLabels.forEach(
        function (label) {

            const areaName =
                label.textContent
                    .replace("✓", "")
                    .trim()
                    .toLowerCase();

            const marker =
                markers[areaName];

            if (!marker) {
                return;
            }


            /* =============================================
               MOUSE ENTER WHITE BOX
               ============================================= */

            label.addEventListener(
                "mouseenter",
                function () {

                    label.classList.add(
                        "map-area-active"
                    );

                    const pin =
                        marker.getElement();

                    if (pin) {

                        const graphic =
                            pin.querySelector(
                                ".map-pin"
                            );

                        if (graphic) {

                            graphic.classList.add(
                                "map-pin-active"
                            );
                        }
                    }

                    marker.openTooltip();

                }
            );


            /* =============================================
               MOUSE LEAVE WHITE BOX
               ============================================= */

            label.addEventListener(
                "mouseleave",
                function () {

                    label.classList.remove(
                        "map-area-active"
                    );

                    const pin =
                        marker.getElement();

                    if (pin) {

                        const graphic =
                            pin.querySelector(
                                ".map-pin"
                            );

                        if (graphic) {

                            graphic.classList.remove(
                                "map-pin-active"
                            );
                        }
                    }

                    marker.closeTooltip();

                }
            );


            /* =============================================
               CLICK WHITE BOX
               ============================================= */

            label.addEventListener(
                "click",
                function () {

                    marker.openPopup();

                    /*
                     * Desktop:
                     * move the map to the selected area.
                     *
                     * Mobile:
                     * leave the map locked at its default
                     * Hunter Valley position.
                     */

                    if (!isMobileMap) {

                        map.panTo(
                            marker.getLatLng(),
                            {
                                animate: true,
                                duration: .5
                            }
                        );
                    }

                }
            );

        }
    );


    /* =====================================================
       FIX MAP SIZE
       ===================================================== */

    setTimeout(
        function () {

            map.invalidateSize();

        },
        500
    );


    window.addEventListener(
        "resize",
        function () {

            map.invalidateSize();

        }
    );

});