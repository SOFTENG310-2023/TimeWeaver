# TimeWeaver

## Functionality

TimeWeaver is a dedicated platform designed to simplify the organization of group meetings among students. Our solution merges the individual timetables of students, highlighting common free slots, thus making it easy to pinpoint when everyone is available. This ensures students spend more time collaborating and less time scheduling conflicts.

## Purpose

Finding a common time slot for group projects, given varied class schedules, electives, and extracurricular activities, can be challenging and time-consuming. TimeWeaver is pivotal because:

- Efficiency: It automates the process of combining timetables, removing manual comparisons.
- Visual Aid: It provides a visual representation of 'gaps' in schedules where the least number of individuals have commitments.
- Save & Share: Users can save their consolidated timetable for future reference and share it as an image with all group members, keeping everyone aligned.

## How to get started?

### Pre-requisites:

- In order to run the web server you will need [Node.js](https://nodejs.org/en) installed (we recommend version 18.17.1)
- You will also need [NPM](https://www.npmjs.com/) to install dependencies (however this will be automatically installed with Node.js)

### Installation Instructions:

- To install dependencies run `npm install` from root directory

### Deployment:

- Before you start the web server you have to build it, this can be done by running `npm run build` from the root directory
- Once the server has been built, start the web server by running `node index.js` from the root directory
- Then navigate to http://localhost:port in your web browser (using the port specified in the command line output - this will usually be 8080)

### Testing:

- To run the project's testing framework, run `npm test` from the root folder.

## Usage (License details)

TimeWeaver is licensed under the MIT License. This means you can use, modify, and distribute the software as per the terms stated in the license.

## What versions are available?

Currently, TimeWeaver is available in versions:

- 1.0 (Initial Release)

## Contributor Guidelines

Contributions can make TimeWeaver even better. If you're interested in contributing to the project, please check out our [Contributing Guidelines](https://github.com/SOFTENG310-2023/TimeWeaver/blob/main/CONTRIBUTING.MD) to understand how you can participate.

## Tech Stack Used:

- Frontend: HTML,CSS
- Backend: Javascript
- Testing: Jest

Thank you for considering TimeWeaver.
