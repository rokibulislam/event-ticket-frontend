import Layout from '@/components/layout'
import event, { getEvent } from '@/store/slices/event'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";

const EventDetails = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const { id } = router.query
  const events =  useSelector( state => state.event.items );
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [venues, setVenues] = useState({});
  const [chartkry, setChartkey ] = useState('')

  useEffect( () => {
    if( id !== undefined ) {
      let p =  events.find(item => item.id == id );
      setName(p.name);
      setDescription(p.description)
      setUsername(p.user.name)
      setType(p.type.name)
      setCategory(p.category.name)
      let pivot = p.venues[0];
      setChartkey(pivot.pivot.seatsid);
      setVenues(p.venues[0]);
      // dispatch(getEvent(id));
    }
  }, [dispatch, id])

  return (
    <Layout>
      <div>
        <h2> {name} </h2>
        <p> {description}  </p>
        <p> Username: {username} </p>
        <p> Type: {type} </p>
        <p> Category: {category} </p>
        <p> Venue: {venues.name} </p>
        <p> Chart: {chartkry} </p>
        
        { chartkry !== null ? (
          <div className="form-group" style={{ 'height': '500px' }}> 
              <SeatsioSeatingChart
                  workspaceKey="17fedfa1-98ac-4e40-9f2a-ac501975a59b"
                  event={name}
                  region="na"
                  onRenderStarted={ createdChart => { 
                    // console.log(createdChart);
                  }}
                  onChartRendered={chart => {
                    console.log(chart.selectedObjects);
                  }}
                  onObjectSelected={function(object, selectedTicketType){
                    console.log(object);
                  }}
                  onObjectDeselected={function(object, deselectedTicketType){
                    console.log(object);
                  }}
                  onObjectStatusChanged={function(object){
                    console.log(object);
                  }}
                />
          </div>
        ) : '' }
      </div>
    </Layout>
  )
}

export default EventDetails