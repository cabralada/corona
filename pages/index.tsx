import { Card, CircularProgress, CardContent, Grid, Paper, Typography, Chip } from '@material-ui/core'
import { WarningOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HiglightCases from '../components/HightlightCases/HiglightCases'
import Region from '../components/Region/Region'
import TimeFrame from '../components/TimeFrame/TimeFrame'
import { fetcher, sharedReduceCases, sharedReduceDeaths, sharedReduceRecovered, URL_HISTORY_DISTRICT, URL_HISTORY_GERAL_CASES, URL_HISTORY_GERAL_DEATHS, URL_HISTORY_GERAL_GERMANY, URL_HISTORY_GERAL_RECOVERED } from '../utility/utility'
import styles from './../styles/Home.module.scss'

const Home = (props: OwnProps) => {
  const { data, error } = useSWR(URL_HISTORY_GERAL_GERMANY, fetcher);
  const [period, setPeriod] = useState(0);
  const [district, setDistrict] = useState({ name: '', id: '' });
  const [deutchlandData, setDeutchlandData] = useState({ cases: 0, deaths: 0, recovered: 0 });
  const [selectedData, setSelectedData] = useState({ title: '', cases: 0, deaths: 0, recovered: 0 });
  const [disableTimeFrameButtons, setDisableTimeFrameButtons] = useState(false);

  const hightLightGeneralData = typeof district.name === 'undefined' || district.name === '';

  if (error) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{
          height: '80vh'
        }}
      >
        <Grid item>
          <Card className={styles.alert__no_content}>
            <div>
              <WarningOutlined style={{ fontSize: 40 }} />
            </div>
            <p><strong>API is down!</strong></p>
          </Card>
        </Grid>
      </Grid>
    );
  }

  if (!data) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

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
    const districtData = await axios.get(`${URL_HISTORY_DISTRICT}${district.id}`)
    const fetchInfo = districtData.data.data[district.id];

    setSelectedData({
      title: district.name,
      cases: fetchInfo.cases,
      deaths: fetchInfo.deaths,
      recovered: fetchInfo.recovered,
    })
  }

  const getPeriodGeralInformation = async () => {

    setDisableTimeFrameButtons(true);

    const periodCasesData = await axios.get(`${URL_HISTORY_GERAL_CASES}${period}`);
    const periodDeathsData = await axios.get(`${URL_HISTORY_GERAL_DEATHS}${period}`);
    const periodRecoveredData = await axios.get(`${URL_HISTORY_GERAL_RECOVERED}${period}`);

    {
      period === 0
        ? setDeutchlandData({
          cases: data.cases,
          deaths: data.deaths,
          recovered: data.recovered,
        })
        : setDeutchlandData({
          cases: periodCasesData.data.data.reduce(sharedReduceCases, 0),
          deaths: periodDeathsData.data.data.reduce(sharedReduceDeaths, 0),
          recovered: periodRecoveredData.data.data.reduce(sharedReduceRecovered, 0),
        })
    }

    setDisableTimeFrameButtons(false);
  }

  const getPeriodDistrictInformation = async () => {
    setDisableTimeFrameButtons(true);

    const periodCasesData = await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/cases/${period}`);
    const periodDeathsData = await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/deaths/${period}`);
    const periodRecoveredData = await axios.get(`${URL_HISTORY_DISTRICT}${district.id}/history/recovered/${period}`);

    {
      period > 0
        ? setSelectedData({
          title: district.name,
          cases: periodCasesData.data.data[district.id].history.reduce(sharedReduceCases, 0),
          deaths: periodDeathsData.data.data[district.id].history.reduce(sharedReduceDeaths, 0),
          recovered: periodRecoveredData.data.data[district.id].history.reduce(sharedReduceRecovered, 0),
        })
        : getDistrictInformation();
    }

    setDisableTimeFrameButtons(false);
  }

  useEffect(() => {
    const initData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
    }
    setDeutchlandData(initData)
  }, [])

  useEffect(() => {
    district.name && getDistrictInformation();
    hightLightGeneralData ? getPeriodGeralInformation() : getPeriodDistrictInformation();
    handleSelectedData(district.name, period);
    console.log('useEffect', period, district.name)
  }, [period, district])

  return (
    <>
      <Grid container spacing={2}>
        <HiglightCases
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
        />
      </Grid>
      <div style={{
        marginTop: '5vh',
        padding: '1rem',
        background: 'white'
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={7}>
            <Region districtName={handleDistrict} />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <TimeFrame
              getPeriod={handleTimeFrame}
              disabledButton={disableTimeFrameButtons}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home;