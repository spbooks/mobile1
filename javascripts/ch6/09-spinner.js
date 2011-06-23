function spinner(blnShow) {
  var elements = $("#spinner,#mask");
  if(blnShow) {
    elements.fadeIn();
  }
  else {
    elements.fadeOut();
  }
}

$('document').ready(function() {
spinner(true);
$.ajax({
  url: "http://search.twitter.com/search.json?q=stars&callback=?",
  success: function(data){
    // Do something with the data
  },
  complete: function(){
    spinner(false);
  }
});
});