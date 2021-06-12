import { Card, CircularProgress, CardContent, Grid, Paper, Typography, Chip } from '@material-ui/core'
import { WarningOutlined } from '@material-ui/icons'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HiglightCases from '../components/HightlightCases/HiglightCases'
import { dataFormat, fetcher } from '../utility/utility'
import styles from './../styles/Home.module.scss'

const Home = () => {
  const { data, error } = useSWR('https://api.corona-zahlen.org/germany', fetcher)

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

  return (
    <Grid container spacing={2}>
      <HiglightCases
        cases={data.cases}
        deaths={data.deaths}
        recovered={data.recovered}
      />
    </Grid>
  )
}

export default Home;