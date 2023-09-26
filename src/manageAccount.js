const { accountModal } = require("./modals");

/** HTML Element Declarations */
const openAccountBtn = document.getElementById("user-account-button");
const usernameInput = document.getElementById("login-username-input");
const passwordInput = document.getElementById("login-password-input");
const loginBtn = document.getElementById("login-btn");

/** Mapping buttons to their onClick functions */
openAccountBtn.addEventListener("click", openAccountPopup);
loginBtn.addEventListener("click", userLogin);

function openAccountPopup() {
  accountModal.modal("show");
}

function userLogin() {
  //
}

module.exports = {
  openAccountPopup,
};
