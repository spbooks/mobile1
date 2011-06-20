$('document').ready(function(){
  var lastX,
  	lastY,
  	lastZ,
  	lastShake = new Date().getTime(),
  	threshold = 10;
  
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
  	
  
  	if(lastX !== null && lastY !== null &&  lastZ !== null) {
  
  	  var diffX = Math.abs(x - lastX),
  	  	diffY = Math.abs(y - lastY),
  	  	diffZ = Math.abs(z - lastZ);
  
  	  if (diffX > threshold && diffY > threshold ||
  		diffX > threshold && diffZ > threshold ||
  		diffY > threshold && diffZ > threshold) {
  			var now = new Date().getTime(),
  	  			diffTime = now - lastShake;
  
  	  		if (diffTime > 500) {
  	  			alert("Shaken!");
  	    		lastShake = now;
  			}
  		}
  	}
  
  	// Replace for next time
  	lastX = x;
  	lastY = y;
  	lastZ = z;
  });
});
