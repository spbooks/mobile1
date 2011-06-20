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
  

});

function transition(toPage, type) {
  var toPage = $(toPage),
    fromPage = $("#pages .current");
    
  if(toPage.hasClass("current") || toPage === fromPage) { 
    return; 
  };
  
  toPage
    .addClass("current " + type + " in")
    .one("webkitAnimationEnd", function(){
      fromPage.removeClass("current " + type + " out");
      toPage.removeClass(type + " in")
    });
  fromPage.addClass(type + " out");
  
  if(!("WebKitTransitionEvent" in window)){
    toPage.addClass("current");
    fromPage.removeClass("current");
    return;
  }
}