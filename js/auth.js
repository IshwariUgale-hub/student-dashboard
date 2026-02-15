
/* ======================
   ELEMENT REFERENCES
====================== */
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const container = document.getElementById('container');

const signupForm = document.querySelector('.signup-container form');
const loginForm = document.querySelector('.login-container form');

/* ======================
   PANEL SWITCH ANIMATION
====================== */
signupBtn.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    clearFields();
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    clearFields();
});

/* ======================
   SIGNUP FUNCTION
====================== */
signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value.trim();

    if(name === "" || email === "" || password === ""){
        alert("All fields are required!");
        return;
    }

    if(password.length < 6){
        alert("Password must be at least 6 characters!");
        return;
    }

    // Store user in localStorage
    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("studentUser", JSON.stringify(user));

    alert("Account created successfully! Please login.");

    clearFields();
    container.classList.remove("right-panel-active");
});

/* ======================
   LOGIN FUNCTION
====================== */
loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if(email === "" || password === ""){
        alert("Please enter Email and Password!");
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem("studentUser"));

    if(!storedUser){
        alert("No account found. Please sign up first.");
        return;
    }

    if(email === storedUser.email && password === storedUser.password){
        alert("Login Successful!");
        clearFields();
        window.location.href = "home.html";
    } else {
        alert("Invalid Email or Password!");
    }
});

/* ======================
   CLEAR INPUT FIELDS
====================== */
function clearFields(){
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
}
