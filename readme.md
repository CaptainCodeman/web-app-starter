# Web App Starter

A skeleton application showing a "modern" web app project based
on Web-Components enhanced with Lit-Html for template rendering
and using Redux for state with Universal Router for routing and
Firebase Firestore for storage. All developed in Typescript and
built using Rollup.

App JS size: 14Kb (not including Firebase Libraries)

See [demo](https://web-app-starter.firebaseapp.com/)

## Dependecies

Firebase CLI

## Getting Started

Install dependencies

    npm install

Build

    npm run build

Develop (build & watch)

    npm run dev

Build output is in `/public` folder

## Running

Start the app using the firebase server, passing the firebase project ID (or
by configuring it in .firebaserc)

    firebase serve --project firebase-project-id

View the running app by going to http://localhost:5000

## Credits

App Drawer animation based on
[this article](https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108)
