import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Row, Space } from 'antd';
import { getEvents } from '@/store/slices/event';
import Link from 'next/link'

const EventsList = (props) => {
    const dispatch =  useDispatch()
    const events =  useSelector( state => state.event.items );

    useEffect(() => {
      dispatch(getEvents());
    }, [dispatch])
    
  return (
    <div className='event'>
      
      { events.length > 0 ? (
        <Row gutter={16}>
          { events.map( item => {
            return ( 
              <Col span={8}>
                <Card title={item.name} bordered={false}>
                  {item.description}
                  <Link href={`/events/${item.id}`} className='btn btn-primary'> Read More </Link>
                </Card>
              </Col>
            )})
          }
        </Row>
      ): '' }
    </div>
  )
}

export default EventsList