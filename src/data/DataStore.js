import { csv } from "d3-fetch";
import { groups } from "d3-array";
import { readable } from "svelte/store";

const fecGdpDataURL = "./data/fec-gdp.csv";

export const fecGdpDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(fecGdpDataURL)]).then(([table]) => {
    //const tableOrdered = orderBy(table, 'year', 'asc');
    //const countryTimeSeries = groupBy(tableOrdered, 'id');
    //const latestCountryValues = mapValues(countryTimeSeries, a => last(a));
    const byCountry = groups(table, (d) => d.geo);

    set({
      table,
      byCountry,
      //latestCountryValues,
    });
  });
  // return cleanup function
  return () => {};
});
