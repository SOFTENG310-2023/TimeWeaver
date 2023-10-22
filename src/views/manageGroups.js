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
const { CalendarGroup } = require("../schemas/calendar");

// Set sidebar parent context
$(".ui.labeled.icon.sidebar").sidebar({
  context: $("#page-container"),
});

/** Mapping buttons to their onClick functions */
document
  .getElementById("add-group-modal-open")
  .addEventListener("click", addGroup);
document.getElementById("setup-new-group").addEventListener("click", () => {
  addGroupModal.modal("hide");

  setupNewGroup(groupName.value);

  groupName.value = "";
});

CalendarStore.retrieveGroups().then(() => {
  updateGroupList();

  // Select initial group
  CalendarStore.selectedGroup = CalendarStore.groupList[0].id;
  CalendarStore.selectedCalList = CalendarStore.groupList[0].calendarList;
  CalendarStore.selectedGroupElem = sidebar.children[0];
  CalendarStore.selectedGroupElem.classList.add("disabled", "group-selected");
});

/** Handles the Display of the Group When Sidebar Element is Clicked
 *
 * @param {CalendarGroup} groupObj
 */
function openGroup(groupObj) {
  const selectedGroup = CalendarStore.groupList.filter(
    (x) => x.id === groupObj.id,
  )[0];

  CalendarStore.selectedCalList = selectedGroup.calendarList;
  CalendarStore.selectedGroup = selectedGroup.id;
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

/** Handles setup of a new Group
 *
 * @param {CalendarGroup} groupObj
 */
function setupNewGroup(groupObj) {
  if (
    groupObj.name !== "" &&
    !CalendarStore.groupList.some((x) => x.id === groupObj.id)
  ) {
    CalendarStore.addGroup({
      name: groupObj,
      calendarList: [],
    }).then(() => {
      updateGroupList();
    });
  }
}

/** Re-renders the sidebar containing the calendar groups */
function updateGroupList() {
  const referenceNode = sidebar.children[sidebar.children.length - 1];

  $(sidebar).children(".group-item-container").remove();
  // Repeats for however many items in the groupList not already represented as sidebar elements
  for (const group of CalendarStore.groupList) {
    let link = createGroupElement(group);

    sidebar.insertBefore(link, referenceNode);
  }
}

/** Creates a single group link element for the groups sidebar
 *
 * @param {CalendarGroup} groupObj
 */
function createGroupElement(groupObj) {
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

  $(groupNameSpan).html(groupObj.name);

  // When a group is selected
  $(groupSelectLink).click(() => {
    if (CalendarStore.selectedGroupElem === groupSelectLink) {
      return;
    }

    // Mark new group as selected
    groupSelectLink.classList.add("disabled", "group-selected");
    if (CalendarStore.selectedGroupElem) {
      CalendarStore.selectedGroupElem.classList.remove(
        "disabled",
        "group-selected",
      );
    }
    CalendarStore.selectedGroupElem = groupSelectLink;

    openGroup(groupObj);
  });

  $(trashButton).click(function (e) {
    // Don't trigger the parent click event
    e.stopPropagation();

    // Don't allow deletion of the currently selected group
    if (CalendarStore.selectedGroupElem === groupSelectLink) {
      return;
    }

    let groupIdToDelete;

    CalendarStore.groupList = CalendarStore.groupList.filter((x) => {
      if (x.id === groupObj.id) {
        groupIdToDelete = x.id;
        return false;
      }
      return true;
    });

    CalendarStore.deleteGroup(groupIdToDelete).then(() => {
      $(groupSelectLink).remove();
    });
  });

  return groupSelectLink;
}

module.exports = {
  addGroup,
  setupNewGroup,
};
