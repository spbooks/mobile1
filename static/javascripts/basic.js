$(document).ready(function() {
  Modernizr.addTest('standalone',function(){
    return window.navigator.standalone;
  });
  setTabBarPosition();
  setTimeout(function() {
    window.scrollTo(0,0); 
    setTabBarPosition();
  }, 500)
});
window.onscroll = function() {
  setTabBarPosition();
}
var setTabBarPosition = function() {
  if (window.navigator.standalone) {
    document.getElementById('tab-bar').style.top = (window.pageYOffset + window.innerHeight - 65) + 'px';
  } else {
    document.getElementById('tab-bar').style.top = (window.pageYOffset) + 'px';
  }
}