
//my_menu 생성
$(document).ready(function(){
    $(".my_menu").load("../myMenu/index.html");
    //a태그 새로고침 방지
    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });

    window.addEventListener("wheel",function(e){
        e.preventDefault();
    },{ passive: false });
    
    let html = $("html");
    let page = 1;
    let lastPage = $(".section").length+1;
    html.animate({scrollTop:0},10);

    $(window).on("wheel",function(e){
        if(html.is(":animated")) return;

        if(e.originalEvent.deltaY > 0){
            if(page == lastPage) return;
            page++;
        }else if(e.originalEvent.deltaY < 0){
            if(page == 1) return;
            page --
        }
        let posTop = (page-1) * 969;
        html.animate({scrollTop : posTop});

        if(page == 1){
            $(navMenu[0]).css('opacity','1')
            $(navMenu[1]).css('opacity','0')
        }else if (page == 2){
            $(navMenu[1]).css('opacity','1')
            $(navMenu[1]).css('color','#000')
            $(navMenu[0]).css('opacity','0')
            $(navMenu[2]).css('opacity','0')
        }else if (page == 3) {
            $(navMenu[2]).css('color','#fff')
            $(navMenu[2]).css('opacity','1')
            $(navMenu[1]).css('opacity','0')
            $(navMenu[3]).css('opacity','0')
        }else if (page == 4) {
            $(navMenu[3]).css('color','#fff')
            $(navMenu[3]).css('opacity','1')
            $(navMenu[2]).css('opacity','0')
            $(navMenu[4]).css('opacity','0')
        }else if (page == 5) {
            $(navMenu[4]).css('color','#000')
            $(navMenu[4]).css('opacity','1')
            $(navMenu[3]).css('opacity','0')
        }else {
            $(navMenu[0]).css('opacity','0')
            $(navMenu[4]).css('opacity','0')
        }
    })
})


let winY = window.scrollY;
let winH = window.innerHeight;
let navMenu = document.querySelectorAll('.nav_menu');
let section = document.querySelectorAll('section');
let sec1Rect = section[0].getBoundingClientRect();
let sec2Rect = section[1].getBoundingClientRect();
let sec3Rect = section[2].getBoundingClientRect();
let sec4Rect = section[3].getBoundingClientRect();
let sec5Rect = section[4].getBoundingClientRect();
// -------nav 클릭했을때 이동 ------------
// function moveSec1(){
//     window.scrollTo({top:0, behavior:'smooth'});
// }
// function moveSec2(){
//     window.scrollTo({top:969, behavior:'smooth'});
// }
// function moveSec3(){
//     window.scrollTo({top:1938, behavior:'smooth'});
// }
// function moveSec4(){
//     window.scrollTo({top:2907, behavior:'smooth'});
// }
// function moveSec5(){
//     window.scrollTo({top:3876, behavior:'smooth'});
// }

// ------- news 섹션에 왔을 때 인터렉션 --------
let newsEffect = function(){
    let newsDate, newsText, newsPerson

    let initModule = function(){
        newsDate = document.querySelector('.date');
        newsText = document.querySelector('.text');
        newsPerson = document.querySelector('.person');
        _addEventHandlers();
    }
    let _addEventHandlers = function(){
        window.addEventListener('scroll', _checkPosition);
    }
    let _checkPosition = function (){
        for( let i=0; i<section.length; i++ ){
            let posFromTop4 = section[3].getBoundingClientRect().top;
            if(winH > posFromTop4 + 700) {
                newsDate.classList.add('newsEffect');
                newsText.classList.add('newsEffect');
                newsPerson.classList.add('newsEffect');
            }
        }
    }
    return {
        init: initModule
    }
}
newsEffect().init();

// ----------어두운 섹션에 위치해 있을 때 nav 색상 변경 ----------

