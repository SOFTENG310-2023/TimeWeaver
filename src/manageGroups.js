/** Mapping buttons to their onClick functions */
document.getElementById("sidebar-toggle").addEventListener("click", showGroups);

function showGroups() {
  $(".ui.labeled.icon.sidebar")
    .sidebar({
      context: $("#content-body"),
      dimPage: false,
    })
    .sidebar("setting", "transition", "overlay")
    .sidebar("toggle");
}

module.exports = {
  showGroups,
};
