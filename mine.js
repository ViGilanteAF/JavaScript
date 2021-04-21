var tbody = document.querySelector('#table tbody');
var dataset = [];
var stopFlag = false;
//플래그는 코드의 흐름을 좌우하는 변수를 가리킴
var openKAN = 0;
var 코드표 = {
    openKAN: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸:0,
};

document.querySelector('#exec').addEventListener('click', function () {
    //tbody 의 내부 태그들을 모두 삭제한다는 뜻!
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    dataset = [];
    openKAN = 0;
    stopFlag = false;
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치 선정
    var 후보 = Array(hor * ver)
        .fill()
        .map(function (요소, 인덱스) {
            return 인덱스;
        });
    //자바스크립트 에서 갑자기 X부터 XX까지 들어가는 배열을 만들고 싶을때 
    //쉽게 사용이 가능한 Var 후보 를 사용하셈(외우서 쓰면 완전 편함)(Array , fill, map)

    var suff = [];

    while (후보.length > hor * ver - mine) {
        var Moveing = 후보.splice(Math.floor(Math.random() * 후보.length), 1)[0];
        suff.push(Moveing);
    }

    console.log(suff);


    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(코드표.보통칸);
            //깃발 
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (stopFlag) {
                    return;
                }
                var ParentTr = e.currentTarget.parentNode;
                var ParentTbody = e.currentTarget.parentNode.parentNode;
                e.currentTarget, e.target;
                //eventListener 를 직접 다는 대상이 currentTarget 이고 event 가 실제로 발생하는 곳이 target 임

                //indexOf 를 사용하고 싶지만 배열이 아닌 애들에게 강제적으로 사용이 가능하도록 하는것 Array.prototype.indexOf.call()
                var KAN = Array.prototype.indexOf.call(ParentTr.children, e.currentTarget);
                var ZUL = Array.prototype.indexOf.call(ParentTbody.children, ParentTr);
                console.log(ParentTr, ParentTbody, e.currentTarget, KAN, ZUL);
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.remove('question');
                    e.currentTarget.classList.add('flag');
                    if (dataset[ZUL][KAN] === 코드표.지뢰) {
                        dataset[ZUL][KAN] = 코드표.깃발지뢰;
                    } else {
                        dataset[ZUL][KAN] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if (dataset[ZUL][KAN] === 코드표.깃발지뢰) {
                        dataset[ZUL][KAN] = 코드표.물음표지뢰;
                    } else {
                        dataset[ZUL][KAN] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[ZUL][KAN] === 코드표.물음표지뢰 ) {
                        e.currentTarget.textContent = 'X';
                        dataset[ZUL][KAN] = 코드표.지뢰;
                    } else  {
                        e.currentTarget.textContent = ' ';
                        dataset[ZUL][KAN] = 코드표.보통칸;
                    }
                }
            });
            td.addEventListener("click", function (e) {
                //클릭시 주변 지뢰 갯수
                if (stopFlag) {
                    return;
                }
                //return으로 함수의 실행을 중간에 끊을 수 있음
                var ParentTr = e.currentTarget.parentNode;
                var ParentTbody = e.currentTarget.parentNode.parentNode;
                var KAN = Array.prototype.indexOf.call(ParentTr.children, e.currentTarget);
                var ZUL = Array.prototype.indexOf.call(ParentTbody.children, ParentTr);
                if ([코드표.openKAN,코드표.깃발,코드표.깃발지뢰,코드표.물음표지뢰,코드표.물음표].includes(dataset[ZUL][KAN])) {
                    return;
                }
                e.currentTarget.classList.add('opened');
                //classList = html 에 td태그에 접근을 할 수 있도록 해주는 함수 태그.classList로 태그의 클래스에 접근, add나 remove로 추가 및 삭제
                //jquery 에서는 $(this).addClass('opend');
                openKAN += 1;
                if (dataset[ZUL][KAN] === 코드표.지뢰) {
                    e.currentTarget.textContent = '펑!';
                    document.querySelector('#result').textContent = '실패ㅠ.ㅠ';
                    stopFlag = true;
                } else {
                    dataset[ZUL][KAN] = 1;
                    var area = [
                        dataset[ZUL][KAN - 1], dataset[ZUL][KAN + 1],
                    ];
                    if (dataset[ZUL - 1]) {
                        //concat 은 배열과 배열을 합쳐서 " 새로운" 배열을 만듬
                        area = area.concat([dataset[ZUL - 1][KAN - 1], dataset[ZUL - 1][KAN], dataset[ZUL - 1][KAN + 1]]);
                    }
                    if (dataset[ZUL + 1]) {
                        area = area.concat([dataset[ZUL + 1][KAN - 1], dataset[ZUL + 1][KAN], dataset[ZUL + 1][KAN + 1]]);
                    }
                    var areamine = area.filter(function (v) {
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v) ;
                    }).length;
                    //배열 요소가 X 인것을 필터링 함 (필터링 할 배열을 V 위치에 넣어줌)
                    e.currentTarget.textContent = areamine || '';
                    //조건문같은 것에서 거짓인 값 '',0,NaN,null,nudefined,false
                    dataset[ZUL][KAN] = 코드표.openKAN;
                    if (areamine === 0) {
                        //주변 8 칸 동시 오픈(재귀함수)
                        console.log('주변을 엽니다');
                        var 주변칸 = [];
                        if (tbody.children[ZUL - 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[ZUL - 1].children[KAN - 1],
                                tbody.children[ZUL - 1].children[KAN],
                                tbody.children[ZUL - 1].children[KAN + 1],
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[ZUL].children[KAN - 1],
                            tbody.children[ZUL].children[KAN + 1]

                        ]);

                        if (tbody.children[ZUL + 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[ZUL + 1].children[KAN - 1],
                                tbody.children[ZUL + 1].children[KAN],
                                tbody.children[ZUL + 1].children[KAN + 1],
                            ]);
                        }
                        dataset[ZUL][KAN] = 1;
                        주변칸.filter(function (v) {
                            return !!v;
                        }).forEach(function (옆칸) {
                            var ParentTr = 옆칸.parentNode;
                            var ParentTbody = 옆칸.parentNode.parentNode;
                            var YEPKANKAN = Array.prototype.indexOf.call(ParentTr.children, 옆칸);
                            var YEPKANZUL = Array.prototype.indexOf.call(ParentTbody.children, ParentTr);
                            if (dataset[YEPKANZUL][YEPKANKAN] !== 코드표.openKAN) {
                                옆칸.click();
                            }
                        });
                        //filter 배열에서 undefinder 이나 null, 0 , 빈 문자열을 제거하는 코드
                    }
                }
                if (openKAN === hor * ver - mine) {
                    stopFlag = true;
                    document.querySelector('#result').textContent = '승리!!';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //지뢰 생성
    for (var k = 0; k < suff.length; k++) {  //59
        var width = Math.floor(suff[k] / ver);   //6
        var height = suff[k] % ver;  //9
        tbody.children[width].children[height].textContent = 'X'; //보여지는 화면
        dataset[width][height] = 코드표.지뢰;   // 만든 2차원 배열
    }
    console.log(dataset);
});


//재귀  함수
// function recursive (숫자){
//     console.log(숫자);
//     if (숫자 < 5){
//     recursive (숫자 + 1);
//     }
// }
// recursive(1);
//함수가 자기 자신을 실행을 하면서 하나 더부름!!!
//재귀함수는 사람의 코드 이해가 쉽다



// tbody.addEventListener('contextmenu', function(e){
//     console.log('커런트 타겟',e.currentTarget);
//     console.log('타겟',e.target);
// })

// for (var i = 0 ; i < 100 ; i++ ){
//         setTimeout(function() {
//             console.log(i);
//         }, i * 1000);
//  }




// for (var i = 0 ; i < 100 ; i++ ){
//    (function closer (j) { //j 가 function 스코프를 벗어 나지 못하는 특성을 이용하여 보관을 해주는것!
//        setTimeout(function() {
//            console.log(j);
//        }, j * 1000);
//    })(i);
// }




//웹 프로그래밍시 데이터와 화면을 일치시켜야 함!!!
//그래서 React ,Vue 같은 프레임워크를 주로 사용하는것임!

//변수를 선언한 것은 함수 밖으로 나갈 수 없다
// 변수선언에 대한 판단 기-준은 스코프 체인에 따라 위로 올라감(전역범위로)
// 비동기 함수 안에 있는 함수는 실행이 되는 순간에 정해진다!

//자바스크립트에서 무조건 알아야 하는것
//1.스코프
//2.실행컨테스트
//3.프로토타입
//4.비동기
//5.클로저




