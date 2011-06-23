$('document').ready(function(){
  
  var $has = {
    touch: "ontouchend" in document,
    orientation: "onorientationchange" in window,
    geolocation: typeof navigator.geolocation != "undefined",
    transitions: "WebKitTransitionEvent" in window,
    canvas: !!document.createElement("canvas").getContext,
    audio: !!document.createElement("audio").canPlayType
  };

  // Use our detection object
  if($has.touch) {
    alert("we've got touch!");
  }
});

