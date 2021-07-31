
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

//방향키 입력막기 ! 
window.addEventListener("keydown", function(e) {
    // 스페이스바 && 방향키
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

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


////////////////// product Effect ////////////////////
//이미지는 계속 넘어가고 어느 일정선이 되면 뒤에 다시 생성 
//이미지 move는 계속 작동
// 마우스 enter 시에는 함수 정지

//1~6개 지정하고 한 묶음 움직인 값 측정해서 도달하면 뒤에 새롭게 복사
//움직인 값 0으로 초기화
let productSectionTop // product Y위치 값
let packed_productPos = 0
let move
let lastImg


window.onload = function(){
    let packed_product = document.querySelector('.packed_product');
    let product_list = document.querySelectorAll('.product_list')
    //이미지 하나의 넓이 값
    let product_list_width = product_list[1].getBoundingClientRect().width
    //각각의 이미지를 옆으로 나열
    product_list.forEach ( (element, index) => {
        element.style.left = `${product_list_width * index}px`
    })
    rightToLeft()
    function rightToLeft(){
        //[0]~[5]넓이 만큼 움직였으면
        //지나갔던 [0]~[5] 는 삭제하고
        //감싸고있는 div 에 append로 [0]~[5] 를 똑같이 생성
        //그러고 감싸고있는 div left를 0으로 변경
        //그러고 이미지 전체를 재선언
        move = setInterval(function(){
            packed_productPos++ // 위치값 1씩 이동
            //left 이동
            packed_product.style.left = `-${packed_productPos}px`
            if(packed_productPos == Math.floor(product_list_width*6)){
                for(let i=0; i <= 6; i++){
                    //지나간거 삭제
                    packed_product.removeChild(product_list[i]);
                    //노드 복사
                    lastImg = product_list[i].cloneNode(true);
                    //복사후에 생성
                    packed_product.appendChild(lastImg)
                }
                //left 0으로 초기화
                packed_productPos = 0
                //변수값 재설정
                product_list = document.querySelectorAll('.product_list')
            }
        },25)
    }
    // 멈추게하기
    function stopMove(){
        clearInterval(move)
    }
    // 마우스올리면 멈춤
    packed_product.addEventListener('mouseenter',stopMove)
     //마우스 빼면 다시움직임
    packed_product.addEventListener('mouseleave',rightToLeft)
}



let navMenu = document.querySelectorAll('.nav_menu');
//newsPage event
function news(){
    let newsDate = document.querySelectorAll('.date')
    let newsText = document.querySelectorAll('.text')
    let newsPerson = document.querySelectorAll('.person')
    let newsArr = document.querySelectorAll('.newsArr');
    let currentPage = 0;
    let newsEffect = function(){
        //스크롤 감지
        window.addEventListener('scroll', function(){
            for (let i = 0; i < section.length; i++) {
                //섹션3의 탑값
                let posFromTop = section[3].getBoundingClientRect().top;
                //top == 0 일때 현재페이지 번호 가져와서 효과이펙트
                if (posFromTop == 0 ) {
                    newsDate[currentPage].classList.add('newsEffect');
                    newsText[currentPage].classList.add('newsEffect');
                    newsPerson[currentPage].classList.add('newsEffect');
                    //0 이 아니면 효과 제거
                }else{
                    newsDate[currentPage].classList.remove('newsEffect');
                    newsText[currentPage].classList.remove('newsEffect');
                    newsPerson[currentPage].classList.remove('newsEffect');
                }
            }
        });
    }
    newsEffect()
//페이지 넘기기
    function newsPage(){
        let prevBtn = document.querySelector('.news_left');
        let nextBtn = document.querySelector('.news_right');
        //현재페이지 인덱스넘버
        currentPage = 0;
        //현재페이지
        let currentPageNum = 1;
        let pageNum = document.querySelector('.pageNum p');
        //이전 버튼 눌렀을 때 함수
        function newPrevPage(){
            //현재 페이지가 0이상일때
            if(currentPage > 0){
                //버튼 스타일 변경(초기화)
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                //현재페이지 index와 번호 변경
                currentPage = currentPage - 1;
                currentPageNum = currentPageNum - 1;
                //클래스 붙여서 모션 주기
                newsDate[currentPage+1].classList.remove('newsEffect');
                newsText[currentPage+1].classList.remove('newsEffect');
                newsPerson[currentPage+1].classList.remove('newsEffect');
                newsDate[currentPage].classList.add('newsEffect');
                newsText[currentPage].classList.add('newsEffect');
                newsPerson[currentPage].classList.add('newsEffect');
                //페이지 넘버에 맞게 텍스트 띄우기
                pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
            }
            //페이지 인덱스가 0이면 버튼 스타일 변경
            if(currentPage == 0){
                prevBtn.style.opacity = '0.2'
            }
        }
        //다음버튼 눌렀을 때
        function newNextPage(){
            //현재페이지가 전체길이보다 작을때
            if(currentPage < newsArr.length-1 ){
                //스타일변경
                nextBtn.style.opacity = '0.2'
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                //index와 번호 +1 
                currentPage = currentPage + 1;
                currentPageNum = currentPageNum+1
                //클래스 추가,제거로 모션주기
                newsDate[currentPage-1].classList.remove('newsEffect');
                newsText[currentPage-1].classList.remove('newsEffect');
                newsPerson[currentPage-1].classList.remove('newsEffect');
                newsDate[currentPage].classList.add('newsEffect');
                newsText[currentPage].classList.add('newsEffect');
                newsPerson[currentPage].classList.add('newsEffect');
                pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
            }
            //마지막 페이지가 되면 버튼스타일 변경
            if(currentPage == newsArr.length-1){
                nextBtn.style.opacity = '0.2'
            }
        }
        //처음일때
        function init(){
            nextBtn.addEventListener('click',newNextPage);
            prevBtn.addEventListener('click',newPrevPage);
            prevBtn.style.opacity = '0.2'
            pageNum.textContent = `${currentPageNum} / ${newsArr.length}`
        }
        init();
    }
    newsPage()
}
news()