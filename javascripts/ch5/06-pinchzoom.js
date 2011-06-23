$('document').ready(function(){

  var rotation = 0, scale = 1;
  
  $("#cropper").bind({ 
    "gesturechange": function(e) {
      var gesture = e.originalEvent;
      // Update the image
      var curScale = gesture.scale * scale; 
      var curRotation = (gesture.rotation + rotation) % 360; 
  		$("#photo").css(
  			"webkitTransform", 
  			"scale(" + curScale + ")" + "rotate(" + curRotation + "deg)"
  		);
    },
    "gestureend": function(e) { 
      var gesture = e.originalEvent; 
      // Store the details for the next gesture
      scale *= gesture.scale; 
      rotation = (rotation + gesture.rotation) % 360;
    } 
  });
}