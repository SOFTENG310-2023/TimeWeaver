# Contributing Guidelines

## Code of Conduct

First and foremost, please review our [Code of Conduct](https://github.com/SOFTENG310-2023/assignment-1/blob/main/CODE_OF_CONDUCT.md). Our Code of Conduct is in effect at all times when interacting with the project, or any of it's peripherals. We expect it to be honoured and respected by all who contribute to the project.

## Our Vision

Put bluntly - time is an issue. Sure, it's annoying when you've got too much of it, and nowhere to use it. But more often than not, we're willing to bet that **not having enough time** is when it becomes a real issue. To save our users' time in the very process of allocating their time, we're creating TimeWeaver - a dedicated platform designed to simplify the organization of group meetings among students. The project aims to merge the individual timetables of students, highlighting common free slots, thus making it easy to pinpoint when everyone is available. This ensures students spend more time collaborating and less time scheduling conflicts. After all, _time is of the essence_. We envision it being used both as a social tool to coordinate meet-ups with social circles, as well as being used as a professional tool to schedule meetings.

## Contributions we're after

This project is in it's earliest stages, so we're after lots of different types of contributions such as...

- Reporting bugs
- Submitting fixes for bugs
- Suggesting new features
- Maintaining the current codebase

Since we're just scratching the surface and want to give it a good crack though, what we're not after is feature suggestions which don't align with the overall vision of the project, or fundamentally change the service provided by the project.

## Getting Started

If you're a newcomer to this project, first and foremost - we're glad you're here! We really believe this project has the potential to spread far and wide, and we hope to have your support!

If you're keen to get stuck right into contributing code to the project (and are already familiar with using Github Issues to track projects), we invite you to check out the issues already open. We've marked issues which are most suitable for newcomers with a dedicated label, so make a start with those. Once you've got your feet under you and successfully made a pull request (following the process outlined below), you're free to take on any other categories of issues you choose!

## How to file a bug report, or suggest a new feature

In this project, we primarily use Github Issues to track bugs and suggest new features. If you're unfamiliar with that, no worries - we've got you covered!

To file a bug report, follow the process outlined in the document here - [Bug Reports](https://github.com/SOFTENG310-2023/assignment-1/blob/main/.github/ISSUE_TEMPLATE/bug_report.md). It contains a simple and easy to follow template for you to implement. Similarly, to propose a new feature to add to the project, follow the process in this document - [Feature Requests](https://github.com/SOFTENG310-2023/assignment-1/blob/main/.github/ISSUE_TEMPLATE/feature_request.md)

## Pull Requests

We use Github to host the code of this project, track features requests and bug reports, and for creating and accepting pull requests as well. To propose any changes to the most recent version of the codebase, we welcome you to make a pull request, provided you follow the steps outlined below

1. Fork and clone the main project repository, and create your branch from the main branch. The branch should have a descriptive name, describing the feature you're working on, or bug you're fixing
2. Update your local repository with the most recent code from the main repository. Remember to rebase often – don’t wait until all changes have been made.
3. If you've added code that should be tested, add tests. As well as this, run all existing tests to make sure the application works as expected
4. If APIs have been changed, update the documentation.
5. **Create a pull request**, ensuring that the title summarises the changes made. In the body, reference the associated issue, as well as providing further details about the changes made to the project.
6. Another member of the team will review the pull request, leaving a comment on whether it should be merged, or whether changes need to be made.
7. If the pull request is approved, you may merge the branch into the main branch.

## Setting up your environment

- You will need Node.js installed (we recommend version 18.7.1)
- You will also need NPM (however this should be installed automatically with Node.js)
- We are using Prettier to ensure consistent styling
- A git pre-commit hook will automatically run Prettier but we recommend installing it in your IDE as your formatter for the project (to minimise changes when the pre-commit hook runs)
- Follow instructions in the README to run the app

## Testing

We strongly reccomend that each Pull Request contains accompanying tests for the changes made in the Pull Request. Each commit will be automatically tested using the Projects test suite.

- Tests can be run by running `npm test` from the root folder.

### Writing Tests

- When making changes, please create a file `src/<fileName>.js` for each new section of code
- Tests should be added for each applicable file by creating a new file `src/test/<fileName>.test.js`

- Tests are implemented using Jest, follow this [link](https://jestjs.io/docs/using-matchers) for tips on using the framework

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT license of this project

## Get in Touch!

If you've got any questions about the project as a whole or have any concerns - don't be a stranger! Feel free to contact us at vdav604@aucklanduni.ac.nz and we'll be sure to get back to you as soon as we can :)
