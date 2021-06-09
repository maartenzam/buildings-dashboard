# ECF buildings dashboard

The European Climate Buildings dashboard [buildingsdashboard.eu](http://buildingsdashboard.eu) monitors the climate performance of buildings and related policies in the EU and its member states. It is developed by [Stefan Scheuer Consulting](https://www.stefanscheuer.eu/) and [Maarten Lambrechts](https://www.maartenlambrechts.com/).

The repository contains:

- source data
- R code to download and process Eurostat data
- frontend code to build the dashboard

# Data

All source data and data processing code lives in [data](data).
The [buildings-dashboard-dataprocessing.R](/data/buildings-dashboard-dataprocessing.R) script:

- loads all the source data files
- downloads data from the relevant Eurostat databases
- transforms the data and calculates derived values
- writes csv files to [public/data](public/data) to be used by the dashboard
- writes an Excel file with all the data, that is written to the [public](public) folder

## Data update

Updating the dashboard data requires:

- updating any source data that has new or edited data
- run the [buildings-dashboard-dataprocessing.R](/data/buildings-dashboard-dataprocessing.R) script. This will load the newest data from Eurostat and update all the data for the dashboard
- the generated Excel file with all the data has a date stamp at the end of its name. This date stamp needs to be adjusted in the text of the About page, which lives in [src/data/AboutText.js](src/data/AboutText.js)
- the dashboard nees to be rebuild with `npm run build` (see further)
- after that, the dashboard needs to be redeployed

# Front end

The front end is developed in [Svelte](https://svelte.dev/).

## Getting started

First, clone this repository. Then install the dependencies (you should have [Node](https://nodejs.org/en/) installed):

```bash
cd buildings-dashboard
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the dashboard running. It is hot reloading, so if you change any file in `src`, the page should automatically refresh.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the dashboard:

```bash
npm run build
```

You can run the newly built dashboard with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to the web

To deploy, upload the content of the [public](public) folder after running `npm run build` to the root of a webserver.
