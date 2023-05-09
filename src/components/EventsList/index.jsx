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
      
      { events.length > 0 && (
        <Row gutter={16}>
          { events.map( item => {
            return ( 
              <Col span={7} key={item.id} offset={1} style={{ marginBottom: '30px'}}>
                <Card bordered={false} cover={<img src={item.image} />}>
                  <h3>  {item.name}  </h3>
                  <p> {item.description} </p>
                  <Link href={`/events/${item.id}`} className='btn btn-block btn-primary'> Read More </Link>
                </Card>
              </Col>
            )})
          }
        </Row>
      )}
    </div>
  )
}

export default EventsList