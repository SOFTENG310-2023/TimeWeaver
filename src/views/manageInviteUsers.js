const { inviteUsersModal } = require("./modals");

/** Mapping buttons to their onClick functions */
document
  .getElementById("invite-users-modal-open")
  .addEventListener("click", showInviteUsersModal);
document.getElementById("close-invite-users-modal").addEventListener("click", () => {
  inviteUsersModal.modal("hide");
  // TODO: Generate invite link
});

function showInviteUsersModal() {
  inviteUsersModal.modal("show");
}

module.exports = {
  showInviteUsersModal,
};