$(document).ready(function() {
  startrackr.init();
});

var startrackr = {
  pages: [],
  init: function(){
    $.each(this.pages, function(){
      this.init && this.init();
    });

    if(this.pages.length){
      this.pages[0].load();
    }
  },
  addPage: function(page) {
    this.pages.push(page);
  },
  loadPage: function(page, data) {
    page.load(data);
  }
};

var spots = {
  init: function(){
    // add handlers;
    $("#spots li a").live("click", function(e){
      e.preventDefault();
      spot.load($(e.target).attr("data-id"));
    });
  },
  load: function(){
    showSpinner();
    $.ajax({
      url: "/spots/",
      complete: function(){
        hideSpinner();
        transition("#spots", "fade");
      }
    });
  }
};

var spot = {
  init: function() {
    $("#spot-back").click(function(){
      transition("#spots", "push", true);
    })
  },
  load: function(id) {
    $.ajax({
      url: "/spot/" + id,
      complete: function(){
        // Set the header
        $("#spot .page-header h1").text(id);
        transition("#spot", "push");
      }
    });
  }
};

startrackr.addPage(spots);
startrackr.addPage(spot);

function showSpinner() {
  var elements = $("#spinner,#mask");
  elements.fadeIn();
}

function hideSpinner() {
  var elements = $("#spinner,#mask");
  elements.fadeOut();
}

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