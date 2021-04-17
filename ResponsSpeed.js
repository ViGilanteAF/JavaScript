var 스크린 = document.querySelector('#screen');

var state = {

};
스크린.addEventListener('click',function(){
    if(스크린.classList.contains('waiting')){
        //classList.contains로 현재 클래스를 파악할 수 있음
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요!';
    }else if(스크린.classList.contains('ready')){
        스크린.classList.remove('ready');
        스크린.classList.add('now');
        스크린.textContent = '클릭하세요!';
    }else if(스크린.classList.contains('now')){
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요!';
    }
    
    
    
});