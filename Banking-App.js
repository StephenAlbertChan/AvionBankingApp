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
        if(userAlreadyCreated(users,i,userCreate)) {
            users[i] = new loginInfo(userCreate.value, passwordCreate.value, 0);
            addUser(users,i,userList);
            i++;
        }
    }
    clearInput();
}

loginButton.onclick = function() {

    if(userEmpty(username) && passwordEmpty(password) && userExists(i,username,password,users)){
        userDisplay.textContent = username.value;
        moneyDisplay.textContent = getMoney(i,username,users);
        let status = document.getElementById('loginSignupContainer');
        console.log(status.className);
        status.className += ' hidden';
        status = document.getElementById('displayInfoContainer');
        console.log(status.className);
        status.className = 'display-info-container';
    }
    clearInput();
}

logoutButton.onclick = function() {

    userDisplay.textContent = '';
    moneyDisplay.textContent = '';

    let status = document.getElementById('displayInfoContainer');
    console.log(status.className);
    status.className += ' hidden';
    status = document.getElementById('loginSignupContainer');
    console.log(status.className);
    status.className = 'login-signup-container';
}

registerButton.onclick = function() {

    let status = document.getElementById('loginPage');
    console.log(status.className);
    status.className += ' hide';
    status = document.getElementById('signupPage');
    console.log(status.className);
    status.className = 'signup-info';
    
}

loginPageButton.onclick = function() {

    let status = document.getElementById('signupPage');
    console.log(status.className);
    status.className += ' hide';
    status = document.getElementById('loginPage');
    console.log(status.className);
    status.className = 'login-info';

}

depositButton.onclick = function() {
    
    c=getUser(i,c,users);
    users[c].money += parseFloat(depositAmount.value);
    moneyDisplay.textContent = users[c].money;
    updateMoney(c,users);
    clearInput();
}

withdrawButton.onclick = function() {
    
    c=getUser(i,c,users);
    users[c].money -= parseFloat(withdrawAmount.value);
    moneyDisplay.textContent = users[c].money;
    updateMoney(c,users);
    clearInput();
}

sendButton.onclick = function() {
    let sendTo = 0;   

    c=getUser(i,c,users);
    for(sendTo=0;sendTo<i;sendTo++){
        if(sendName.value === users[sendTo].username){
            users[c].money -= parseFloat(sendAmount.value);
            updateMoney(c,users);
            users[sendTo].money += parseFloat(sendAmount.value);
            updateMoney(sendTo,users);
        }
    }
    moneyDisplay.textContent = users[c].money;
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
                return 1;
            }
        }
    }
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
    
    let newList = document.createElement("div");
    let newUser = document.createElement("span");
    let newMoney = document.createElement("span");
    let newPassword = document.createElement("span");

    newList.className = "user-list";
    newUser.className = "new-user";
    newMoney.className = "new-money";
    newPassword.className = "new-password";

    newMoney.id = "newMoney"+[i];

    userList.appendChild(newList);
    newList.appendChild(newUser);
    newList.appendChild(newPassword);
    newList.appendChild(newMoney);
    
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

// == User functions ends here =====================================================================

// == Error Checking starts here ===================================================================
    //User already Exists
function userAlreadyCreated(users,i,userCreate) {

    for(c=0;c<i;c++){
        if(users[c].username === userCreate.value){
            
            return 0;
        }
    }
    return 1;
}
    //input fields empty for user
function userEmpty(user){
    console.log(user.id);
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