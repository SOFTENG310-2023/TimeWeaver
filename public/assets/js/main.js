const axios = require('axios');
const ical = require('ical.js');

// parses the ical file into JSON
function icalFromURLToJSON(url) {
    return axios.get(url)
        .then(response => {
            const jcalData = ical.parse(response.data);
            const comp = new ical.Component(jcalData);

            const events = comp.getAllSubcomponents('vevent').map(eventComp => {
                return {
                    summary: eventComp.getFirstPropertyValue('summary'),
                    start: eventComp.getFirstPropertyValue('dtstart').toJSDate(),
                    end: eventComp.getFirstPropertyValue('dtend').toJSDate(),
                    
                };
            });

            return events;
        })
        .catch(error => {
            console.error("Error fetching iCal data from URL:", error);
        });
}

// get the URL from command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Usage: node yourScriptName.js <iCal_URL>');
    process.exit(1);
}

const icalURL = args[0];
icalFromURLToJSON(icalURL).then(data => {
    console.log(JSON.stringify(data, null, 4));
});
    