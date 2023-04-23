import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import React from 'react'

const SeatingChart = () => {
  const pricing = [
    {'category' : 1, 'price': 30},
    {'category': 2, 'price': 40},
    {'category': 3, 'price': 50}
]
  return (
    <div style={{ 'height': '500px' }}>
        <SeatsioDesigner
          pricing={[
              {'category': 1, 'price': 30},
              {'category': 2, 'price': 40},
              {'category': 3, 'price': 50}
          ]}
          priceFormatter={price => '$' + price}
          secretKey="6e51c7b0-a9ce-4425-9822-831137892ab5"
          region="NA"
          onChartCreated={chart => {
            console.log('created chart', chart)
          }}
          onChartUpdated={chart =>{
            setChart(chart);
            console.log('updated chart', chart)
          }}
        />
    </div>
  )
}

export default SeatingChart