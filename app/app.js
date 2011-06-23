var pageState = {};
$(document).ready(function(){
  
  $("#tab-bar a").click(function(e){
    var pageState = {};
    e.preventDefault();
    changePage(e.target.hash, 'fade');
    $("#tab-bar").attr("className", e.target.hash.slice(1));
  });
  
  $("#spots-list li").click(function(e){
    e.preventDefault();
    changePage("#page-spot", "push");
  });
  $("#stars-list li").click(function(e){
    e.preventDefault();
    changePage("#page-star", "push");
  });
  $(".back").live("click",function(e){
    e.preventDefault();
    window.history.back();
  });
  
  changePage("#page-spots", "show");
});

window.addEventListener("popstate", function(event) {
  if(!event.state){ 
    return;
  }
  // Transition back - but in reverse.
  transition(
    event.state.page, 
    event.state.transition, 
    !event.state.reverse
  );
  pageState = {
    state: {
      page: event.state.page,
      transition: event.state.transition,
      reverse: event.state.reverse
    },
    title: "",
    url: event.state.page
  };
}, false);

function changePage(page, type, reverse) {
  // Store the transition with the state
  if(pageState.url){
    // Update the previous transition to be the NEXT transition
    pageState.state.transition = type;
    window.history.replaceState(
      pageState.state,
      pageState.title,
      pageState.url);
  }
  // Keep the state details for next time!
  pageState = {
    state: {
      page: page,
      transition: type,
      reverse: reverse
    },
    title: "",
    url: page
  };
  window.history.pushState(pageState.state, pageState.title, pageState.url);  
  // Do the real transition
  transition(page, type, reverse);
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

$('document').ready(function(){
  $(".locate-me").click(function(e){
    e.preventDefault();
    fetchGeo();
  });
});

function fetchGeo() {
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      // Succesfully got location
      var lat = pos.coords.latitude,
          lng = pos.coords.longitude;
      fetchLocations(lat, lng);
    },
    function(error) {
      // Failed to get location
      alert(error);
    }, {
      // Options for geolocation
      maximumAge: 10000, 
      timeout: 10000,
      enableHighAccuracy: true
    }
  );
}
      
      
function fetchLocations(lat, lng) {
  var keywords = $("#address").val(),
      location = "&ll=" + lat + "," + lng,
      query = keywords ? "&query=" + keywords : "",
      secrets = "&client_id=YOUR_CLIENT_ID_GOES_HERE&client_secret=YOUR_CLIENT_SECRET_GOES_HERE";
  $.ajax({
    url: "https://api.foursquare.com/v2/venues/search?" + location + query + secrets + "&callback=",
    type: "GET",
    dataType: "JSON",
    success: function(data){
      displayLocations(data.response.groups);
    },
    error: function(){
      alert("Error.");
      console.log(arguments);
    }
  })
}

function displayLocations(groups) {
  $("#spots-list").children().remove();
  for(var i = 0; i < groups.length; i++) {
    if(groups[i].type === 'places' || groups[i].type === 'nearby') {
      $("#tmpl-4sq")
        .tmpl(groups[i].items)
        .appendTo("#spots-list");
    }
  }
}