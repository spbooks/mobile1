$('document').ready(function(){
  $("#sightings-list li").each(function(){
    new MBP.fastButton(this, function() {
      alert("super fast click!");
    }); 
  });
});