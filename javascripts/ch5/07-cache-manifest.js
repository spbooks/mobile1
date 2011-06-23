$('document').ready(function(){
  var cache = window.applicationCache, cacheStatusValues = [
    "uncached", "idle", "checking",
    "downloading", "updateready", "obsolete" 
    ];
  
  $(cache).bind({ 
    "cached checking downloading error noupdate obsolete progress updateready": 
    function(e){
      var msg = "event: " + e.type + ", "; 
      msg += "online: " + (navigator.onLine) ? "yes" : "no"; 
      msg += ", status: " + cacheStatusValues[cache.status]; 
      
      if (e.type == 'error' && navigator.onLine) {
        msg+= ' (probably a syntax error in manifest)';
      } 
      // Print the message 
      console.log(msg);
    } 
  });
});