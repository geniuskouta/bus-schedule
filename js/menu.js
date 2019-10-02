$( document ).ready(function() {
//menu
    $(".toggle-menu").click(function() {
    $(this).toggleClass("active");
    $('.menu-drawer').toggleClass("open");          
    if($('div.container').css('overflow')=='hidden'){
        $('div.container').css('overflow', 'visible'); 
    }else if($('div.container').css('overflow')=='visible'){
        setTimeout(()=>{
        $('div.container').css('overflow', 'hidden');
        }, 300);
    }
    });

    $("a.choice").click(function(){
    $(".toggle-menu").toggleClass("active");
    $('.menu-drawer').toggleClass("open");
    if($('div.container').css('overflow')=='visible'){
        setTimeout(()=>{
        $('div.container').css('overflow', 'hidden');
        }, 300);
    }
    });

    //destination-choices
    $("#selectDestination").click(function(){
    $(".toggle-menu").css("display", "none");
    $(".choice-drawer").addClass("open");
    $('div.destination-choices').css('overflow', 'visible'); 
    });

    $("a.des-choice").click(function(){
    $(".toggle-menu").css("display", "inline-block");
    $(".choice-drawer").removeClass("open");
    if($('div.destination-choices').css('overflow')=='visible'){
        setTimeout(()=>{
        $('div.destination-choices').css('overflow', 'hidden');
        }, 300);
    }
    });

    //see more schedule
    $("a#button").click(function(){
    $(".more-schedule").toggleClass("schedule-shown");
    });
});