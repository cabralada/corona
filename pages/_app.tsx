import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { Card, Chip, CircularProgress, Grid, Typography } from '@material-ui/core'
import styles from '../styles/Global.module.scss'
import useSWR from 'swr'
import { dataFormat, fetcher } from '../utility/utility'
import { WarningOutlined } from '@material-ui/icons'

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR('https://api.corona-zahlen.org/germany', fetcher)
  const [currentDate, setCurrentDate] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    if (data && !data.error) {
      setCurrentDate(dataFormat(data.meta.lastCheckedForUpdate));
    }
  }, [data])

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

  if (!data) return (
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
        <CircularProgress />
      </Grid>
    </Grid>
  )

  const handleRegion = (name: string) => {
    console.log('handleRegion', name);
    setRegion(name);
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

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid item xs={12}>
          <h1 className={styles.pageName}>
            Corona <strong>Germany{region
              ? <span className={styles.pageName__region}>{`${region}`}</span>
              : ''}</strong> Report
          </h1>
        </Grid>
      </Grid>

      <Component handleRegion={handleRegion} {...pageProps} />

      {
        data.meta && (
          <footer className={styles.footer}>
            <ul>
              <li>Data provided by <a href={data.meta.info} target="_blank">{data.meta.source}</a></li>
              <li>Last time updated {dataFormat(data.meta.lastUpdate)}</li>
              <li>Last time <strong>Checked</strong> updated {dataFormat(data.meta.lastCheckedForUpdate)}</li>
            </ul>
          </footer>
        )
      }

    </>
  )
}
export default MyApp
