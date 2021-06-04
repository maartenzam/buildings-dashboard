import { csv } from "d3-fetch";
import { groups } from "d3-array";
import { autoType } from "d3-dsv";
import { readable, writable, derived } from "svelte/store";

const fecGdpDataURL = "/data/fec-gdp.csv";
const fecHhDataURL = "/data/fec-hh.csv";
const renewHhDataURL = "/data/renew-hh.csv";
const povertyDataURL = "/data/poverty.csv";
const housingDataURL = "/data/housing.csv";
const gasGridDataURL = "/data/gas-grid.csv";
const credibilityDataURL = "/data/credibility.csv";
const countryDataURL = "/data/EU27.csv";
const targetsDataURL = "/data/targets.csv";
const centroidsDataURL = "/data/centroids.csv";

//export const selectedUnits = writable("absolute");

export const centroidsDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(centroidsDataURL, autoType)]).then(([table]) => {
    set({
      table,
    });
  });
  return () => {};
});

export const fecGdpDataSet = readable(
  { table: [], byCountry: [], latestYear: 0 },
  (set) => {
    Promise.all([csv(fecGdpDataURL, autoType)]).then(([table]) => {
      const byCountry = groups(table, (d) => d.geo);
      const latestYear = Math.max.apply(
        null,
        table.map((d) => d.time.getFullYear())
      );
      set({
        table,
        byCountry,
        latestYear,
      });
    });
    return () => {};
  }
);

export const fecHhDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(fecHhDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const renewHhDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(renewHhDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const povertyDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(povertyDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const housingDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(housingDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const gasGridDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(gasGridDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const credibilityDataSet = readable(
  { table: [], byCountry: [] },
  (set) => {
    Promise.all([csv(credibilityDataURL, autoType)]).then(([table]) => {
      const byCountry = groups(table, (d) => d.geo);
      set({
        table,
        byCountry,
      });
    });
    return () => {};
  }
);

export const countryDataSet = readable(
  { table: [{ code: "SE", name: "Sweden" }] },
  (set) => {
    Promise.all([csv(countryDataURL, autoType)]).then(([table]) => {
      set({
        table,
      });
    });
    return () => {};
  }
);

export const targetsDataSet = readable({ table: [], byCountry: [] }, (set) => {
  Promise.all([csv(targetsDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const country = writable("SE");

// Data for country pages
export const allCountryData = derived(
  [
    fecGdpDataSet,
    fecHhDataSet,
    renewHhDataSet,
    housingDataSet,
    povertyDataSet,
    gasGridDataSet,
    credibilityDataSet,
    targetsDataSet,
    country,
  ],
  ([
    $fecGdpDataSet,
    $fecHhDataSet,
    $renewHhDataSet,
    $housingDataSet,
    $povertyDataSet,
    $gasGridDataSet,
    $credibilityDataSet,
    $targetsDataSet,
    $country,
  ]) => {
    function countryFilter(el) {
      return el[0] === $country;
    }

    const fecData = $fecGdpDataSet.byCountry.filter(countryFilter)[0];
    const fecHhData = $fecHhDataSet.byCountry.filter(countryFilter)[0];
    const renewHhData = $renewHhDataSet.byCountry.filter(countryFilter)[0];
    const povertyData = $povertyDataSet.byCountry.filter(countryFilter)[0];
    const housingData = $housingDataSet.byCountry.filter(countryFilter)[0];
    const gasGridData = $gasGridDataSet.byCountry.filter(countryFilter)[0];
    const credibilityData =
      $credibilityDataSet.byCountry.filter(countryFilter)[0];
    const targetsData = $targetsDataSet.byCountry.filter(countryFilter)[0];

    return {
      fec: fecData,
      fechh: fecHhData,
      renewables: renewHhData,
      poverty: povertyData,
      housing: housingData,
      gasgrid: gasGridData,
      credibility: credibilityData,
      targets: targetsData,
    };
  }
);
