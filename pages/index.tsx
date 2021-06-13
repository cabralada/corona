import { Card, CircularProgress, CardContent, Grid, Paper, Typography, Chip } from '@material-ui/core'
import { WarningOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HiglightCases from '../components/HightlightCases/HiglightCases'
import Region from '../components/Region/Region'
import TimeFrame from '../components/TimeFrame/TimeFrame'
import { fetcher } from '../utility/utility'
import styles from './../styles/Home.module.scss'

const Home = (props: OwnProps) => {
  const { data, error } = useSWR('https://api.corona-zahlen.org/germany', fetcher);
  const [period, setPeriod] = useState(null);
  const [district, setDistrict] = useState({name: '', id: ''});
  const [deutchlandData, setDeutchlandData] = useState({ cases: 0, deaths: 0, recovered: 0 })
  const [selectedData, setSelectedData] = useState({ title: '', cases:0, deaths:0, recovered:0 })

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
            <p>{data.error.message}</p>
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

  useEffect(() => {
    const initData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
    }
    setDeutchlandData(initData)
  }, [])

  useEffect(() => {
    const getDistrictInformation = async () => {
      const districtData = await axios.get(`https://api.corona-zahlen.org/districts/${district.id}`)
      const fetchInfo = districtData.data.data[district.id];

      setSelectedData({
        title: district.name,
        cases: fetchInfo.cases,
        deaths: fetchInfo.deaths,
        recovered: fetchInfo.recovered,
      })
    }
    district.name && getDistrictInformation();
    handleSelectedData(district.name, period);
    console.log(period)

  }, [period, district])

  const hightLightInitData = typeof district.name === 'undefined' || district.name === '';
  console.log('district.name', district.name)

  return (
    <>
      {/* {deutchlandData.cases} */}
      <Grid container spacing={2}>
        <HiglightCases
          cases={hightLightInitData ? deutchlandData.cases : selectedData.cases}
          deaths={hightLightInitData ? deutchlandData.deaths: selectedData.deaths}
          recovered={hightLightInitData ? deutchlandData.recovered: selectedData.recovered}

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
            <TimeFrame getPeriod={handleTimeFrame} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home;