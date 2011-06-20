$(document).ready(function(){
	
  $("#tab-bar a").click(function(e){
    e.preventDefault();
    var url = e.target.href;
    var pageName = $(this).attr('data-load');
    loadPage(url, pageName);
  });

});

function loadPage(url, pageName) {
  $("#" + pageName).load(url + " .wrapper", function(){
    console.log(this);
    transition("#" + pageName, "fade", false);
  });
};

function transition(toPage, type, reverse){
  if(toPage) {
    // Set the current icon
    $("#tab-bar").attr("className", toPage.slice(1));
  }
  var toPage = $(toPage),
    fromPage = $("#pages .current"),
    reverse = reverse ? "reverse" : "";

  toPage.find(".back").toggle(true);

  if(toPage.hasClass("current") || toPage === fromPage) { 
    return; 
  };

  // For non-animatey browsers
  if(!("WebKitTransitionEvent" in window)){
      toPage.addClass("current");
      fromPage.removeClass("current");
      return;
  }
  
  toPage
    .addClass("current " + type + " in " + reverse)
    .one("webkitAnimationEnd", function(){
      fromPage.removeClass("current " + type + " out " + reverse);
      toPage.removeClass(type + " in " + reverse);
    });
  fromPage.addClass(type + " out " + reverse);
}