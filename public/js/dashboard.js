document.addEventListener('DOMContentLoaded', function () {

    console.log('Dashboard page loaded!');
});

function promptLogin() {
    var username = prompt("Please enter your username:");
    if (username) {
        alert("Welcome, " + username + "!");
    } else {
        alert("Login canceled.");
    }
}