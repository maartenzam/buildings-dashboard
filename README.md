# ECF buildings dashboard

The European Climate Buildings dashboard at [buildingsdashboard.eu](http://buildingsdashboard.eu) monitors the climate performance of buildings and related policies in the EU and its member states. It is developed by [Stefan Scheuer Consulting](https://www.stefanscheuer.eu/) and [Maarten Lambrechts](https://www.maartenlambrechts.com/) for the [European Climate Foundation](https://europeanclimate.org/).

The repository contains:

- source data
- R code to download and process Eurostat data
- frontend code to build the dashboard

# Source data processing

All source data and data processing code lives in [data](data).
The [buildings-dashboard-dataprocessing.R](/data/buildings-dashboard-dataprocessing.R) script:

- loads all the source data files
- downloads data from the relevant Eurostat databases
- transforms the data and calculates derived values
- writes csv files to [public/data](public/data) to be used by the dashboard
- generates an Excel file with all the dashboard data, that is written to the [public](public) folder

## Data update

Updating the dashboard data requires:

- updating any source data (benchmark and traffic light indicator Excel files in [data](data)) that has new or edited data (make sure not to change column names)
- run the [buildings-dashboard-dataprocessing.R](/data/buildings-dashboard-dataprocessing.R) script. This will load the newest data from Eurostat and update all the data for the dashboard. If you are running the R script outside of the repository, then you should have a folder called "public" as a sibling folder to the one you are running the script in. Inside the "public" folder, there should be a "data" folder.
- after the script is run, the Excel file with all data is in the "public" folder, the csv files are in the "public/data" folder.
- The updated data needs to be uploaded to the webserver where the dashboard is deployed, and overwrite the existing files on the dashboard. For reasons of precaution, it is best to download the data from the server as a backup before overwriting the files.

# Front end

The front end is developed in [Svelte](https://svelte.dev/). You can edit, build and deploy following the below instructions.

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

# Dashboard copy and data

The copy (the content of the indicator explanations and the about page) are stored in [src/data/AboutText.js](src/data/AboutText.js) and in [src/data/Indicators.js](src/data/Indicators). To update the copy of the dashboard, update these files, run `run npm dev` to check if everything is ok, then run `npm run build` and redeploy the content of the [public](public) folder to the server.

The data for the indicators and units dropdowns is stored in [src/data/Indicators.js](src/data/Indicators.js).

The csv files for the dashboard are loaded and provided to all pages and components through readable and writabe Svelte stores in [src/data/DataStore.js](src/data/DataStore.js).

# Pages

The dashboard uses [tinro](https://github.com/AlexxNB/tinro) for routing. The components for the routes are in [src/routes](src/routes):

- Home.svelte is the homepage (/)
- About.svelte is the about page (/about). It's content is loaded from [src/data/AboutText.js](src/data/AboutText.js)
- Country.svelte are the country pages (/country/{countryID})
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
- EUMap.svelte is the map for the fossil fuels use for heating and credibility indicators
- IndicatorSelector.svelte is the dropdown to select an indicator on the homepage
- UnitSelector.svelte is the dropdown to select a different unit on the homepage and on the country pages
- Treemap.svelte is the treemap for the absolute units of the fec and fechh indicators
- LinkIcon.svelte is the svg code for the external link icon next to the country names on the homepage

# Styling

Global styling can be applied in [public/global.css](public/global.css).

The tooltips are making use of [Svelte Material UI tooltips](https://sveltematerialui.com/demo/tooltip/). The [Easy styling mode](https://sveltematerialui.com/SASS.md#easy-styling-method) is used, so updates to the styling, or styling of new SMUI components require `npm run prepare` to be run.

# Generate screen capture of charts

When a chart is displayed in large format in a modal (when the small charts in the overview are clicked), it can be downloaded by clicking the icon in the top right corner of the modal.

Alternatively, high quality screen captures of charts and other elements of the dashboard can be generated in Google Chrome.

For example, to capture a chart when it is opened in big format (after clicking on a chart on the homepage):

1. Click right on the title of the chart and select "Inspect". This will open the Chrome development tools.
2. A `<h2>` element containing the title of the chart is selected in the Elements tab. Find the `<div class="modal ...">` a few lines above the h2 element and click it to select it.
3. Click the 3 dot-icon in the top right corner of the development tools, next to the "x" to close it. (or click command-shift-p (on Mac) or control-shift-p (on Windows). This opens the command menu.
4. Type "screenshot" in the menu and click 'Capture node screenshot'. This will capture the selected node (in this case the <div class="modal ..."> node) and download it.

Similarly to capture the grid of charts on the homepage, click right on the title of the "EU27" chart, select the `<div class="grid-container ...">` node and execute steps 3 and 4 described above.

To capture the content of a country page: click right on the country dropdown, select "Inspect", find the `<div class="country-page-wrapper ...">` node and execute steps 3 and 4.

[Description of this feature on the developer.chrome.com blog](https://developer.chrome.com/blog/new-in-devtools-62/#node-screenshots)

# Detailed steps to update the dashboard text and source Excel files

1. Before anything, you should make sure to start from the latest master branch. In Github Desktop, select "master" to be the current branch, and click "Fetch origin".

2. Open the folder with the dashboard code in VS Code.

3. In VS Code, click "Terminal" from the menu and click "New terminal".

4. In the terminal, type "npm run dev" and hit enter.

5. Open http://localhost:5000 in your browser.

6. Make a new branch: in VS code, click "master" in the bottom left corner of the window, then click "Create new branch" and give the new branch a name (lower case, no spaces).

7. Make the necesarry edits to the copy of the dashboard, most likely in [src/data/AboutText.js](src/data/AboutText.js) and in [src/data/Indicators.js](src/data/Indicators.js). In [src/data/Indicators.js](src/data/Indicators.js), you should only edit the `indicatorExplanation` and the links in `indicatorSources`.

8. If needed, make changes to the [data/traffic_light_indicators_data.xlsx](data/traffic_light_indicators_data.xlsx) file.

9. Save the file(s) you edited.

10. Check if all your edits are reflected in the local version of the dashboard at http://localhost:5000

11. Commit the changes by clicking the Source Control icon in the VS Code side bar (the 3 dots connected with lines), writing a commit message, and clicking the check mark.

12. If needed, repeat making changes, checking them in the browser and commiting them.

13. When you are done making edits, publish the branch to Github: in Github Desktop click "Publish branch" (if the branch hasn't been published yet), or "Push origin" if you want to update an already published branch.
