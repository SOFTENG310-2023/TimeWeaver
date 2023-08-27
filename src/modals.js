const commonModalAttributes = {
  class: "mini",
  closeIcon: true,
  classContent: "centered",
};

/** Formantic Modal Designs */
const formatModal = $.modal({
  title: "Choose Calendar Upload Method",
  ...commonModalAttributes,
  content: `
      <div>
      <button id="upload-ical" class="ui right labeled icon button green">
  <i class="right arrow icon"></i>
  Upload an Ical Link
  </button>
      <br/><br/>
      <button  id="upload-manual" class="ui right labeled icon button green">
  <i class="right arrow icon"></i>
  Add Calendar Manually
  </button>
      </div>`,
});

const addIcalModal = $.modal({
  title: "Add Ical Link",
  ...commonModalAttributes,
  content: `
      <div class="ui labeled input">
      <div class="ui blue label">Name</div>
      <input id="ical-name-input" type="text" placeholder="Eg. Sam">
      </div>
  
      <h5>Paste your Ical Link Here:</h5>
  
      <div class="ui labeled input">
  
      <div id = "ical-input" class="ui blue label">ICal Link</div>
      
      <input id="ical-link-input" type="text" placeholder="<Ical Link>">
      </div>
      <br></br>
      <div class="ui approve button green" id="setup-new-calendar-ical" >Done</div>`,
});

const manualCalendarTable = `<table
  id = "calendar-table"
  class="ui celled table border-left-none align center"
  aria-label="Availability calendar"
  >
  <thead>
              <tr class="border-left-none">
                <th class="collapsing border-left-none"></th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="collapsing border-left-none" rowspan="2">8am</td>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-0800"></td>
                <td class="cell" id="tue-0800"></td>
                <td class="cell" id="wed-0800"></td>
                <td class="cell" id="thu-0800"></td>
                <td class="cell" id="fri-0800"></td>
                <td class="cell" id="sat-0800"></td>
                <td class="cell" id="sun-0800"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-0830"></td>
                <td class="cell" id="tue-0830"></td>
                <td class="cell" id="wed-0830"></td>
                <td class="cell" id="thu-0830"></td>
                <td class="cell" id="fri-0830"></td>
                <td class="cell" id="sat-0830"></td>
                <td class="cell" id="sun-0830"></td>
              </tr>
              <tr>
                <td class="collapsing" rowspan="2">9am</td>
                <td class="cell" id="mon-0900"></td>
                <td class="cell" id="tue-0900"></td>
                <td class="cell" id="wed-0900"></td>
                <td class="cell" id="thu-0900"></td>
                <td class="cell" id="fri-0900"></td>
                <td class="cell" id="sat-0900"></td>
                <td class="cell" id="sun-0900"></td>
              </tr>
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-0930"></td>
                <td class="cell" id="tue-0930"></td>
                <td class="cell" id="wed-0930"></td>
                <td class="cell" id="thu-0930"></td>
                <td class="cell" id="fri-0930"></td>
                <td class="cell" id="sat-0930"></td>
                <td class="cell" id="sun-0930"></td>
              </tr>
              <tr>
                <td class="collapsing" rowspan="2">10am</td>
                <td class="cell" id="mon-1000"></td>
                <td class="cell" id="tue-1000"></td>
                <td class="cell" id="wed-1000"></td>
                <td class="cell" id="thu-1000"></td>
                <td class="cell" id="fri-1000"></td>
                <td class="cell" id="sat-1000"></td>
                <td class="cell" id="sun-1000"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1030"></td>
                <td class="cell" id="tue-1030"></td>
                <td class="cell" id="wed-1030"></td>
                <td class="cell" id="thu-1030"></td>
                <td class="cell" id="fri-1030"></td>
                <td class="cell" id="sat-1030"></td>
                <td class="cell" id="sun-1030"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">11am</td>
                <td class="cell" id="mon-1100"></td>
                <td class="cell" id="tue-1100"></td>
                <td class="cell" id="wed-1100"></td>
                <td class="cell" id="thu-1100"></td>
                <td class="cell" id="fri-1100"></td>
                <td class="cell" id="sat-1100"></td>
                <td class="cell" id="sun-1100"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1130"></td>
                <td class="cell" id="tue-1130"></td>
                <td class="cell" id="wed-1130"></td>
                <td class="cell" id="thu-1130"></td>
                <td class="cell" id="fri-1130"></td>
                <td class="cell" id="sat-1130"></td>
                <td class="cell" id="sun-1130"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">12pm</td>
                <td class="cell" id="mon-1200"></td>
                <td class="cell" id="tue-1200"></td>
                <td class="cell" id="wed-1200"></td>
                <td class="cell" id="thu-1200"></td>
                <td class="cell" id="fri-1200"></td>
                <td class="cell" id="sat-1200"></td>
                <td class="cell" id="sun-1200"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1230"></td>
                <td class="cell" id="tue-1230"></td>
                <td class="cell" id="wed-1230"></td>
                <td class="cell" id="thu-1230"></td>
                <td class="cell" id="fri-1230"></td>
                <td class="cell" id="sat-1230"></td>
                <td class="cell" id="sun-1230"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">1pm</td>
                <td class="cell" id="mon-1300"></td>
                <td class="cell" id="tue-1300"></td>
                <td class="cell" id="wed-1300"></td>
                <td class="cell" id="thu-1300"></td>
                <td class="cell" id="fri-1300"></td>
                <td class="cell" id="sat-1300"></td>
                <td class="cell" id="sun-1300"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1330"></td>
                <td class="cell" id="tue-1330"></td>
                <td class="cell" id="wed-1330"></td>
                <td class="cell" id="thu-1330"></td>
                <td class="cell" id="fri-1330"></td>
                <td class="cell" id="sat-1330"></td>
                <td class="cell" id="sun-1330"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">2pm</td>
                <td class="cell" id="mon-1400"></td>
                <td class="cell" id="tue-1400"></td>
                <td class="cell" id="wed-1400"></td>
                <td class="cell" id="thu-1400"></td>
                <td class="cell" id="fri-1400"></td>
                <td class="cell" id="sat-1400"></td>
                <td class="cell" id="sun-1400"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1430"></td>
                <td class="cell" id="tue-1430"></td>
                <td class="cell" id="wed-1430"></td>
                <td class="cell" id="thu-1430"></td>
                <td class="cell" id="fri-1430"></td>
                <td class="cell" id="sat-1430"></td>
                <td class="cell" id="sun-1430"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">3pm</td>
                <td class="cell" id="mon-1500"></td>
                <td class="cell" id="tue-1500"></td>
                <td class="cell" id="wed-1500"></td>
                <td class="cell" id="thu-1500"></td>
                <td class="cell" id="fri-1500"></td>
                <td class="cell" id="sat-1500"></td>
                <td class="cell" id="sun-1500"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1530"></td>
                <td class="cell" id="tue-1530"></td>
                <td class="cell" id="wed-1530"></td>
                <td class="cell" id="thu-1530"></td>
                <td class="cell" id="fri-1530"></td>
                <td class="cell" id="sat-1530"></td>
                <td class="cell" id="sun-1530"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">4pm</td>
                <td class="cell" id="mon-1600"></td>
                <td class="cell" id="tue-1600"></td>
                <td class="cell" id="wed-1600"></td>
                <td class="cell" id="thu-1600"></td>
                <td class="cell" id="fri-1600"></td>
                <td class="cell" id="sat-1600"></td>
                <td class="cell" id="sun-1600"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1630"></td>
                <td class="cell" id="tue-1630"></td>
                <td class="cell" id="wed-1630"></td>
                <td class="cell" id="thu-1630"></td>
                <td class="cell" id="fri-1630"></td>
                <td class="cell" id="sat-1630"></td>
                <td class="cell" id="sun-1630"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">5pm</td>
                <td class="cell" id="mon-1700"></td>
                <td class="cell" id="tue-1700"></td>
                <td class="cell" id="wed-1700"></td>
                <td class="cell" id="thu-1700"></td>
                <td class="cell" id="fri-1700"></td>
                <td class="cell" id="sat-1700"></td>
                <td class="cell" id="sun-1700"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1730"></td>
                <td class="cell" id="tue-1730"></td>
                <td class="cell" id="wed-1730"></td>
                <td class="cell" id="thu-1730"></td>
                <td class="cell" id="fri-1730"></td>
                <td class="cell" id="sat-1730"></td>
                <td class="cell" id="sun-1730"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">6pm</td>
                <td class="cell" id="mon-1800"></td>
                <td class="cell" id="tue-1800"></td>
                <td class="cell" id="wed-1800"></td>
                <td class="cell" id="thu-1800"></td>
                <td class="cell" id="fri-1800"></td>
                <td class="cell" id="sat-1800"></td>
                <td class="cell" id="sun-1800"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1830"></td>
                <td class="cell" id="tue-1830"></td>
                <td class="cell" id="wed-1830"></td>
                <td class="cell" id="thu-1830"></td>
                <td class="cell" id="fri-1830"></td>
                <td class="cell" id="sat-1830"></td>
                <td class="cell" id="sun-1830"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">7pm</td>
                <td class="cell" id="mon-1900"></td>
                <td class="cell" id="tue-1900"></td>
                <td class="cell" id="wed-1900"></td>
                <td class="cell" id="thu-1900"></td>
                <td class="cell" id="fri-1900"></td>
                <td class="cell" id="sat-1900"></td>
                <td class="cell" id="sun-1900"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-1930"></td>
                <td class="cell" id="tue-1930"></td>
                <td class="cell" id="wed-1930"></td>
                <td class="cell" id="thu-1930"></td>
                <td class="cell" id="fri-1930"></td>
                <td class="cell" id="sat-1930"></td>
                <td class="cell" id="sun-1930"></td>
              </tr>
  
              <tr>
                <td class="collapsing" rowspan="2">8pm</td>
                <td class="cell" id="mon-2000"></td>
                <td class="cell" id="tue-2000"></td>
                <td class="cell" id="wed-2000"></td>
                <td class="cell" id="thu-2000"></td>
                <td class="cell" id="fri-2000"></td>
                <td class="cell" id="sat-2000"></td>
                <td class="cell" id="sun-2000"></td>
              </tr>
  
              <tr>
                <td class="collapsing rowspanned"></td>
                <td class="cell" id="mon-2030"></td>
                <td class="cell" id="tue-2030"></td>
                <td class="cell" id="wed-2030"></td>
                <td class="cell" id="thu-2030"></td>
                <td class="cell" id="fri-2030"></td>
                <td class="cell" id="sat-2030"></td>
                <td class="cell" id="sun-2030"></td>
              </tr>
            </tbody>
          </table>`;

const addManualModal = $.modal({
  title: "Add Calendar Manually",
  class: "large",
  closeIcon: true,
  classContent: "centered",
  content: `
      <div class="ui labeled input">
      <div class="ui blue label">Name</div>
      <input id="manual-name-input" type="text" placeholder="Eg. Sam">
      </div>
  
      <h5>Add your Calendar Manually</h5>
  
      ${manualCalendarTable}
  
      <br></br>
      <div class="ui approve button green" id="setup-new-calendar-manual">Done</div>`,
});

module.exports = { addManualModal, addIcalModal, formatModal };
