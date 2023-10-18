const { accountModal, signupModal } = require("./modals");

/** HTML Element Declarations */
const openAccountBtn = document.getElementById("user-account-button");
const usernameInput = document.getElementById("login-username-input");
const passwordInput = document.getElementById("login-password-input");
const loginBtn = document.getElementById("login-btn");
const miniLoginBtn = document.getElementById("mini-login-btn");
const signupBtn = document.getElementById("signup-btn");
const miniSignupBtn = document.getElementById("mini-signup-btn");

/** Mapping buttons to their onClick functions */
openAccountBtn.addEventListener("click", openAccountPopup);
miniSignupBtn.addEventListener("click", openSignupPopup);
miniLoginBtn.addEventListener("click", openAccountPopup);
loginBtn.addEventListener("click", userLogin);
signupBtn.addEventListener("click", userSignup);

function openAccountPopup() {
  // Open popup
  accountModal.modal("show");

  // Clear input fields
  document.getElementById("login-email-input").value = "";
  document.getElementById("login-password-input").value = "";
}

function openSignupPopup() {
  // Open popup
  signupModal.modal("show");

  // Clear input fields
  document.getElementById("signup-email-input").value = "";
  document.getElementById("signup-name-input").value = "";
  document.getElementById("signup-password-input").value = "";
}

function userLogin() {
  const userData = {
    email: document.getElementById("login-email-input").value,
    password: document.getElementById("login-password-input").value,
  };

  const authRes = fetch("api/user/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.status == 200) {
      accountModal.modal("hide");
      alert("Login Successful.");
    }
  });
}

function userSignup() {
  const userData = {
    email: document.getElementById("signup-email-input").value,
    password: document.getElementById("signup-password-input").value,
    name: document.getElementById("signup-name-input").value,
  };

  const authRes = fetch("/api/user/create-account", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.status == 200) {
      signupModal.modal("hide");
      alert("Account successfully created.");
    }
  });
}

module.exports = {
  openAccountPopup,
  openSignupPopup,
  userLogin,
  userSignup,
};
