const indicators = [
  {
    indicatorCode: "fec",
    indicatorName: "Final energy consumption",
    indicatorExplanation: "FEC explanation",
    indicatorUnits: [
      { unitsCode: "absolute", unitsName: "Absolute", unitsShort: "Mtoe/year" },
      {
        unitsCode: "relative",
        unitsName: "Relative to GDP",
        unitsShort: "toe/million € GDP",
      },
    ],
  },
  {
    indicatorCode: "fechh",
    indicatorName: "Final energy consumption in households",
    indicatorExplanation: "FEC households explanation",
    indicatorUnits: [
      { unitsCode: "absolute", unitsName: "Absolute", unitsShort: "Mtoe/year" },
      {
        unitsCode: "climate",
        unitsName: "Climate corrected",
        unitsShort: "Mtoe/year",
      },
      {
        unitsCode: "climatecapita",
        unitsName: "Climate corrected, per capita",
        unitsShort: "toe/cap/year",
      },
    ],
  },
  {
    indicatorCode: "renewables",
    indicatorName: "Renewables in FEC inhouseholds",
    indicatorExplanation: "Renewables in FEC explanation",
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
      {
        unitsCode: "sharenobiom",
        unitsName: "Share, without biomass",
        unitsShort: "percent",
      },
    ],
  },
  {
    indicatorCode: "housing",
    indicatorName: "Population living in bad housing conditions",
    indicatorExplanation:
      "Population living in bad housing conditions explanation.",
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
  },
  {
    indicatorCode: "poverty",
    indicatorName: "Population unable to keep home warm",
    indicatorExplanation: "Population unable to keep home warm explanation",
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
  },
  {
    indicatorCode: "gasban",
    indicatorName: "Ban to connect new houses to the gas grid",
    indicatorExplanation:
      "Ban to connect new houses to the gas grid explanation",
    indicatorUnits: [],
  },
  {
    indicatorCode: "credibility",
    indicatorName: "Credibility of renovation strategy",
    indicatorExplanation: "Credibility of renovation strategy explanation",
    indicatorUnits: [],
  },
];

export default indicators;
