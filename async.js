//asymc & await
//clear style of using promise


//1.async
async function fetChUser() {
    // do network request in 10 secs....
        return 'Brian';
    }

const user = fetChUser();
user.then(console.log);
console.log(user);


//2.await
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));

}

async function getApple(){
    await delay(3000);
    return '사과';
}

async function getBanana() {
    await delay(3000);
    return '바나나'
}

async function pickFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await getApple();
    const banana = await getBanana();
    return `${apple} + ${banana}`;
}
    pickFruits().then(console.log);

    //3. useful Promise APIs
    function pickAllFruits() {
        return Promise.all([getApple(), getBanana()]).then (fruits = fruits => fruits.join('+'));
    }
    pickAllFruits().then(console.log);

    function pickOnlyOne(){
        return Promise.race([getApple(),getBanana()]);
    }
    pickOnlyOne().then(console.log);