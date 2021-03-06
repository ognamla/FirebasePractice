// Initialize Firebase
var config = {
    apiKey: "AIzaSyBo6tK6ZV7CsX2eNmdGRddCv5eoXbd8amU",
    authDomain: "test-999c0.firebaseapp.com",
    databaseURL: "https://test-999c0.firebaseio.com",
    projectId: "test-999c0",
    storageBucket: "test-999c0.appspot.com",
    messagingSenderId: "805147817095"
};
firebase.initializeApp(config);
var firebaseData = firebase.database();

var hasSignUp,
    userLogin,
    user;
// var loginPage = "../Users/moto/Desktop/FirebasePractice/login.html"

var account = document.getElementById('account'),
    pwd1 = document.getElementById('pwd1'),
    pwd2 = document.getElementById('pwd2'),
    name = document.getElementById('userName'),

    errorAccount = document.getElementById('errorAccount'),
    errorPwd1 = document.getElementById('errorPwd1'),
    errorPwd2 = document.getElementById('errorPwd2'),

    signUpBtn = document.getElementById('signUpBtn'),
    loginBtn = document.getElementById('loginBtn');

signUpBtn.addEventListener("click", function () {
    // check e-mail valible
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (account.value.search(emailRegEx) === -1) {
        errorAccount.innerHTML = "please enter correct e-mail";
        errorAccount.style.display = "block";
        return false;
    } else {
        errorAccount.style.display = "none";
    }
    // check pwd
    if (pwd1.value.length <= 5) {
        errorPwd1.innerHTML = "Please enter at least 6 characters";
        errorPwd1.style.display = "block";
        return false;
    } else {
        errorPwd1.style.display = "none";
    }

    if (pwd2.value !== pwd1.value) {

        errorPwd2.innerHTML = "please check your password again";
        errorPwd2.style.display = "block";
        return false;
    } else {
        errorPwd2.style.display = "none";
        firebase.auth().createUserWithEmailAndPassword(account.value, pwd1.value).then(function (success) {
            userLogin = success;
            userLogin.sendEmailVerification().then(function () {
                console.log("驗證信寄出");
                user = firebase.auth().currentUser;
                // set database
                firebase.database().ref('users/' + user.uid).set({
                    email: user.email,
                })
            }, function (error) {
                console.error("驗證信錯誤");
            });
        }, function (error) {
            console.log("sign up reject", error);
        })
    }
    if (hasSignUp) {
        
       
    }
}, false);

loginBtn.addEventListener("click", function () {
    firebase.auth().signInWithEmailAndPassword(account.value, pwd1.value || pwd2.value).then(function (success) {
        user = firebase.auth().currentUser;
        userLogin = success;
        // read database once
        firebase.database().ref('users/' + user.uid).once('value').then(function (success) {
            console.log('user database', success.val());
        })
        // read database all users
        firebase.database().ref('users').on('value', function(success) {
            console.log(' all users', success.val());
        })
    }, function (error) {
        console.log("login error", error);
    })
})
