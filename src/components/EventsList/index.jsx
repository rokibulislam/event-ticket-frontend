import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Row, Space, Button } from 'antd';
import { getEvents } from '@/store/slices/event';
import Link from 'next/link'

const EventsCard = (props) => {
    const dispatch =  useDispatch()
    const events =  useSelector( state => state.event.items );

    // useEffect(() => {
    //   dispatch(getEvents());
    // }, [dispatch])
    
  return (
    <div className='event'>
      
      { events.length > 0 && (
        <Row gutter={16}>
          { events.map( item => {
            return ( 
              <Col span={7} key={item.id} offset={1} style={{ marginBottom: '30px' }}>
                <Card hoverable bordered={false} cover={<img src={item.image} height='200px' width='280px' style={{ padding: '0' }} />} style={{padding: 10 }}>
                  <Card.Meta
                    title={<h2>{item.name}</h2>}
                    description={ item.description.split(' ').splice(0, 50).join(' ') }
                    style={{ marginBottom: '30px' }}
                  />
                  <Link href={`/events/${item.id}`} className='btn btn-block btn-primary'> Read More </Link>
                  <Button> { item?.category?.name } </Button> 
                </Card>
              </Col>
            )})
          }
        </Row>
      )}
    </div>
  )
}

export default EventsCard