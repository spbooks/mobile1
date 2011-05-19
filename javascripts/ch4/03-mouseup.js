$('document').ready(function(){
  // Stop clicks from following links
  $("#tab-bar li a").click(function(e){
    e.preventDefault();
  });
  
  // Do our magic on mouse-up!
  $("#tab-bar li").bind("mouseup", function(){
    alert("Coming soon!");
  });
});