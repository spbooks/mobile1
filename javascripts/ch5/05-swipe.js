$('document').ready(function(){
	// Swipe left & right
	var xStart;
	$("#gallery").bind({
		"touchstart mousedown": function(e) {
			e.preventDefault();
			var event = e.originalEvent,
				touch = event.targetTouches ? event.targetTouches[0] : e;

			xStart = touch.pageX;
		},
		"touchend mouseup": function(e) {
			var event = e.originalEvent,
				touch = event.changedTouches ? event.changedTouches[0] : e,
				diffX = touch.pageX - xStart;

			// See if we swiped!
			if(Math.abs(diffX) > 30) {
				if( diffX > 0 ){
					slidePic(false);
				} 
				else {
					slidePic(true);
				}
			}
		},
		"touchmove": function(e) {
			e.preventDefault();
		}
	});
});

function slidePic(isLeft) {
	var photos = $("#gallery > div"),
		current = photos.siblings(".current"),
		next;

	if(isLeft) {
		next = current.next();					
	}
	else {
		next = current.prev();
	}
	if(next.length === 0){
		return;
	}

 	transition(next, current, "push", !isLeft);			
}

function transition(toPage, fromPage, type, reverse) {
	var toPage = $(toPage),
		fromPage = $(fromPage),
		reverse = reverse ? "reverse" : "";

	if(toPage.hasClass("current") || toPage === fromPage) { 
		return; 
	};
	toPage
		.addClass("current " + type + " in " + reverse)
		.one("webkitAnimationEnd", function(){
			fromPage.removeClass("current " + type + " out " + reverse);
			toPage.removeClass(type + " in " + reverse);
		});
	fromPage.addClass(type + " out " + reverse);
}
