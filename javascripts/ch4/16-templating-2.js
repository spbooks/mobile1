$(document).ready(function(){
	$.getJSON("../data/spots.json", function(data){
    // Got JSON, now template it!
    $.each(data, function(){
      var newItem = $("#tmpl-simple").clone();
    
      // Now fill in the fields with the data
      newItem.find("h2").text(this.name);
      newItem.find(".relative-distance").text(this.distance);
      newItem.find(".sightings").text(this.sightings);
      
      // And add the new list item to the page
      newItem.children().appendTo("#spots-list")
    });
    transition("#spots", "show");
  });
});
