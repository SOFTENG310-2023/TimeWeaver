const { loginModal, signupModal, accountModal } = require("./modals");
const config = require("../utils/config");
const { createClient } = require("@supabase/supabase-js");

/** HTML Element Declarations */
const openLoginBtn = document.getElementById("user-account-button");
const openAccountBtn = document.getElementById("view-account-button");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const miniLoginBtn = document.getElementById("mini-login-btn");
const signupBtn = document.getElementById("signup-btn");
const miniSignupBtn = document.getElementById("mini-signup-btn");

/** Mapping buttons to their onClick functions */
openLoginBtn.addEventListener("click", openLoginPopup);
openAccountBtn.addEventListener("click", openAccountPopup);
miniSignupBtn.addEventListener("click", openSignupPopup);
miniLoginBtn.addEventListener("click", openLoginPopup);
loginBtn.addEventListener("click", userLogin);
signupBtn.addEventListener("click", userSignup);
logoutBtn.addEventListener("click", userLogout);

function openLoginPopup() {
  // Open popup
  loginModal.modal("show");

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

function openAccountPopup() {
  accountModal.modal("show");
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
  })
    .then((res) => {
      if (res.status == 200) {
        loginModal.modal("hide");
        alert("Login Successful.");
      } else {
        alert("Oops, something went wrong. Please try again.");
      }

      return res.json();
    })
    .then((data) => {
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("refresh_token", data.session.refresh_token);
      localStorage.setItem("user_id", data.user.id);

      handleLogin();
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
  })
    .then((res) => {
      if (res.status == 200) {
        signupModal.modal("hide");
        alert("Account successfully created.");
      } else {
        alert("Oops, something went wrong. Please try again.");
      }

      return res.json();
    })
    .then((data) => {
      // Make a POST request to enter user information into the databasea
      console.log(data);
      const sendData = {
        id: data.user.id,
        name: document.getElementById("signup-name-input").value,
      };

      fetch("/api/user/after-creation", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(sendData),
      }).then(() => {
        localStorage.setItem("access_token", data.session.access_token);
        localStorage.setItem("refresh_token", data.session.refresh_token);
        localStorage.setItem("user_id", data.user.id);

        handleLogin();
      });
    });
}

function userLogout() {
  // Remove user info from the local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");

  handleLogin();
  accountModal.modal("hide");
}

function handleLogin() {
  const access_token = localStorage.getItem("access_token");

  if (access_token === null) {
    // user is not logged in
    document.getElementById("view-account-button").style.display = "none";
    document.getElementById("user-account-button").style.display = "flex";
  } else {
    document.getElementById("view-account-button").style.display = "flex";
    document.getElementById("user-account-button").style.display = "none";

    const token = localStorage.getItem("access_token");

    fetch(`/api/user/${token}`, {
      method: "GET",
    })
      .then((res) => {
        // If session expired
        if (res.status == 500) {
          // user is not logged in
          document.getElementById("view-account-button").style.display = "none";
          document.getElementById("user-account-button").style.display = "flex";

          // Remove user info from the local storage
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");
        }
        return res.json();
      })
      .then((data) => {
        // Update info on the my account modal
        document.getElementById(
          "name-info"
        ).textContent = ` ${data.user.user_metadata.name}`;
        document.getElementById(
          "email-info"
        ).textContent = ` ${data.user.email}`;
      });
  }
}

module.exports = {
  handleLogin,
};
