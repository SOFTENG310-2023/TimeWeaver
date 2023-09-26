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
  accountModal.modal("show");
}

function openSignupPopup() {
  signupModal.modal("show");
}

function userLogin() {
  alert("Implement user login functionality");
}

function userSignup() {
  alert("Implement user sign up functionality");
}

module.exports = {
  openAccountPopup,
};
