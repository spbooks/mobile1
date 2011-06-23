$('document').ready(function() {
  var $has = {
    touch: "ontouchend" in document,
    orientation: "onorientationchange" in window,
    geolocation: typeof navigator.geolocation != "undefined",
    transitions: "WebKitTransitionEvent" in window,
    canvas: !!document.createElement("canvas").getContext,
    audio: !!document.createElement("audio").canPlayType,
    localStorage: "localStorage" in window
  };

  var seen = false;
  if($has.localStorage) {
    seen = window.localStorage["seen"] || false;
    window.localStorage["seen"] = "seen";
  }
  if(navigator.standalone != undefined && !!!navigator.standalone && !seen) {
    $("#addToHome").show();
  }
});