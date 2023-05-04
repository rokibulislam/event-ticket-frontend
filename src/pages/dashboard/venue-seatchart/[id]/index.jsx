import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SeatsioSeatingChart, SeatsioEventManager, SeatsioChartManager, SeatsioDesigner } from '@seatsio/seatsio-react';
import { getVenue } from '@/store/slices/venue';
import { useRouter } from 'next/router'


const VenueSeatChart = () => {
    let dispatch = useDispatch();
    const router = useRouter()
    const { id } = router.query;
    let [chartkey, setChartkey] = useState(null)
    console.log(chartkey);
    let venus = useSelector( state => state.venue.items );
    
    useEffect(() => {
        if(id !== 'undefined') {
            let venue = venus.find( item => item.id == id );
            let event = venue.events[0];
            setChartkey(event.pivot.seatsid)
            // dispatch(getVenue(id));
        }
     }, [dispatch, id])
    
    
    return (
        <Layout>
            <DashboardLayout>
                <h2> VenueSeatChart  </h2>
                {
                    chartkey !== null ? (
                    <div className="form-group" style={{ 'height': '500px' }}> 
                    <SeatsioDesigner
                        secretKey="6e51c7b0-a9ce-4425-9822-831137892ab5"
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
                    ) : ''
                }
            </DashboardLayout>
        </Layout>
    )
}

export default VenueSeatChart