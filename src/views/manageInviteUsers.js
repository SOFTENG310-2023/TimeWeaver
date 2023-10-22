const CalendarStore = require("../store/CalendarStore").instance();
const { inviteUsersModal } = require("./modals");

/** Mapping buttons to their onClick functions */
document
  .getElementById("invite-users-modal-open")
  .addEventListener("click", showInviteUsersModal);
document.getElementById("close-invite-users-modal").addEventListener("click", () => {
  inviteUsersModal.modal("hide");
});

const inviteLinkInput = document.getElementById("invite-link")

// Copy link on click
inviteLinkInput.addEventListener("click", () => {
  inviteLinkInput.select();
  document.execCommand("copy");
  inviteLinkInput.blur();
});

function showInviteUsersModal() {
  const groupId = CalendarStore.selectedGroup;
  if (groupId === undefined) {
    // If group id is undefined, then it has not been set yet
    alert("No group selected.");
  } else {
    setInviteLink(groupId)
    inviteUsersModal.modal("show");
  }
}

// 
function setInviteLink(groupId) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const baseUrl = url.origin;

  const inviteUrl = `${baseUrl}?invite=${groupId}`;
  inviteLinkInput.value = inviteUrl;
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

  // The user needs to be logged in to join a group
  if (accessToken === null || refreshToken === null || userId === null) {
    alert("You need to be logged in to join a group.");
    return;
  }

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
  setInviteLink,
  joinInvitedGroup,
};