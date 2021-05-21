import { csv } from "d3-fetch";
import { groups } from "d3-array";
import { autoType } from "d3-dsv";
import { readable, writable, derived } from "svelte/store";

const fecGdpDataURL = "./data/fec-gdp.csv";
const fecHhDataURL = "./data/fec-hh.csv";
const renewHhDataURL = "./data/renew-hh.csv";
const povertyDataURL = "./data/poverty.csv";
const housingDataURL = "./data/housing.csv";
const gasGridDataURL = "./data/gas-grid.csv";
const credibilityDataURL = "./data/credibility.csv";
const countryDataURL = "./data/EU27.csv";

export const fecGdpDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(fecGdpDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const fecHhDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(fecHhDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const renewHhDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(renewHhDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const povertyDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(povertyDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const housingDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(housingDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const gasGridDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(gasGridDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const credibilityDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(credibilityDataURL, autoType)]).then(([table]) => {
    const byCountry = groups(table, (d) => d.geo);
    set({
      table,
      byCountry,
    });
  });
  return () => {};
});

export const countryDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(countryDataURL, autoType)]).then(([table]) => {
    set({
      table,
    });
  });
  return () => {};
});

export const country = writable("SE");

export const allCountryData = derived(
  [
    fecGdpDataSet,
    fecHhDataSet,
    renewHhDataSet,
    housingDataSet,
    povertyDataSet,
    gasGridDataSet,
    credibilityDataSet,
    country,
  ],
  ([
    $fecGdpDataSet,
    $fecHhDataSet,
    $renewHhDataSet,
    $povertyDataSet,
    $housingDataSet,
    $gasGridDataSet,
    $credibilityDataSet,
    $country,
  ]) => {
    function countryFilter(el) {
      return el[0] === $country;
    }

    const fecData = $fecGdpDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const fecHhData = $fecHhDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const renewHhData = $renewHhDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const povertyData = $povertyDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const housingData = $housingDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const gasGridData = $gasGridDataSet.byCountry.filter(countryFilter)[0]; //[1];
    const credibilityData =
      $credibilityDataSet.byCountry.filter(countryFilter)[0]; //[1];

    return {
      fec: fecData,
      fechh: fecHhData,
      renew: renewHhData,
      poverty: povertyData,
      housing: housingData,
      gasgrid: gasGridData,
      credibility: credibilityData,
    };
  }
);
