$(document).ready(function(){

  $("#tab-bar a").click(function(e){
    e.preventDefault();
    var nextPage = $(e.target.hash);
    transition(nextPage, 'fade');
    $("#tab-bar").attr("className", e.target.hash.slice(1));
  });
  
  $("#spots-list li").click(function(e){
    e.preventDefault();
    transition("#page-spot", "push");
  });
  $("#stars-list li").click(function(e){
    e.preventDefault();
    transition("#page-star", "push");
  });
  $("#page-spot .back").click(function(e){
    e.preventDefault();
    transition("#page-spots", "push", true);
  });
});

function transition(toPage, type, reverse) {
  var toPage = $(toPage),
    fromPage = $("#pages .current");
    reverse = reverse ? "reverse" : "";
    
  if(toPage.hasClass("current") || toPage === fromPage) { 
    return; 
  };
  
  toPage
    .addClass("current " + type + " in " + reverse)
    .one("webkitAnimationEnd", function(){
      fromPage.removeClass("current " + type + " out " + reverse);
      toPage.removeClass(type + " in " + reverse)
    });
  fromPage.addClass(type + " out " + reverse);
  
  if(!("WebKitTransitionEvent" in window)){
    toPage.addClass("current");
    fromPage.removeClass("current");
    return;
  }
}