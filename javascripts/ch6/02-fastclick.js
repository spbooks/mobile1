$('document').ready(function(){
  $("#sightings-list li").bind({
    "touchstart": function(e){
      $(this).data("clicked", new Date().getTime());
    },
    "touchend": function(e){
      var now = new Date().getTime(),
        start = $(this).data("clicked");
      if(now - start > 400) {
        return
      };
      // Do code!
    }
  });
});