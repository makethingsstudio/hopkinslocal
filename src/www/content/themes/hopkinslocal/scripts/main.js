! function() {
  "use strict";
  var o, e, a, l, s, n, t;
  $(function() {
    $("#js-video-gallery").colorbox(), t = document.getElementById("map"), t && (a = window.innerHeight, t.style.height = a + "px", console.log(a), L.mapbox.accessToken = "pk.eyJ1Ijoiamh1LWhvcGtpbnNsb2NhbCIsImEiOiJhYWU0NmI1MDNhYmQwYWMyNGE1ZmE2N2M2ZDQzOGU0ZSJ9.qIccEmDGFYTizXvc3O3SDQ", n = L.mapbox.map("map", "jhu-hopkinslocal.c70885a8", {
      zoomControl: 1
    }), L.mapbox.featureLayer("jhu-hopkinslocal.c70885a8").on("ready", function() {
      n.fitBounds(this.getBounds())
    }),  n.touchZoom.disable(), n.doubleClickZoom.disable(), n.scrollWheelZoom.disable()), o = $("#js-show-about"), s = $("#js-show-about-more"), l = $("#js-close-about"), e = $("body"), o.on("click", function(o) {
      o.preventDefault(), e.toggleClass("has-overlay")
    }), s && s.on("click", function(o) {
      o.preventDefault(), e.toggleClass("has-overlay")
    }), l.on("click", function(o) {
      o.preventDefault(), e.toggleClass("has-overlay")
    })
  })
}();
