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

// Get the group ID from the URL search params
async function joinInvitedGroup() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = url.searchParams;
  const invitedGroupId = params.get("invite");
  
  if (invitedGroupId === null) {
    return;
  }

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const userId = localStorage.getItem("user_id");

  const res = await fetch(`/api/group/${invitedGroupId}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Refresh": refreshToken,
    },
    body: JSON.stringify({
      groupId: invitedGroupId,
      userId: userId,
    }),
  });

  if (!res.ok) {
    alert("Error joining invited group");
  }
}

module.exports = {
  showInviteUsersModal,
  joinInvitedGroup,
};