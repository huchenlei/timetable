$(document).ready(function(){
    $("#show-advanced").on("click", function() {
        $(".advanced-search").toggleClass("hide");
    });
    $("#smart").on("click", function() {
        $(".right-bar").toggleClass("hide");
        $("#smart").toggleClass("button-position");
        $(".main").toggleClass("main-size");
        $(".arrowright").toggleClass("movearrow");
    }); 
});
