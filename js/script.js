
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

//TheNewest 이미지 슬라이드 !

function ImgSlide(){
    let leftBtn = document.querySelector('.left_btn');
    let rightBtn = document.querySelector('.right_btn');
    let packedSlide = document.querySelector('.slide');
    let imageIndex = 0;
    let position = 0;
    let packedSlide_Width = 372

    function previous(){
        if(imageIndex > 0){
            rightBtn.removeAttribute("disabled")
            position += packedSlide_Width;
            packedSlide.style.transform = `translateX(${position}px)`;
            imageIndex = imageIndex - 1;
            leftBtn.style.opacity = '1';
            rightBtn.style.opacity = '1';
        }
        if(imageIndex == 0){
            leftBtn.setAttribute('disabled','true')
            leftBtn.style.opacity = '0.2'
        }
    }
    function next(){
        if(imageIndex < 5){
            leftBtn.removeAttribute('disable')
            position -= packedSlide_Width;
            packedSlide.style.transform = `translateX(${position}px)`
            imageIndex = imageIndex + 1;
            rightBtn.style.opacity = '1';
            leftBtn.style.opacity = '1';
        }
        if(imageIndex == 5){
            rightBtn.setAttribute('disable','true')
            rightBtn.style.opacity= '0.2'
        }
    }
    function init(){
        leftBtn.setAttribute('disabled','true')
        leftBtn.addEventListener('click',previous)
        rightBtn.addEventListener('click',next)
        leftBtn.style.opacity = '0.2'
    }
    init()
}
ImgSlide()




let winY = window.scrollY;
let winH = window.innerHeight;
let navMenu = document.querySelectorAll('.nav_menu');
let section = document.querySelectorAll('section');

function news(){
    // let newsDate = document.querySelectorAll('.date')
    // let newstext = document.querySelectorAll('.text')
    // let newsperson = document.querySelectorAll('.person')

    let newsEffect = function(){
        let newsDate, newsText, newsPerson, newsArr 
        
        let initModule = function(){
            newsDate = document.querySelectorAll('.date');
            newsText = document.querySelectorAll('.text');
            newsPerson = document.querySelectorAll('.person');
            newsArr = document.querySelectorAll('.newsArr');
            _addEventHandlers();
        }
        let _addEventHandlers = function(){
            window.addEventListener('scroll', _checkPosition);
            window.addEventListener("load", _checkPosition);
            window.addEventListener("resize", initModule);
        }
        var _checkPosition = function () {
            for (var i = 0; i < section.length; i++) {
            var posFromTop = section[3].getBoundingClientRect().top;
            if (winH > posFromTop+500) {
                newsDate[0].classList.add('newsEffect');
                newsText[0].classList.add('newsEffect');
                newsPerson[0].classList.add('newsEffect');
            }
            }
        }
        return {
            init: initModule
        }
    }
    newsEffect().init();


    function newsPage(){
        let prevBtn = document.querySelector('.news_left');
        let nextBtn = document.querySelector('.news_right');
        let currentPage = 0;
        
        nextBtn.addEventListener('click',newPrevPage)

        function newPrevPage(){
            if(currentPage == 0){
                prevBtn.setAttribute('disable','true')
                prevBtn.style.opacity = '0.2'
                newsDate1.classList.add('newsEffect');
                newsText1.classList.add('newsEffect');
                newsPerson1.classList.add('newsEffect');
            }
            if(currentPage > 0){
                nextBtn.removeAttribute('disable')

            }
        }
    }
}
news()