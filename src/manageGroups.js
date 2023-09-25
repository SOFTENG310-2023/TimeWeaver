const { addGroupModal } = require("./modals");
const {
  setCalList,
  resetCalendar,
  openCalendar,
} = require("./manageCalendars.js");

/** HTML Element Declarations */
const sidebar = document.getElementById("sidebar");
const groupName = document.getElementById("group-name-input");

// Set sidebar parent context
$(".ui.labeled.icon.sidebar").sidebar({
  context: $("#page-container"),
});

const NON_DYNAMIC_SIDEBAR_ELEMENTS = 1;

/** Mapping buttons to their onClick functions */

document
  .getElementById("add-group-modal-open")
  .addEventListener("click", addGroup);
document.getElementById("setup-new-group").addEventListener("click", () => {
  addGroupModal.modal("hide");

  setupNewGroup(groupName.value);

  groupName.value = "";
});

/** List of Uploaded Groups */
let groupList = [];
let selectedGroup;

// Add and select initial group
setupNewGroup("Default");
selectedGroup = sidebar.children[0];
selectedGroup.classList.add("disabled", "group-selected");

/** Handles the Display of the Group When Sidebar Element is Clicked */
function openGroup(name) {
  const selectedGroup = groupList.filter((x) => x.name === name)[0];

  setCalList(selectedGroup.calendarList);

  if (selectedGroup.calendarList.length === 0) {
    resetCalendar();
  } else {
    openCalendar(selectedGroup.calendarList[0].user);
  }
}

/** Handles creation of a new Group by the user */
function addGroup() {
  addGroupModal.modal("show");
}

/** Handles setup of a new Group */
function setupNewGroup(name) {
  if (name !== "" && !groupList.some((x) => x.name === name)) {
    groupList.push({
      name: name,
      groupUrl: "",
      calendarList: [],
    });

    updateGroupList();
  }
}

/** Handles setup of a new Group */
function updateGroupList() {
  const referenceNode = sidebar.children[0];

  // Repeats for however many items in the groupList not already represented as sidebar elements
  for (
    let i = sidebar.children.length - NON_DYNAMIC_SIDEBAR_ELEMENTS;
    i < groupList.length;
    i++
  ) {
    let link = createGroupElement(groupList[i].name);

    sidebar.insertBefore(link, referenceNode);
  }
}

/** Creates a single group link element for the groups sidebar */
function createGroupElement(groupName) {
  const groupSelectLink = document.createElement("a");
  const container = document.createElement("div");
  const groupNameSpan = document.createElement("span");
  const groupIcon = document.createElement("i");
  const trashButton = document.createElement("button");

  $(groupSelectLink).addClass("item group-item-container");
  $(groupSelectLink).append(trashButton);
  $(groupSelectLink).append(container);

  $(container).addClass("group-content-container");
  $(container).append(groupIcon);
  $(container).append(groupNameSpan);

  $(trashButton).addClass("ui icon red button");
  $(trashButton).append($("<i class='trash icon'></i>"));

  // Allow clicks even when the groupSelectLink is disabled
  $(trashButton).css("pointer-events", "auto");

  $(groupIcon).addClass("user friends icon");

  $(groupNameSpan).html(groupName);

  $(groupSelectLink).click(() => {
    if (selectedGroup === groupSelectLink) {
      return;
    }

    // Mark new group as selected
    groupSelectLink.classList.add("disabled", "group-selected");
    if (selectedGroup) {
      selectedGroup.classList.remove("disabled", "group-selected");
    }
    selectedGroup = groupSelectLink;

    openGroup(groupName);
  });

  $(trashButton).click(function (e) {
    e.stopPropagation();

    // Don't allow deletion of the currently selected group
    if (selectedGroup === groupSelectLink) {
      return;
    }

    groupList = groupList.filter((x) => x.name !== groupName);
    $(groupSelectLink).remove();
  });

  return groupSelectLink;
}

module.exports = {
  addGroup,
  setupNewGroup,
};
