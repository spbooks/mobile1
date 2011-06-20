$(document).ready(function(){
	// Ex 03-01 - swapping pages
	$("#tab-bar a").click(function(e){
		e.preventDefault();
		var nextPage = $(e.target.hash);
		$("#pages .current").removeClass("current");
		nextPage.addClass("current");
		$("#tab-bar").attr("className", e.target.hash.slice(1));
	});
});