$('document').ready(function(){
  $(window).bind("orientationchange", function(){
    switch(window.orientation) {
      case 0:
        $("#about").hide();
        break;
      case 90:
      case -90:
        $("#about").show();
        break;
    }
  });
});
