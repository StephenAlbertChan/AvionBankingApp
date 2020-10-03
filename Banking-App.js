const username = document.getElementById('username');
const password = document.getElementById('password');
const userCreate = document.getElementById('userCreate');
const passwordCreate = document.getElementById('passwordCreate');
const passwordConfirm = document.getElementById('passwordConfirm');

const userDisplay = document.getElementById('userDisplay');
const moneyDisplay = document.getElementById('moneyDisplay');
const userList = document.getElementById('userList');

const depositAmount = document.getElementById('depositAmount');
const withdrawAmount = document.getElementById('withdrawAmount');
const sendAmount = document.getElementById('sendAmount');
const sendName = document.getElementById('sendName');

const userInfo = document.getElementsByClassName('user-list');

const loginInfo = function(username,password,money){
    this.username = username;
    this.password = password;
    this.money = money;
};

const users = [];
i=0; //total users
c=0; //current user

// == Button functions start here =====================================================================

signupButton.onclick = function() {
    if(userEmpty(userCreate) && passwordEmpty(passwordCreate) && passwordMatch(passwordCreate,passwordConfirm)){
        if (!userAlreadyCreated(users,i,userCreate)) {
            users[i] = new loginInfo(userCreate.value, passwordCreate.value, 0);
            addUser(users,i,userList);
            i++;
        }
    }
    clearInput();
}

loginButton.onclick = function() {

    if(userEmpty(username)  && userExists(i,username,password,users) && passwordEmpty(password)){
        userDisplay.textContent = username.value;
        moneyDisplay.textContent = getMoney(i,username,users);
        let status = document.getElementById('loginSignupContainer');
        status.className += ' hidden';
        status = document.getElementById('displayInfoContainer');
        status.className = 'display-info-container';
    }
    clearInput();
}

logoutButton.onclick = function() {

    userDisplay.textContent = '';
    moneyDisplay.textContent = '';

    let status = document.getElementById('displayInfoContainer');
    status.className += ' hidden';
    status = document.getElementById('loginSignupContainer');
    status.className = 'login-signup-container';
}

registerButton.onclick = function() {

    let status = document.getElementById('loginPage');
    status.className += ' hide';
    status = document.getElementById('signupPage');
    status.className = 'signup-info';
    imageRandomizer();
    
}

loginPageButton.onclick = function() {

    let status = document.getElementById('signupPage');
    status.className += ' hide';
    status = document.getElementById('loginPage');
    status.className = 'login-info';

}

depositButton.onclick = function() {
    
    if (depositAmount.value !== 'e' && depositAmount.value !== 'E'){
        c=getUser(i,c,users);
        users[c].money += parseFloat(depositAmount.value);
        moneyDisplay.textContent = users[c].money;
        updateMoney(c,users);
        document.getElementById('error'+depositAmount.id).innerHTML = "";
    } else {
        document.getElementById('error'+depositAmount.id).innerHTML = "Invalid input!";
    }
    clearInput();
}

withdrawButton.onclick = function() {
    
    if (withdrawAmount.value !=='e' && withdrawAmount.value !=='E'){
        c=getUser(i,c,users);
        if(enoughMoney(users,c,withdrawAmount)){
            users[c].money -= parseFloat(withdrawAmount.value);
            moneyDisplay.textContent = users[c].money;
            updateMoney(c,users);
            document.getElementById('error'+depositAmount.id).innerHTML = "";
        }
    } else {
        document.getElementById('error'+depositAmount.id).innerHTML = "Invalid input!";
    }
    clearInput();
}

sendButton.onclick = function() {
    let sendTo = 0;   

    if (sendAmount.value !== 'e' && sendAmount.value !== 'E'){
        c=getUser(i,c,users);
        if(enoughMoney(users,c,sendAmount)){
            for(sendTo=0;sendTo<i;sendTo++){
                if(sendName.value === users[sendTo].username){
                    users[c].money -= parseFloat(sendAmount.value);
                    updateMoney(c,users);
                    users[sendTo].money += parseFloat(sendAmount.value);
                    updateMoney(sendTo,users);
                    document.getElementById('error'+sendAmount.id).innerHTML = "";
                }  
            }
            document.getElementById('error'+sendAmount.id).innerHTML = "User does not exists.";
            moneyDisplay.textContent = users[c].money;
        }
    } else {
        document.getElementById('error'+sendAmount.id).innerHTML = "Invalid input!";
    }
    clearInput();
}

// == Button functions end here =====================================================================

// == User Functions start here =====================================================================
    //fetching currently logged in user
function getUser(i,c,users) {
    let currentUser = userDisplay.textContent;

    for(c=0;c<i;c++){
        if(currentUser === users[c].username){
            return c;
        }
    }
}
    //checking if user exists for login
function userExists(i,username,password,users) { 

    for(c=0;c<i;c++){
        if(username.value === users[c].username){
            if(password.value === users[c].password) {
                document.getElementById('error'+password.id).innerHTML = "";
                return 1;
            } else {
                document.getElementById('error'+password.id).innerHTML = "Password is incorrect.";
                document.getElementById('error'+username.id).innerHTML = "";
                return 0;
            }
        }
    }
    document.getElementById('error'+username.id).innerHTML = "User does not exist.";
    document.getElementById('error'+password.id).innerHTML = "";
    return 0;
}
    //getting money value of confirmed user logging in
function getMoney(i,username,users) {

    for(c=0;c<i;c++){
        if(username.value === users[c].username){
            return users[c].money;
        }
    }
}
    //displaying created users
function addUser(users,i,userList) {
    
    let newImage = document.createElement("img");    
    let newList = document.createElement("div");
    let newUser = document.createElement("span");
    let newMoney = document.createElement("span");
    let newPassword = document.createElement("span");


    newList.className = "user-list";
    newImage.className = "image";
    newUser.className = "new-user";
    newMoney.className = "new-money";
    newPassword.className = "new-password";

    newMoney.id = "newMoney"+[i];

    userList.appendChild(newList);
    newList.appendChild(newImage);
    newList.appendChild(newUser);
    newList.appendChild(newPassword);
    newList.appendChild(newMoney);
    
    let randomImage = 'image'+imageRandomizer()+'.png';
    newImage.src= randomImage;
    newUser.innerHTML = "Username: " + users[i].username;
    newPassword.innerHTML = "Password: " + users[i].password;
    newMoney.innerHTML = "Money: " + users[i].money;
}
    //updating money for displayed users
function updateMoney(c,users) {
    let id = 'newMoney'+[c];
    let updateUserMoney = document.getElementById(id);
    updateUserMoney.textContent = 'Money: ' + users[c].money;
}

function clearInput() {
    //for user creation
    userCreate.value = '';
    passwordCreate.value = '';
    passwordConfirm.value = '';

    //for login
    username.value = '';
    password.value = '';

    //for deposit
    depositAmount.value = '';

    //for withdraw
    withdrawAmount.value = '';

    //for sending money
    sendAmount.value = '';
    sendName.value = '';
}

function imageRandomizer() {
    let rng = Math.floor(Math.random() * (5 - 1) + 1);
    return rng;
}

// == User functions ends here =====================================================================

// == Error Checking starts here ===================================================================
    //User already Exists
function userAlreadyCreated(users,i,userCreate) {

    for(c=0;c<i;c++){
        if(users[c].username === userCreate.value){
            document.getElementById('error'+userCreate.id+'Exists').innerHTML = "User already exists.";
            return 1;
        }
    }
    document.getElementById('error'+userCreate.id+'Exists').innerHTML = "";
    return 0;
}
    //input fields empty for user
function userEmpty(user){
    
    if (user.value === ''){
        document.getElementById('error'+user.id).innerHTML = "Please input a valid username.";
        return 0;
    }
    document.getElementById('error'+user.id).innerHTML = "";
    return 1;
}
    //input fields empty for passwords
function passwordEmpty(password){
    if (password.value === ''){
        document.getElementById('error'+password.id).innerHTML = "Please input a valid password.";
        return 0;
    }
    document.getElementById('error'+password.id).innerHTML = "";
    return 1;
}
    //input field passwords not matching
function passwordMatch(passwordCreate,passwordConfirm){

    if (passwordCreate.value !== passwordConfirm.value){
        document.getElementById('errorpasswordConfirm').innerHTML = "Passwords do not match.";
        return 0;
    }
    document.getElementById('errorpasswordConfirm').innerHTML = "";
    return 1;
}

function enoughMoney(users,c,money){

    if (users[c].money < money.value){
        document.getElementById('error'+money.id).innerHTML = "Not enough money in bank!";
        return 0;
    } else {
        document.getElementById('error'+money.id).innerHTML = "";
        return 1;
    }
}