//=require jquery.js
//=require tether.js
//=require bootstrap.js

// Sidebar toggle
$("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
