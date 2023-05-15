import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import React from 'react'

const CustomSeatingDesigner = ({ chartkey }) => {
  return (
    <div style={{ 'height': '500px' }}>
        <SeatsioDesigner
            secretKey={process.env.Seatio_Secret}
            chartKey={chartkey}
            region="NA"
            onChartCreated={chart => {
                console.log('created chart', chart)
            }}
            onChartUpdated={chart =>{
                console.log('updated chart', chart)
            }}
        />
    </div>
  )
}

export default SeatingChart