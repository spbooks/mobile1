$('document').ready(function(){
  var hasTouch = "ontouchend" in document,
      touchEndEvent = "touchend";
  
  // Default to mouse up, if there's no touching
  if (!hasTouch) {
    touchEndEvent = "mouseup";
  }
  
  $("#tab-bar li").bind(touchEndEvent, function(){
    alert("Coming soon!");
  });
});