$(document).ready(function(){
	$.getJSON("../data/spots.json", function(data){
    // Got JSON, now template it!
    var html = "";
    for(var i = 0; i < data.length; i++) {
      html += "<li><a href='#'>";
      html += "<h2>" + data[i].name + "</h2>";
      html += "</a></li>";
    }
    $("#spots-list").append(html);
  });
});
