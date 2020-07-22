// window-loader
$(window).on("load", function(){
  $(".loader-wrapper").fadeOut("fast")
})



// navbar headroom.js
var navbar = document.querySelector("#navigation-bar")

var headroom = new Headroom(navbar,{
    tolerance:{
        up:2,
        down:0
    }
});
headroom.init();
$(document).ready(function(){
$(this).scrollTop(0,0);
});



// blog-sidebar 
function openNav() {
  document.getElementById("mySidebar").style.width = "280px";
  // document.getElementById("main").style.marginLeft = "280px";
}


function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  // document.getElementById("main").style.marginLeft = "0";
}
