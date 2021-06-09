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

# Copy and data

The copy (indicator explanations and about page) are stored in [src/data/AboutText.js](src/data/AboutText.js) and [src/data/Indicators.js](src/data/Indicators).

The csv files for the dashboard are loaded and provided to all pages and components through readable and writabe Svelte stores in [src/data/DataStore.js].

The data for the indicators and units dropdowns is stored in [src/data/Indicators.js](src/data/Indicators.js).

# Pages

The dashboard uses [tinro](https://github.com/AlexxNB/tinro) for routing. The components for the routes are in [src/routes](src/routes):

- Home.svelte is the homepage (/)
- About.svelte is the about page (/about). It's content is loaded from [src/data/AboutText.js]
- Country.svelte are the country pages (/country/{ID})
- Guide.svelte and Map.svelte are currently not used

# Components

The main component is [App.svelte](src/App.svelte), which is mounted into [public/index.html](public/index.html) through [src/main.js](src/main.js). It contains the routing logic, the top bar and the footer.

All subcomponents are in [src](src):

- TopBar.svelte is the top navigation bar
- Footer.svelte is the footer
- Grid.svelte is the grid of charts on the homepage
- TrendChart.svelte is the chart to show the trends in the dashboard data. It is used both on the homepage, in the modals and on the country pages.
- ChartAxis.svelte is a helper component for TrendChart.svelte
- TargetsLegend.svelte is the legend for the targets on the homepage (only shown on wide screens)
- Modal.svelte is the modal that opens a bigger version of a chart when it is clicked on the homepage
- EUMap.svelte is the map for the gasban and credibility indicators
- IndicatorSelector.svelte is the dropdown to select an indicator on the homepage
- UnitSelector.svelte is the dropdown to select a different unit on the homepage and on the country pages
- Treemap.svelte is the treemap for the absolute units of the fec and fechh indicators
- LinkIcon.svelte is the svg code for the external link icon next to the country names on the homepage

TrafficLightChart.svelte and TrafficLightLegend.svelte are unused for now.

# Styling

Global styling can be applied in [public/global.css](public/global.css).

The tooltips are making use of [Svelte Material UI tooltips](https://sveltematerialui.com/demo/tooltip/). The [Easy styling mode](https://sveltematerialui.com/SASS.md#easy-styling-method) is used, so updates to the styling, or styling of new SMUI components require `npm run prepare` to be run.
