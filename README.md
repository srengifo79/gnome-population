# Overview

React app created using create-react-app template developed with Javascript.

Implemente a minimalistic and simple UI where the main focus was to give filter and search functionality being a app to trade with local population.

Decided to keep the app withour routign due to the fact that there isnt much data worth to create new pages, in my opinion is simpler especially due to requirements to be a simple and easy to use app.

Filters:
 - Search by name.
 - Check by profession.
 - Check by hair color.
 - Sliders by Age, height and width.

All filters work alongside each other.

Wrote a couple of unit test expecting actions and comparing with snapshots.

Stack:
 - Javascript as a base language.
 - React as a UI library.
 - Material UI as Ui templates.
 - Jest as a test engine alongside React Testing Library.
 - Styled components to give styles to the app.

## Structure

Folders:
 - /pages: contains the landing page where all happens.
 - /components: contains reusable components that where used to build the app.
 - /theme: contains colors and breakponts to style the app.
 - /constants: any needed constat is held here.
 - /mocks: mocks used to provide data to components during testing.

## Quick Start
 1. Install dependencies with npm install.
 2. start the dev server with npm start.
 
Optional: Run npm run build to serve from a dist folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
