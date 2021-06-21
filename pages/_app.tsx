import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { Chip, Grid, Typography } from '@material-ui/core'
import styles from '../styles/Global.module.scss'
import useSWR from 'swr'
import { dataFormat, fetcher, URL_HISTORY_GENERAL_GERMANY } from '../utility/utility'
import { Alert } from '@material-ui/lab'
import LoadingProgress from '../components/LoadingProgress/LoadingProgress'
import WarningApi from '../components/WarningApi/WarningApi'

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(URL_HISTORY_GENERAL_GERMANY, fetcher)
  const [currentDate, setCurrentDate] = useState('');
  const [region, setRegion] = useState('');
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    if (data && !data.error) {
      console.log(data);
      setCurrentDate(dataFormat(data.meta.lastCheckedForUpdate));
    }
  }, [data])

  if (error) return <WarningApi />
  if (!data) return <LoadingProgress />

  const handleRegion = (name: string) => {
    setRegion(name);
  }

  const handlePeriod = (days: number) => {
    setPeriod(days);
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
            Corona
              <strong>
                Germany{region
                          ? <span className={styles.pageName__region}>{`${region}`}</span>
                          : ''}
              </strong>
            Report
          </h1>
          {!!period && period > 0 && (
            <Alert variant="filled" severity="info" style={{
              marginBottom: 20
            }}>
              {`From lastest ${period} days`}
            </Alert>
          )}
        </Grid>
      </Grid>

      <Component
        handlePeriod={handlePeriod}
        handleRegion={handleRegion}
        {...pageProps}
      />

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
