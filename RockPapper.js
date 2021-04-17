
var left = '0';
var dicitionary = { //dicitionary 자료구조
    바위:'0',
    가위:'-142px',
    보:'-284px'
};

function Computer_Choice(left){
    return Object.entries(dicitionary).find(function(v) {
        return v[1] === left;
        
    })[0];
}
//console.log(Computer_Choice());
//Object.entries(객체)로 객체를 배열로 바꿀 수 있음
//1차원 배열은 index of 를 주로 사용하고 2차원 배열은 find find index 를 주로 사용함

var Interval;
function IntervalMaker() {
    Interval = setInterval(function() {
    if(left === dicitionary.바위){
        left = dicitionary.가위;
    } else if(left === dicitionary.가위){
        left = dicitionary.보;
    } else {
        left = dicitionary.바위;
    }
    document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) '+ left + ' 0';
    },100);
}

IntervalMaker();

var Recode = {
    바위: 0,
    가위: 1,
    보: -1,
};

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click',function() {
        clearInterval(Interval); //Interval 중지
        setTimeout(function() {
            IntervalMaker();
        },1000);
     
        var mychoice = this.textContent;
       //textContent 에 '/n' 이 인식이 되니 HTML 파일에서 절떄 연결된값 앞뒤로 띄여쓰기 하지 말자!!!!

        var myrecode = Recode[mychoice];
        //console.log(mychoice)

        var ComputerRecode = Recode[Computer_Choice(left)];
        //console.log(ComputerRecode)

        var 점수차 = myrecode - ComputerRecode;
        //console.log(점수차)

        if (점수차 === 0) {
            console.log('비겼습니다.');
        } else if ([-1, 2].includes(점수차)){ // || 관계일떄 []배열로 잡고 .includes 로 줄일수 있음
            console.log('이겼습니다.');
        } else {
            console.log('젔습니다.');
        }
    });
 });

//https://www.youtube.com/watch?v=wux3TtPBedk&list=PLcqDmjxt30Rtbxbh4eJREOVekql_kWVmu&index=48&ab_channel=ZeroChoTV
//https://github.com/ZeroCho/webgame-lecture/blob/master/%EA%B0%80%EC%9C%84%EB%B0%94%EC%9C%84%EB%B3%B4.js

var 시작값 = 3;
var 인터벌2 = setInterval(function() {
  if (시작값 === 0) {
    console.log('종료!!!');
    return clearInterval(인터벌2);
  }
  console.log(시작값);
  시작값 -= 1;
}, 1000);