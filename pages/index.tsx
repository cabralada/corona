import { Box, Card, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ChartInfo from '../components/ChartInfo/ChartInfo'
import HighlightCases from '../components/HighlightCases/HighlightCases'
import LoadingProgress from '../components/LoadingProgress/LoadingProgress'
import Region from '../components/Region/Region'
import TimeFrame from '../components/TimeFrame/TimeFrame'
import WarningApi from '../components/WarningApi/WarningApi'
import {
  fetcher,
  sharedReduceCases,
  sharedReduceDeaths,
  sharedReduceRecovered,
  URL_HISTORY_DISTRICT,
  URL_HISTORY_GENERAL_CASES,
  URL_HISTORY_GENERAL_DEATHS,
  URL_HISTORY_GENERAL_GERMANY,
  URL_HISTORY_GENERAL_RECOVERED
} from '../utility/utility'

const Home = (props: any) => {
  const [period, setPeriod] = useState(0);
  const [district, setDistrict] = useState({ name: '', id: '' });
  const [deutchlandData, setDeutchlandData] = useState({ cases: 0, deaths: 0, recovered: 0 });
  const [dataInfoCases, setDataInfoCases] = useState<any>([]);
  const [dataInfoDeath, setDataInfoDeath] = useState<any>([]);
  const [dataInfoRecovered, setDataInfoRecovered] = useState<any>([]);
  const [selectedData, setSelectedData] = useState({ title: '', cases: 0, deaths: 0, recovered: 0 });
  const [disableTimeFrameButtons, setDisableTimeFrameButtons] = useState(false);

  const theme = useTheme();
  const isUpMD = useMediaQuery(theme.breakpoints.up('md'));


  const { data, error } = useSWR(URL_HISTORY_GENERAL_GERMANY, fetcher);
  if (error) return <WarningApi />
  if (!data) return <LoadingProgress minHeight="80" />

  const hightLightGeneralData = typeof district.name === 'undefined' || district.name === '';

  const handleDistrict = (name: string, id: string) => {
    const selectedDistrict = { name, id }
    setDistrict(selectedDistrict);
  }

  const handleTimeFrame = (value: number) => {
    setPeriod(value);
  }

  const handleSelectedData = (name: string, days: number) => {
    props.handleRegion(name);
    props.handlePeriod(days);
  }

  const getDistrictInformation = async () => {
    const districtData =
      await axios.get(`${URL_HISTORY_DISTRICT}${district.id}`)
        .then(res => res.data)
    const fetchInfo = districtData.data[district.id];

    setDataInfoCases([]);
    setDataInfoDeath([]);
    setDataInfoRecovered([]);

    setSelectedData({
      title: district.name,
      cases: fetchInfo.cases,
      deaths: fetchInfo.deaths,
      recovered: fetchInfo.recovered,
    })
  }

  const getPeriodGeralInformation = async () => {
    if (period > 0) {
      setDisableTimeFrameButtons(true);

      const periodCasesData =
        await axios.get(`${URL_HISTORY_GENERAL_CASES}${period}`)
          .then(res => res.data);
      const periodDeathsData =
        await axios.get(`${URL_HISTORY_GENERAL_DEATHS}${period}`)
          .then(res => res.data);
      const periodRecoveredData =
        await axios.get(`${URL_HISTORY_GENERAL_RECOVERED}${period}`)
          .then(res => res.data);

      setDataInfoCases(periodCasesData.data);
      setDataInfoDeath(periodDeathsData.data);
      setDataInfoRecovered(periodRecoveredData.data);

      console.log(dataInfoCases);

      setDeutchlandData({
        cases: periodCasesData.data.reduce(sharedReduceCases, 0),
        deaths: periodDeathsData.data.reduce(sharedReduceDeaths, 0),
        recovered: periodRecoveredData.data.reduce(sharedReduceRecovered, 0),
      })
    } else {
      console.log('INITDATA')
      handleInitData();
    }

    setDisableTimeFrameButtons(false);
  }

  const getPeriodDistrictInformation = async () => {
    if (period > 0) {
      setDisableTimeFrameButtons(true);

      const periodCasesData =
        await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/cases/${period}`)
          .then(res => res.data)
          .catch((error) => { setDisableTimeFrameButtons(false) });
      const periodDeathsData =
        await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/deaths/${period}`)
          .then(res => res.data)
          .catch((error) => { setDisableTimeFrameButtons(false) });
      const periodRecoveredData =
        await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/recovered/${period}`)
          .then(res => res.data)
          .catch((error) => { setDisableTimeFrameButtons(false) });

      setDataInfoCases(periodCasesData.data[district.id].history);
      setDataInfoDeath(periodDeathsData.data[district.id].history);
      setDataInfoRecovered(periodRecoveredData.data[district.id].history);

      setSelectedData({
        title: district.name,
        cases: periodCasesData.data[district.id].history.reduce(sharedReduceCases, 0),
        deaths: periodDeathsData.data[district.id].history.reduce(sharedReduceDeaths, 0),
        recovered: periodRecoveredData.data[district.id].history.reduce(sharedReduceRecovered, 0),
      })
    } else {
      getDistrictInformation();
    }

    setDisableTimeFrameButtons(false);
  }

  const handleInitData = () => {
    const initData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
    }
    setDeutchlandData(initData);
    setDataInfoCases([]);
    setDataInfoDeath([]);
    setDataInfoRecovered([]);
  }

  useEffect(() => {
    handleInitData();
  }, [])

  useEffect(() => {
    district.name && getDistrictInformation();
    hightLightGeneralData ? getPeriodGeralInformation() : getPeriodDistrictInformation();
    handleSelectedData(district.name, period);
  }, [period, district])

  console.log('dataInfoRecovered', dataInfoRecovered, dataInfoRecovered.length);

  return (
    <>
      <Grid container spacing={2}>
        <HighlightCases
          cases={
            hightLightGeneralData
              ? deutchlandData.cases
              : selectedData.cases
          }
          deaths={
            hightLightGeneralData
              ? deutchlandData.deaths
              : selectedData.deaths
          }
          recovered={
            hightLightGeneralData
              ? deutchlandData.recovered
              : selectedData.recovered
          }

          disabledButton={disableTimeFrameButtons}
        />
      </Grid>

      {
          dataInfoRecovered && dataInfoRecovered.length > 0 &&
          dataInfoDeath && dataInfoDeath.length > 0 &&
          dataInfoCases && dataInfoCases.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <div style={{ height: '35vh', padding: '2rem 0', }}>
                  <ChartInfo
                    recovered={dataInfoRecovered}
                    deaths={dataInfoDeath}
                    cases={dataInfoCases}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
        ) : null
      }

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={7}>
          <Box mt={2}>
            <Region districtName={handleDistrict} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Box mt={isUpMD ? 2 : 0}>
            <TimeFrame
              getPeriod={handleTimeFrame}
              disabledButton={disableTimeFrameButtons}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Home;
