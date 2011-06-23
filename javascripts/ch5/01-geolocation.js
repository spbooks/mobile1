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