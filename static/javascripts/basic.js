// Move the tab bar
var setTabBarPosition = function() {
  if(Modernizr.standalone) {
    document.getElementById('tab-bar').style.top = (window.pageYOffset + window.innerHeight - 65) + 'px';
  }
}

// Bind setTabBarPosition to scoll event
window.onscroll = function() {
  setTabBarPosition();
}

// To be used by the fastButton function
var followURL = function(e) {
  window.location = this.element.href;
  e.preventDefault();
}


// DOM ready
$(document).ready(function() {
  
  // Add a test to Modernirz for `clip: rect()`
/*  Modernizr.addTest('clip', function() {
    var test = document.createElement('div'),
        root = document.body || (function () {
            fake = true;
            return document.documentElement.appendChild(document.createElement('body'));
        }());
    test.style.cssText = 'clip:rect(0 0 0 0)'; 
    root.appendChild(test);
    var ret = !!~(''+test.style.clip).indexOf( 'rect' )
    root.removeChild(test);
    return ret;
  }); */

  // Add a test to Modernirz for standalone mode
  Modernizr.addTest('standalone',function(){
    return window.navigator.standalone;
  });
  
  if(!Modernizr.standalone) {
    MBP.hideUrlBar();
  }
  // Set the initial position of the tab bar
  setTabBarPosition();

  // Override normal links with fastButton behaviour
  $('a').each(function() {
    new MBP.fastButton(this, followURL);
  });
});