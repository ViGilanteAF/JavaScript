var 스크린 = document.querySelector('#screen');

var state = {

};
var startTime;
var finalTime;
//스코프 를 이용하여 호출스택에서 나가서 시작시간이 계속 저장이 되게끔 만들어둠
var recoDe=[];
var timeOut;
// console.time('시간');
// console.timeEnd('시간');
// 보통 디버깅시 에 많이 사용함

// var 시작시간 = performance.now();
// var 끝시간 = performance.now();
//    console.log((끝시간 - 시작시간)/1000);
//정밀한 시간을 측정하고 싶을경우 사용함

//new Date(); 를 하는 순간 그 시각이 저장이 됨

스크린.addEventListener('click',function(){
    if(스크린.classList.contains('waiting')){ //대기
        //classList.contains로 현재 클래스를 파악할 수 있음
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요!';
        var timeOut = setTimeout(function() {
            startTime  = new Date();
            스크린.click();
        }, Math.floor(Math.random() * 1000)+ 2000);
    }else if(스크린.classList.contains('ready')){ //준비
        if(!startTime){                          //부정
            clearTimeout(timeOut);
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '에이 아직입니다~~^^';
        }else {
        스크린.classList.remove('ready');
        스크린.classList.add('now');
        스크린.textContent = '클릭하세요!';
        }
    }else if(스크린.classList.contains('now')){ //시작
        finishTime = new Date();
        console.log('반응속도',finishTime - startTime,'ms')
        startTime = null;
        finishTime = null;
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요!';
    }
    
    
});