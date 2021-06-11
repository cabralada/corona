import { Card, CircularProgress, CardContent, Grid, Paper, Typography, Chip } from '@material-ui/core'
import { WarningOutlined } from '@material-ui/icons'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HiglightCases from '../components/HightlightCases/HiglightCases'
import styles from '../styles/Home.module.css'
import { fetcher } from '../utility/utility'

const dataFormat = (data: string) => new Date(data).toLocaleString();

const Home = () => {
  const { data } = useSWR('https://api.corona-zahlen.org/germany', fetcher)
  const [currentDate, setCurrentDate] = useState('');

  console.log(data)

  useEffect(() => {
    if (data && !data.error) {
      console.log(data.error)
      setCurrentDate(dataFormat(data.meta.lastCheckedForUpdate));
    }
  }, [data])

  if (data && data.error) {
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
              <WarningOutlined style={{ fontSize: 40 }}/>
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

  return (
    <>
      <div className={styles.germanFlag}>
        <span className={styles.germanFlag__black} />
        <span className={styles.germanFlag__red} />
        <span className={styles.germanFlag__yellow} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={styles.statusUpdate}>
            Last data updated at <Chip size="small" label={currentDate} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <h1 className={styles.pageName}>
            Corona <strong>Germany</strong> report
          </h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <HiglightCases
          cases={data.cases}
          deaths={data.deaths}
          recovered={data.recovered}
        />
      </Grid>
    </>
  )
}

export default Home;