const indicators = [
  {
    indicatorCode: "fec",
    indicatorName: "Final energy consumption (FEC)",
    indicatorExplanation: `
    <p>This indicator shows the development of <b>total energy end use</b> across all sectors compared to three benchmark levels:</p>
      <p><span style="border-bottom: 2px dashed steelblue; padding-bottom: 2px; stroke-linecap: round; color: steelblue">The 2020 target</span> set by Member States to contribute to the EU 20% energy efficiency target</p>
      <p><span style="border-bottom: 2px dashed purple; padding-bottom: 2px; stroke-linecap: round; color: purple">The 2030 national contributions</span> to the EU energy efficiency target of 32.5% as set in National Energy and Climate Plans, leaving a gap of 3.1% points</p>
      <p><span style="border-bottom: 2px dashed orange; padding-bottom: 2px; stroke-linecap: round; color: orange">The 2030 EU projections</span> for national final energy demand according to the EUCO3232.5 scenario in line with the EU’s energy targets modelled in 2018</p>
    <p>Final energy consumption is influenced by economic activity. This is why the charts also show <b>energy intensity</b>, which is FEC/GDP.</p>`,
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
    treeMapTitle: "FEC (Mtoe) by Members State (2019)",
  },
  {
    indicatorCode: "fechh",
    indicatorName: "Final energy consumption (FEC) in households",
    indicatorExplanation: `<p>FEC in households is a high-level indicator for the <b>impact of renovation strategies on the ground</b>: on average, two-thirds of residential energy demand are used for space heating. Together with water heating, space cooling, cooking and lighting, which are also in the scope of energy renovations, this rises to around 87% of residential energy demand. The remaining 13% are used for electrical appliances (see <a href="https://www.slideshare.net/sustenergy/energy-efficiency-trends-in-buildings-in-the-eu-update">Odyssee-Mure</a>).</p>
    <p>No specific target for final energy consumption in households is defined. The dashboard therefore refers to figures for energy consumption in residential buildings by 2030 in the <a href="https://ec.europa.eu/energy/sites/ener/files/technical_note_on_the_euco3232_final_14062019.pdf">EUCO3232.5 scenario</a> modelled in 2018 (<span style="border-bottom: 2px dashed orange; padding-bottom: 2px; stroke-linecap: round; color: orange">2030 projections</span>) as a <b>benchmark</b>. However, higher ambition will be needed to align with the new EU climate target.</a>
    <p>In order to increase accuracy, a <b>climate correction</b> is made, including the weighting of energy demand for heat which differs strongly between buildings located in colder or warmer climates.</p>
    <p>Furthermore, the climate corrected residential FEC is put in proportion to <b>population</b>, another important external factor influencing energy demand.</p>`,
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
        text: "Eurostat FEC in households [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_276A989_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FEC2020-2030;DS-1015839SIEC,TOTAL;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat Cooling and heating degree days [nrg_chdd_a]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=nrg_chdd_a&lang=en",
      },
      {
        text: "Eurostat Disaggregated FEC in households [nrg_d_hhq]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1167021_QID_-44C4D3AC_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1167021NRG_BAL,FC_OTH_HH_E_SC;DS-1167021INDICATORS,OBS_FLAG;DS-1167021SIEC,TOTAL;DS-1167021UNIT,TJ;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
      {
        text: "Eurostat Population on 1 January [demo_pjan]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=demo_pjan&lang=en",
      },
    ],
    treeMapTitle: "FEC (Mtoe) in households by Members State (2019)",
  },
  {
    indicatorCode: "renewables",
    indicatorName: "Renewables share in household FEC",
    indicatorExplanation: `<p>This indicator can be used as a proxy for buildings specific <b>decarbonisation of the heating systems</b>, as it shows the increase of the share of renewables in final energy consumption in households. The data provided by Eurostat include biomass. As the role of biomass to decarbonise heating is disputed, the second chart shows the renewables share in household FEC without biomass. Concretely, the chart without biomass includes solar thermal, geothermal and ambient heat (heat pumps).</p>
    <p>Solar photovoltaic is not applicable in these statistics as defined by Eurostat.</p>
    `,
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
        text: "Eurostat Complete energy balances [nrg_bal_c]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-1015839_QID_-64FF9FFF_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;NRG_BAL,L,Z,0;SIEC,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-1015839INDICATORS,OBS_FLAG;DS-1015839UNIT,KTOE;DS-1015839NRG_BAL,FC_OTH_HH_E;DS-1015839SIEC,RA100;&rankName1=SIEC_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=NRG-BAL_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=FIXED&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
    ],
  },
  {
    indicatorCode: "housing",
    indicatorName: "Population living in bad housing conditions",
    indicatorExplanation: `<p>This indicator is used to monitor progress on <b>living in high-energy performing, decent-quality housing</b>, by monitoring the percentage of people living in worst performing houses.</p>
      <p>It displays data from the European Union Statistics on Income and Living Conditions (EU-SILC) project to monitor the development of poverty and social inclusion in the EU. The data collection is based on a survey, which means that indicator values are self-reported. The charts show data from the indicator “Total population living in a dwelling with a leaking roof, damp walls, floors or foundation, or rot in window frames or floor”.
      </p>`,
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
    indicatorSources: [
      {
        text: "Eurostat EU-SILC Total population living in a dwelling with a leaking roof, damp walls, floors or foundation, or rot in window frames or floor [ilc_mdho01]",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-056148_QID_77D5F155_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;HHTYP,L,Z,0;INCGRP,L,Z,1;UNIT,L,Z,2;SEX,L,Z,3;AGE,L,Z,4;INDICATORS,C,Z,5;&zSelection=DS-056148HHTYP,TOTAL;DS-056148SEX,T;DS-056148UNIT,PC;DS-056148INCGRP,TOTAL;DS-056148AGE,TOTAL;DS-056148INDICATORS,OBS_FLAG;&rankName1=HHTYP_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=SEX_1_2_-1_2&rankName5=INCGRP_1_2_-1_2&rankName6=AGE_1_2_-1_2&rankName7=TIME_1_0_0_0&rankName8=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
    ],
  },
  {
    indicatorCode: "poverty",
    indicatorName: "Population unable to keep home warm",
    indicatorExplanation: `
    <p>This indicator is used to monitor the <b>risk of energy poverty</b> development.</p>
    <p>It measures the share of “Population who are unable to keep home adequately warm by poverty status”. Data for this indicator are being collected as part of the European Union Statistics on Income and Living Conditions (EU-SILC) project to monitor the development of poverty and social inclusion in the EU. The data collection is based on a survey, which means that indicator values are self-reported.</p>
    <p>Additional information: <a href="https://www.energypoverty.eu/sites/default/files/downloads/publications/20-06/mj0420245enn.en_.pdf">EU Energy Poverty Observatory, Member State Reports on Energy Poverty 2019</a></p>
    `,
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
    indicatorSources: [
      {
        text: "Eurostat EU-SILC Population unable to keep home adequately warm by poverty status, total [sdg_07_60] ",
        url: "https://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-869738_QID_604DFE40_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;HHTYP,L,Z,0;INCGRP,L,Z,1;UNIT,L,Z,2;INDICATORS,C,Z,3;&zSelection=DS-869738INCGRP,A_MD60;DS-869738INDICATORS,OBS_FLAG;DS-869738UNIT,PC;DS-869738HHTYP,TOTAL;&rankName1=HHTYP_1_2_-1_2&rankName2=UNIT_1_2_-1_2&rankName3=INDICATORS_1_2_-1_2&rankName4=INCGRP_1_2_-1_2&rankName5=TIME_1_0_0_0&rankName6=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=NONE&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23",
      },
    ],
  },
  {
    indicatorCode: "gasban",
    indicatorName: "Ban of gas grid connection",
    indicatorExplanation: `<p>To get on track to achieve a decarbonised heating systems, Member States are adopting legislation to phase out fossil fuel boilers step by step, mostly starting with a ban of oil boilers in new and then in existing houses and eventually banning to connect buildings to the gas grid.</p>`,
    indicatorUnits: [],
    indicatorSources: [],
  },
  {
    indicatorCode: "credibility",
    indicatorName: "Credibility of renovation strategy",
    indicatorExplanation: `<p>Member States hat to notify the Commission their <a href="https://ec.europa.eu/energy/topics/energy-efficiency/energy-efficient-buildings/long-term-renovation-strategies_en">national long-term renovation strategies (LTRS)</a> by 10 March 2020. Most LTRS were submitted with delay and some are still not availble.</p>
    <p>This section of the Dashboard will be updated once all LTRS are submitted and assessed.<p> 
    <p>Already available information:</p>
    <p><a href="https://ec.europa.eu/energy/sites/default/files/swd_commission_preliminary_analysis_of_member_state_ltrss.pdf">Preliminary analysis of the LTRS of 13 Member States</a>: In March 2020, the European Commission published a Staff Working Document assessing the LTRS that were availble in November 2020.</p>
    <p><a href="https://www.bpie.eu/publication/the-road-to-climate-neutrality-are-national-long-term-renovation-strategies-fit-for-2050/">The road to climate-neutrality</a>: In March 2021, BPIE published an analysis of 8 LTRS whether they are in line with 2030 decarbonisation requirements and on a path towards total decarbonisation of the building stock by 2050.</p>
    <p>The <a href="https://www.greenrecoverytracker.org/">Green Recovery Tracker</a> assessed the Recovery and Resilience Plans. The Tracker provides an assessment of measures and allocation of funds in the buildings sector. It is continuously updated.</p>`,
    indicatorUnits: [],
    indicatorSources: [],
  },
];

export default indicators;
