$('document').ready(function(){
  $(window).bind("devicemotion", function(e){
  	var motionEvent = e.originalEvent,
  		accel = motionEvent.accelerationIncludingGravity,
      	x = accel.x,
      	y = accel.y,
      	z =  accel.z;
  
  	$("body").html(
  		"x:" + x + "<br/>" +
  		"y:" + y + "<br/>" +
  		"z:" + z
  	);
  });
});
