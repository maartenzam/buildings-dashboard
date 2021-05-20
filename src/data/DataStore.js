import { csv } from "d3-fetch";
import { groups } from "d3-array";
import { autoType } from "d3-dsv";
import { readable } from "svelte/store";

const fecGdpDataURL = "./data/fec-gdp.csv";
const fecHhDataURL = "./data/fec-hh.csv";
const renewHhDataURL = "./data/renew-hh.csv";
const povertyDataURL = "./data/poverty.csv";
const housingDataURL = "./data/housing.csv";
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

export const countryDataSet = readable({ table: [] }, (set) => {
  Promise.all([csv(countryDataURL, autoType)]).then(([table]) => {
    set({
      table,
    });
  });
  return () => {};
});
