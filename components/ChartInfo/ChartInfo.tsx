import { ResponsiveStream } from '@nivo/stream';
import React from 'react';

const ChartInfo = ({ recovered, deaths, cases }: any) => {
    // console.log(deaths.data, recovered.data, cases.data);

    const newInfoDataDeaths = deaths.map((item: any) => item.deaths);
    const newInfoDataRecovered = recovered.map((item: any) => item.recovered);
    const newInfoDataCases = cases.map((item: any) => item.cases);

    let dataObj = {
        deaths: '',
        recovered: '',
        cases: ''
    }

    const newDataInfo = newInfoDataCases.map((item: number, index: number) => {
        return {
            Deaths: newInfoDataDeaths[index],
            Recovered: newInfoDataRecovered[index],
            Cases: item,
        }
    })

    console.log(
        newInfoDataDeaths,
        newInfoDataRecovered,
        newInfoDataCases,
        dataObj,
        newDataInfo
    )


    return (
        <ResponsiveStream
            data={newDataInfo}
            keys={['Deaths', 'Recovered', 'Cases']}
            margin={{ top: 10, right: 20, bottom: 20, left: 50 }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36
            }}
            axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
            // axisBottom={{ legend: 'Days', renderTick: (props) => {
            //     console.log(props):
            // } }}
            // yTickValues
            offsetType="none"
            // offsetType="expand"
            // offsetType="silhouette"
            // offsetType="wiggle"
            // colors={{ scheme: 'nivo' }}
            colors={['#ff5722', '#689f38', '#ff9800']}
            fillOpacity={0.9}
            borderColor={{ theme: 'background' }}
            dotSize={8}
            dotColor={{ from: 'color' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default ChartInfo;