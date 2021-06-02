const indicators = [
  {
    indicatorCode: "fec",
    indicatorName: "Final energy consumption (FEC)",
    indicatorExplanation: `
    <p>This indicator shows the development of total energy end use across all sectors compared to three benchmark levels</p>
    <ul>
      <li>2020 target set by Member States to contribute to the EU 20% energy efficiency target (2020 target)</li>
      <li>the 2030 national contributions to the EU energy efficiency target of 32.5% as set in National Energy and Climate Plans (2030 NECP), leaving a gap of 3.1% points; and</li>
      <li>the 2030 EU projections for national final energy demand according to the EUCO3232.5 scenario in line with the EU’s energy targets modelled in 2018 (2030 EUCO 3232.5)</li>
    </ul>
    <p>Final energy consumption is influenced by economic activity. This is why the charts also show energy intensity, which is FEC/GDP.</p>
    <h3>FEC (Mtoe) by Members State (2019)</h3`,
    indicatorUnits: [
      { unitsCode: "absolute", unitsName: "Absolute", unitsShort: "Mtoe/year" },
      {
        unitsCode: "relative",
        unitsName: "Relative to GDP",
        unitsShort: "toe/million € GDP",
      },
    ],
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
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
        unitsShort: "kg/cap/year",
      },
    ],
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
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
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
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
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
      },
    ],
  },
  {
    indicatorCode: "poverty",
    indicatorName: "Population unable to keep home warm",
    indicatorExplanation: "Population unable to keep home warm explanation",
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
      },
    ],
  },
  {
    indicatorCode: "gasban",
    indicatorName: "Ban to connect new houses to the gas grid",
    indicatorExplanation:
      "Ban to connect new houses to the gas grid explanation",
    indicatorUnits: [],
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
      },
    ],
  },
  {
    indicatorCode: "credibility",
    indicatorName: "Credibility of renovation strategy",
    indicatorExplanation: "Credibility of renovation strategy explanation",
    indicatorUnits: [],
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do",
      },
    ],
  },
];

export default indicators;
