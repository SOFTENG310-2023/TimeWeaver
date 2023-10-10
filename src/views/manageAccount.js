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
  // TO-DO: implement user login functionality
  alert("Implement user login functionality");
}

function userSignup() {
  // TO-DO: implement user sign up functionality
  alert("Implement user sign up functionality");
}

module.exports = {
  openAccountPopup,
  openSignupPopup,
  userLogin,
  userSignup,
};
