//=require jquery.js
//=require tether.js
//=require bootstrap.js

// Sidebar toggle
$("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Enable Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Bootstrap button dropdown inside responsive table not visible because of scroll
// http://stackoverflow.com/questions/26018756/bootstrap-button-drop-down-inside-responsive-table-not-visible-because-of-scroll
$('body') .on('show.bs.dropdown', '.table-responsive', function () { $(this).css("overflow", "visible"); })
.on('hide.bs.dropdown', '.table-responsive', function () { $(this).css("overflow", "auto"); });
