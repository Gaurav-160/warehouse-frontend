$(".menu > ul > li").click(function (e) {
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active")
})