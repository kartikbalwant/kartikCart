const email = document.querySelector(".emailcl");
const password = document.querySelector(".passcl");
const loginButton = document.querySelector(".log button");

loginButton.addEventListener("click", function () {

    if (email.value === "" || password.value === "") {
        alert("Please enter email and password");
    } 
    else {
        window.location.href = "home.html";
    }

});