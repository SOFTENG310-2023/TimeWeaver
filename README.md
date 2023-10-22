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

1. An .env file is to be created in the root directory containing Supabase connection strings. Credentials for our Supabase test instance are shown below. Alternatively, you can set up your own Supabase instance following the instructions [here](#supabase-instance-setup). The required strings can then be obtained by navigating to **Project settings** -> **API** in the dashboard for your Supabase project.

   ```
   SUPABASE_URL=https://rfqlaybbittzjqzfskpg.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWxheWJiaXR0empxemZza3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMzQxMDgsImV4cCI6MjAxMDkxMDEwOH0.R7P_x3HuHlwdvUc0O3lNsIWEPMYyUDKaBLBbjcpQaf4
   ```

   ![image-2](https://github.com/rl16432/TimeWeaver/assets/65014987/771322e0-9842-435e-be19-33d524bf38f5)

2. Before you start the web server you have to build it, this can be done by running `npm run build` from the root directory
3. Once the server has been built, start the web server by running `node index.js` from the root directory
4. Then navigate to http://localhost:port in your web browser (using the port specified in the command line output - this will usually be 8080)

### Supabase Instance Setup

This project depends on [Supabase](https://supabase.com/), a database host and authentication provider utilised in the backend. A Supabase instance will need to be created to test and deploy the app.

#### Pre-requisites

1. `npm install -g npx`. Installs `npx` which is needed to use the Supabase CLI.
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/). A running Docker engine is required by the Supabase CLI.

#### Remote instance

1. Create a Supabase project

   - Create an account [here](https://supabase.com/dashboard/sign-in?).
   - Sign in and open the [dashboard](https://supabase.com/dashboard/projects). Create a new project, and make sure to note down the database password.

     ![image](https://github.com/rl16432/TimeWeaver/assets/65014987/20447d83-a06e-4393-bfc3-5a9f5e7a68ba)

2. `npx supabase login`. This will prompt you to sign in with your Supabase account.
3. `npx supabase link --project-ref <REFERENCE_ID>`. This will link your newly created Supabase project to the CLI. The reference ID can be obtained by navigating to **Project Settings** -> **General**. When prompted, enter the database password which you created earlier.

   ![image-1](https://github.com/rl16432/TimeWeaver/assets/65014987/1832a501-859b-46f4-81a6-3c68d34415bb)

4. Finally, with the terminal in the project root directory, execute `npx supabase db push`. This will migrate the schemas required by the app to your database instance.

#### Local instance

1. Make sure the Docker enginer is running, and execute `npx supabase start`. This may take a while. You will eventually receive an output containing your local Supabase credentials.

   ```
   Started supabase local development setup.

           API URL: http://localhost:54321
       GraphQL URL: http://localhost:54321/graphql/v1
           DB URL: postgresql://postgres:postgres@localhost:54322/postgres
       Studio URL: http://localhost:54323
       Inbucket URL: http://localhost:54324
           anon key: <ANON_KEY>
   service_role key: <SERVICE_ROLE_KEY>
   ```

2. `npx supabase db push`. Execute this with the terminal located in the project root directory. This will reset your local database and subsequently apply the migrations.
3. In the `.env` file, set `SUPABASE_URL=API_URL` and `SUPABASE_ANON_KEY=anon key` from the output of Step 1.

### Testing:

- To run the project's testing framework, run `npm test` from the root folder.

## Usage (License details)

TimeWeaver is licensed under the MIT License. This means you can use, modify, and distribute the software as per the terms stated in the license.

## What versions are available?

Currently, TimeWeaver is available in versions:

- [v1.0.0](https://github.com/SOFTENG310-2023/TimeWeaver/releases/tag/v1.0.0) (Initial Release)
- [v1.1.0](https://github.com/SOFTENG310-2023/TimeWeaver/releases/tag/v1.1.0) (A2 Release)
- [v2.0.0](https://github.com/SOFTENG310-2023/TimeWeaver/releases/tag/v2.0.0) (A3 Release)

## Contributor Guidelines

**(Optional)** If for any reason, you require changes to the database schema please visit the [Contributing Guidelines](CONTRIBUTING.MD)

Contributions can make TimeWeaver even better. If you're interested in contributing to the project, please check out our [Contributing Guidelines](https://github.com/SOFTENG310-2023/TimeWeaver/blob/main/CONTRIBUTING.MD) to understand how you can participate.

## Tech Stack Used:

- Frontend: HTML,CSS
- Backend: Javascript
- Testing: Jest

Thank you for considering TimeWeaver.
