$(document).ready(function(){

  $("#tab-bar a").click(function(e){
    e.preventDefault();
    var nextPage = $(e.target.hash);
    transition(nextPage);
    $("#tab-bar").attr("className", e.target.hash.slice(1));
  });
  

});

function transition(toPage) {
  var toPage = $(toPage),
    fromPage = $("#pages .current");
    
  if(toPage.hasClass("current") || toPage === fromPage) { 
    return; 
  };
  
  toPage
    .addClass("current fade in")
    .one("webkitAnimationEnd", function(){
      fromPage.removeClass("current fade out");
      toPage.removeClass("fade in")
    });
  fromPage.addClass("fade out");
  
  if(!("WebKitTransitionEvent" in window)){
    toPage.addClass("current");
    fromPage.removeClass("current");
    return;
  }
}