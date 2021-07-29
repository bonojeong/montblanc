
//Jquery 원페이지 기능 
$(document).ready(function(){
    //a태그 새로고침 방지
    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });
    window.addEventListener("wheel",function(e){
        e.preventDefault();
    },{ passive: false });
    
    let html = $("html");
    let page = 1;
    let vH = window.innerHeight
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
        let posTop = (page-1) * vH;
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

let winY = window.scrollY; //전체 높이
let winX = window.innerWidth; //전체 넓이
let winH = window.innerHeight; //뷰포트 높이
let section = document.querySelectorAll('section'); //섹션들

//TheNewest 이미지 슬라이드 !
function ImgSlide(){
    let leftBtn = document.querySelector('.left_btn');
    let rightBtn = document.querySelector('.right_btn');
    let packedSlide = document.querySelector('.slide');
    let imageIndex = 0; //이미지 번호
    let position = 0; //얼만큼 움직이게할지 위치 값
    let imgs = document.querySelector('.new1')
    let packedSlide_Width = imgs.getBoundingClientRect();
    
    //왼쪽버튼 누를시 이미지+패딩값(80)만큼 움직이게 하고 
    //이미지 현재 값을 -1 감소
    //이미지index가 0이되면 opacity 값 0.2로 변경
    function previous(){
        if(imageIndex > 0){
            position += packedSlide_Width.width+80;
            packedSlide.style.transform = `translateX(${position}px)`;
            imageIndex = imageIndex - 1;
            leftBtn.style.opacity = '1';
            rightBtn.style.opacity = '1';
        }
        if(imageIndex == 0){
            leftBtn.style.opacity = '0.2'
        }
    }

    function next(){
        if(imageIndex < 5){
            position -= packedSlide_Width.width+80;
            packedSlide.style.transform = `translateX(${position}px)`
            imageIndex = imageIndex + 1;
            rightBtn.style.opacity = '1';
            leftBtn.style.opacity = '1';
        }
        if(imageIndex == 5){
            rightBtn.style.opacity= '0.2'
        }
    }
    function init(){
        leftBtn.addEventListener('click',previous)
        rightBtn.addEventListener('click',next)
        leftBtn.style.opacity = '0.2'
    }
    init()
}
ImgSlide()


///////////// 반응형 new product 드래그 이벤트/////////
function NewProductScrollEvent(){
    const scrollArr = document.querySelector('.scrollArr');
    const scroll_view = document.querySelector('.scroll_view');
    let isMouseDown = false;
    let startY
    let Y

    scroll_view.addEventListener('mousedown', e =>{
        isMouseDown = true;
        startY = e.offsetY - scrollArr.offsetTop
        scroll_view.style.cursor = 'grabbing'
    })

    scroll_view.addEventListener('mouseenter', () =>{
        scroll_view.style.cursor="grab"
    })

    scroll_view.addEventListener('mouseup',() => {
        scroll_view.style.cursor = 'grab'
    })

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    scroll_view.addEventListener('mousemove', e => {
        if(!isMouseDown) return
        e.preventDefault()
        Y = e.offsetY
        scrollArr.style.top = `${Y - startY}px`;
        checkboundary()
    })

    function checkboundary(){
        let outer = scroll_view.getBoundingClientRect()
        let inner = scrollArr.getBoundingClientRect()

        if(parseInt(scrollArr.style.top) > 0){
            scrollArr.style.top = '0px'
        }else if (inner.bottom < outer.bottom){
            scrollArr.style.top = `-${inner.height - outer.height}px`
        }
    }
}
NewProductScrollEvent()


////////////////// product Effect ////////////////////
//클론코딩
//이미지는 계속 넘어가고 어느 일정선이 되면 뒤에 다시 생성 
//이미지 move는 계속 작동
// 마우스 enter 시에는 함수 정지
const productSection = document.querySelector('.product')
let productSectionTop
const packed_product = document.querySelector('.packed_product');
let packed_productPos = 0
let timer
let mouseCheck = false
//top값 측정
// window.addEventListener('scroll',function(){
//     productSectionTop = productSection.getBoundingClientRect().top
//     if( productSectionTop == 0){
//         packed_product.addEventListener('mouseenter',function(){
//             mouseCheck = true
//             console.log(mouseCheck)
            
//         })
//         packed_product.addEventListener('mouseleave',function(){
//             mouseCheck = false
//             console.log(mouseCheck)
//         })
//         if(mouseCheck == false){
//             rightToLeft()
//         }else{
//             stopMove()
//         }
//     }
// })
// function rightToLeft(){
//     timer = setInterval(function(){
//         packed_productPos = packed_productPos + 1
//         packed_product.style.left = `-${packed_productPos}px`
//         console.log(mouseCheck)
//         // if(mouseCheck == true){
//         //     stopMove()
//         // }
//     },25)
// }
// function stopMove(){
//     clearInterval(timer)
// }







let navMenu = document.querySelectorAll('.nav_menu');
//newsPage event
function news(){
    let newsDate = document.querySelectorAll('.date')
    let newsText = document.querySelectorAll('.text')
    let newsPerson = document.querySelectorAll('.person')
    let newsArr = document.querySelectorAll('.newsArr');

    let newsEffect = function(){
        let initModule = function(){
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


//페이지 넘기기
    function newsPage(){
        let prevBtn = document.querySelector('.news_left');
        let nextBtn = document.querySelector('.news_right');
        let currentPage = 0;
        let currentPageNum = 1;
        let pageNum = document.querySelector('.pageNum p');
        function newPrevPage(){
            if(currentPage > 0){
                nextBtn.removeAttribute('disable')
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                currentPage = currentPage - 1;
                currentPageNum = currentPageNum - 1;
                newsDate[currentPage+1].classList.remove('newsEffect');
                newsText[currentPage+1].classList.remove('newsEffect');
                newsPerson[currentPage+1].classList.remove('newsEffect');
                newsDate[currentPage].classList.add('newsEffect');
                newsText[currentPage].classList.add('newsEffect');
                newsPerson[currentPage].classList.add('newsEffect');
                pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
                console.log(currentPage)
            }
            if(currentPage == 0){
                prevBtn.setAttribute('disable','true')
                prevBtn.style.opacity = '0.2'
                console.log(currentPage)
            }
        }
        function newNextPage(){
            if(currentPage < 4 ){
                prevBtn.removeAttribute('disable')
                nextBtn.style.opacity = '0.2'
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                currentPage = currentPage + 1;
                currentPageNum = currentPageNum+1
                newsDate[currentPage-1].classList.remove('newsEffect');
                newsText[currentPage-1].classList.remove('newsEffect');
                newsPerson[currentPage-1].classList.remove('newsEffect');
                newsDate[currentPage].classList.add('newsEffect');
                newsText[currentPage].classList.add('newsEffect');
                newsPerson[currentPage].classList.add('newsEffect');
                pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
                console.log(currentPage)
            }
            if(currentPage == 4){
                nextBtn.setAttribute('disable','true')
                nextBtn.style.opacity = '0.2'
                console.log(currentPage)
            }
        }
        function init(){
            nextBtn.addEventListener('click',newNextPage);
            prevBtn.addEventListener('click',newPrevPage);
            prevBtn.setAttribute('disabled','ture')
            prevBtn.style.opacity = '0.2'
            pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
        }
        init();
    }
    newsPage()
}
news()