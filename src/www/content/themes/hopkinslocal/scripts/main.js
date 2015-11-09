/* globals L: false */
/* globals $: false */

(function () {
  'use strict';

  var aboutControl;
  var $body;
  var bodyHeight;
  var closeAboutControl;
  var learnAboutControl;
  var map;
  var mapE;


  $.analytics({
    autoEvents: true
  });


  $(function () {
    $('#js-video-gallery').colorbox({
      iframe: true,
      innerWidth: 500,
      innerHeight: 409
    });


    $('#js-fit-local').fitText(0.9);
    $('#js-overlay-fit-local').fitText(.84);

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
