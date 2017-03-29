$(document).ready(function(){
    $("#show-advanced").on("click", function() {
        $(".advanced-search").toggleClass("hide");
    });
    $(".smart-button").on("click", function() {
        $(".right-bar").toggleClass("hide");
        $(".smart-button").toggleClass("button-position");
        $(".main").toggleClass("main-size");
        $(".arrowright").toggleClass("movearrow");
    }); 
});
