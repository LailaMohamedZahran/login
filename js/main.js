let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function Register() {
  let name = document.getElementById("name");
  let password = document.getElementById("password");
  let email = document.getElementById("email");
  let message = document.getElementById("register-message");

  if (
    name.value.trim() === "" ||
    password.value.trim() === "" ||
    email.value.trim() === ""
  ) {
    message.textContent = "All inputs is required";
    message.classList.add("error");
    message.classList.remove("success");
    return;
  }

  let user = {
    name: name.value,
    password: password.value,
    email: email.value,
  };

  let isEmailExists = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email) {
      isEmailExists = true;
      break;
    }
  }

  if (!isEmailExists) {
    users.push(user);
    message.textContent = "success";
    message.classList.add("success");
    message.classList.remove("error");
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    message.textContent = "Email already exists";
    message.classList.add("error");
    message.classList.remove("success");
  }
}

function clearRegisterForm() {
  document.getElementById("name").value = "";
  document.getElementById("password").value = "";
  document.getElementById("email").value = "";
  document.getElementById("register-message").textContent = "";
  document
    .getElementById("register-message")
    .classList.remove("error", "success");
}

function Login() {
  let loginEmail = document.getElementById("login-email");
  let loginPassword = document.getElementById("login-password");
  let loginMessage = document.getElementById("login-message");

  if (loginEmail.value.trim() === "" || loginPassword.value.trim() === "") {
    loginMessage.textContent = "All inputs is required";
    loginMessage.classList.add("error");
    loginMessage.classList.remove("success");
    return;
  }

  let isUserFound = false;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === loginEmail.value &&
      users[i].password === loginPassword.value
    ) {
      isUserFound = true;
      currentUser = users[i];
      break;
    }
  }

  if (isUserFound) {
    document.getElementById("registration-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
    document.getElementById("welcome-name").textContent = currentUser.name;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else {
    loginMessage.textContent = "Incorrect email or password";
    loginMessage.classList.add("error");
    loginMessage.classList.remove("success");
  }
}

window.addEventListener("load", function () {
  // Show login form by default
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("registration-form").classList.add("hidden");

  if (currentUser) {
    document.getElementById("registration-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
    document.getElementById("welcome-name").textContent = currentUser.name;
  }
});

function Logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("home-page").classList.add("hidden");
  document.getElementById("registration-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
  clearLoginForm();
  clearRegisterForm();
}

function clearLoginForm() {
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
  document.getElementById("login-message").textContent = "";
  document.getElementById("login-message").classList.remove("error", "success");
}

function ShowRegisterForm() {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("registration-form").classList.remove("hidden");
}

function ShowLoginForm() {
  document.getElementById("registration-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
  clearLoginForm();
  clearRegisterForm();
}

// Get the password input fields and the eye icons
const passwordInput = document.getElementById("password");
const passIcon = document.getElementById("pass-icon");
const passwordInput2 = document.getElementById("login-password");
const toggleBtn = document.querySelector(".show-password-toggle i");

// Add event listener to the first eye icon
passIcon.addEventListener("click", function () {
  // Toggle the first password field type between 'password' and 'text'
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passIcon.classList.remove("fa-eye-slash");
    passIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    passIcon.classList.remove("fa-eye");
    passIcon.classList.add("fa-eye-slash");
  }
});

// Add an event listener to the second toggle button
toggleBtn.addEventListener("click", () => {
  // Toggle the second password field type between 'password' and 'text'
  if (passwordInput2.type === "password") {
    passwordInput2.type = "text";
    toggleBtn.classList.remove("fa-eye-slash");
    toggleBtn.classList.add("fa-eye");
  } else {
    passwordInput2.type = "password";
    toggleBtn.classList.remove("fa-eye");
    toggleBtn.classList.add("fa-eye-slash");
  }
});
