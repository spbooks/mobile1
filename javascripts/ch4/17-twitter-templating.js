$(document).ready(function(){
  var twitQuery = "celeb+sighting",
      twitUrl = "http://search.twitter.com/search.json?q=";
  
  $.getJSON(twitUrl + twitQuery + "&callback=?", function(data){
    $("#tmpl-tweet")
      .tmpl(data.results)
      .appendTo("#sightings-list");
  });
});
