const { addFilterModal } = require("./modals");
const { viewFilteredCalendar } = require("./manageCalendars.js");

const filter = document.getElementById("filter-value-input");

/** Mapping buttons to their onClick functions */
document
  .getElementById("add-filter-modal-open")
  .addEventListener("click", addFilter);
document.getElementById("setup-new-filter").addEventListener("click", () => {
  addFilterModal.modal("hide");

  setupNewFilter(filter.value);

  filter.value = "";
});

function addFilter() {
  addFilterModal.modal("show");
}

function setupNewFilter(filter) {
  viewFilteredCalendar(filter);
}

module.exports = {
  addFilter,
  setupNewFilter,
};
