![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)

# Ello Engineering Challenge

This is an application for searching books and managing a reading list. The application is built using React and Material-UI, and it interacts with a GraphQL backend to fetch book data.

## Features

- Book Search: Search for books by title using an autocomplete search bar.
- Reading List: Manage a personal reading list.
- Tabs Navigation: Switch between search results and the reading list using tabs.

## Prerequisites

Before running this application, it is important to have the following installed:

- Node.js (v14 or later)
- npm or Yarn

## Getting Started

Follow these steps to set up and run the frontend of the project:

Clone the repository:

`git clone https://github.com/agwadan/ello-assignment.git`
`cd ello-assignment/frontend`

Install dependencies:

`npm install`

Or, if you prefer using Yarn:

`yarn install`

Configure the GraphQL endpoint:

- Make sure the GraphQL endpoint is set correctly in your src/queries.js file or wherever your Apollo Client is configured.

Run the application:

`npm run dev`
Or, if you prefer using Yarn:

`yarn run dev`
The application should now be running at http://localhost:[PORT_NUMBER]

## Project Structure

- src/components: Contains the React components used in the application.
- src/queries: Contains GraphQL queries used to fetch book data.
- src/store: Contains Redux setup for state management.
- src/types: Contains TypeScript types for the project.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Material-UI: A popular React UI framework.
- Apollo Client: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- Redux: A predictable state container for JavaScript apps.
- TypeScript: A strongly typed programming language that builds on JavaScript.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Screenshots
### Search Bar With Suggestions
![Ello - Google Chrome 17_06_2024 21_25_23](https://github.com/agwadan/ello-assignment/assets/30318555/15cb116f-d3fb-4649-bdbb-05bac7242fc8)

### Search Results
![image](https://github.com/agwadan/ello-assignment/assets/30318555/fcdc8dbb-33ab-486c-9248-1aeff58e9b95)

### Mobile View Screenshots
|Search Results|Reading List|
|-|-|
|![image](https://github.com/agwadan/ello-assignment/assets/30318555/84f68d76-b9e7-4543-9549-c677485d93da)|![image](https://github.com/agwadan/ello-assignment/assets/30318555/c9044e27-8938-4e52-a26e-b2246e165c96)|

