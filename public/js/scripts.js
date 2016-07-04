//=require jquery.js
//=require tether.js
//=require bootstrap.js
$("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
