/* globals L: false */
/* globals $: false */

(function() {
    'use strict';

    var aboutControl;
    var $body;
    var bodyHeight;
    var closeAboutControl;
    var learnAboutControl;
    var map;
    var mapE;





    $(function() {
        $('#js-video-gallery').colorbox({
            iframe: true,
            innerWidth: 500,
            innerHeight: 409
        });


        $('#js-fit-local').fitText(0.84);
        $('#js-overlay-mark').fitText(0.82);

        // // Get Height of Browser, apply it to map.
        // mapE = document.getElementById('map');
        // if (mapE) {
        //   bodyHeight = window.innerHeight;
        //   mapE.style.height = bodyHeight + 'px';
        //   console.log(bodyHeight);


        //   L.mapbox.accessToken = 'pk.eyJ1Ijoiamh1LWhvcGtpbnNsb2NhbCIsImEiOiJhYWU0NmI1MDNhYmQwYWMyNGE1ZmE2N2M2ZDQzOGU0ZSJ9.qIccEmDGFYTizXvc3O3SDQ';
        //   map = L.mapbox.map('map', 'jhu-hopkinslocal.c70885a8', {
        //     zoomControl: false
        //   });

        //   L.mapbox.featureLayer('jhu-hopkinslocal.c70885a8').on('ready', function() {
        //     map.fitBounds(this.getBounds());
        //   });



        //   map.dragging.disable();
        //   map.touchZoom.disable();
        //   map.doubleClickZoom.disable();
        //   map.scrollWheelZoom.disable();
        // }

        aboutControl = $('#js-show-about');
        learnAboutControl = $('#js-show-about-more');
        closeAboutControl = $('#js-close-about');
        $body = $('body');

        aboutControl.on('click', function(e) {
            e.preventDefault();
            $body.toggleClass('has-overlay');
        });

        if (learnAboutControl) {
            learnAboutControl.on('click', function(e) {
                e.preventDefault();
                $body.toggleClass('has-overlay');
            });
        }

        closeAboutControl.on('click', function(e) {
            e.preventDefault();
            $body.toggleClass('has-overlay');
        });
    });

})();


$(document).ready(function() {
    $("a[data-analytics-event]").each(function() {
        var href = $(this).attr("href");
        var target = $(this).attr("target");
        var text = $(this).text();
        $(this).click(function(event) { // when someone clicks these links
            event.preventDefault(); // don't open the link yet
            // _gaq.push(["_trackEvent", "External Links", "Clicked", href, , false]); // create a custom event
            ga('send', 'event', 'External Links', 'Clicked', href, false);
            if (href != "/about") {
                setTimeout(function() { // now wait 300 milliseconds...
                    window.open(href, (!target ? "_self" : target)); // ...and open the link as usual
                }, 300);
            }
        });
    });
});


// Load Partner Details via json
$(document).ready(function() {
    $('#js-panel').on('click', function(event) {
        $(document.body).removeAttr('data-panel-active');

        event.preventDefault();
    });

    $('#js-partner-list').on('click', '.js-partner-link', function(event) {
        var partnerId = $(this).data('partner-id');
        var request;
        var response = {};
        var tmplDef;
        var pageFn;

        tmplDef = doT.template(document.getElementById('tmpl-partner-detail').text);


        request = $.ajax({
            url: '/wp-json/wp/v2/partner/' + partnerId
        }).done(function(data) {
            var imageRequest;
            response.content = data;
            imageRequest = $.ajax({
                url: '/wp-json/wp/v2/media/' + data.featured_media
            }).done(function(data){
                response.image = data;
                $(document.body).attr('data-panel-active', '');
                $('#js-panel-content').html(tmplDef(response));
            });
        });

        event.preventDefault();
    });
});
