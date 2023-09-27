const { addGroupModal } = require("./modals");
const {
  updateCalList,
  resetCalendar,
  openCalendar,
} = require("./manageCalendars.js");
const CalendarStore = require("../store/CalendarStore").instance();

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

// Add and select initial group
setupNewGroup("Default");
CalendarStore.selectedCalList = CalendarStore.groupList[0].calendarList;
CalendarStore.selectedGroup = sidebar.children[0];
CalendarStore.selectedGroup.classList.add("disabled", "group-selected");

/** Handles the Display of the Group When Sidebar Element is Clicked */
function openGroup(name) {
  const selectedGroup = CalendarStore.groupList.filter(
    (x) => x.name === name,
  )[0];

  CalendarStore.selectedCalList = selectedGroup.calendarList;
  updateCalList();

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
  console.log(CalendarStore);
  if (name !== "" && !CalendarStore.groupList.some((x) => x.name === name)) {
    CalendarStore.addGroup({
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
    i < CalendarStore.groupList.length;
    i++
  ) {
    let link = createGroupElement(CalendarStore.groupList[i].name);

    sidebar.insertBefore(link, referenceNode);
  }
}

/** Creates a single group link element for the groups sidebar */
function createGroupElement(groupName) {
  const groupSelectLink = document.createElement("button");
  const container = document.createElement("div");
  const groupNameSpan = document.createElement("span");
  const groupIcon = document.createElement("i");
  const trashButton = document.createElement("button");

  $(groupSelectLink).addClass("item group-item-container focus-border");
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

  // When a group is selected
  $(groupSelectLink).click(() => {
    if (CalendarStore.selectedGroup === groupSelectLink) {
      return;
    }

    // Mark new group as selected
    groupSelectLink.classList.add("disabled", "group-selected");
    if (CalendarStore.selectedGroup) {
      CalendarStore.selectedGroup.classList.remove(
        "disabled",
        "group-selected",
      );
    }
    CalendarStore.selectedGroup = groupSelectLink;

    openGroup(groupName);
  });

  $(trashButton).click(function (e) {
    // Don't trigger the parent click event
    e.stopPropagation();

    // Don't allow deletion of the currently selected group
    if (CalendarStore.selectedGroup === groupSelectLink) {
      return;
    }

    CalendarStore.groupList = CalendarStore.groupList.filter(
      (x) => x.name !== groupName,
    );
    $(groupSelectLink).remove();
  });

  return groupSelectLink;
}

module.exports = {
  addGroup,
  setupNewGroup,
};
