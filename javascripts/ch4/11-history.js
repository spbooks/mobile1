$(document).ready(function(){

  $("#tab-bar a").click(function(e){
    // clear visits history
    visits.clear();
    
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
  $(".back").live("click",function(){
    var lastPage = visits.back();
    if(lastPage) {
      transition(lastPage, "push", true);
    }
  });
  
  transition($("#page-spots"), "show");
});

var visits = {
  history: [],
  hasBack: function() {
    return this.history.length > 1;
  },
  add: function(page) {
    this.history.push(page);
  },
  back: function() {
    if(!this.hasBack()){
      return;
    }
    var curPage = this.history.pop();
    return this.history.pop();
  },
  clear: function() {
    this.history = [];
  }
};

function transition(toPage, type, reverse){
  var toPage = $(toPage),
    fromPage = $("#pages .current"),
    reverse = reverse ? "reverse" : "";
  
  visits.add(toPage);
  toPage.find(".back").toggle(visits.hasBack());

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