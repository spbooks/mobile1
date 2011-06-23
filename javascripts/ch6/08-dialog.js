$('document').ready(function(){
  showDialog({heading: "My Dialog Box", content: "This is a dialog!", cancel: true}, clickedOk, clickedCancel);
});

function showDialog(options, OKCallback, CancelCallback) {
  var dialog = $("#dialog");
  // Set defaults.
  var settings = $.extend({
        heading: "Notice",
        content: "",
        cancel: false
      }, options);
  
  // Set the text
  dialog.find(".heading").text(settings.heading);
  dialog.find(".content").text(settings.content);
  
  dialog.find("#ok").one("click", function() {
    $("#dialog,#mask").fadeOut();
    OKCallback && OKCallback();
  });
    
  if(options.cancel) {
    dialog.find("#cancel")
      .one("click", function(){
        $("#dialog,#mask").fadeOut();
        CancelCallback && CancelCallback();
      })
      .show();
  }
  else {
    dialog.find("#cancel").hide();
  }
  
  $("#dialog,#mask").fadeIn();
}

function clickedOk() {
  alert("Clicked OK!");
}

function clickedCancel() {
  alert("Clicked Cancel!");
}