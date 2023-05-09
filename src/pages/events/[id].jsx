import Layout from '@/components/layout'
import event, { getEvent } from '@/store/slices/event'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import Cart from '@/components/Cart'
import { addCartItem, removeCartItem } from '@/store/slices/cart'

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
  const [seatcategory, setSeatcategory ] = useState([])
  const [ reserve, setReserve ] = useState(null)
  const [ image, setImage ] = useState('');

  useEffect( () => {
    if( id !== undefined ) {
      let p =  events.find(item => item.id == id );
      setName(p.name);
      setDescription(p.description)
      setUsername(p.user.name)
      setType(p.type.name)
      setCategory(p.category.name)
      setImage(p.image);
      let pivot = p.venues[0];
      if( reserve == 1) {
        setChartkey(pivot.pivot.seatsid);
        setSeatcategory(p.seatcategory)
      }
      setVenues(p.venues[0]);
      // Seat(p.seatcategory);
      // dispatch(getEvent(id));
    }
  }, [dispatch, id])

    const subprice = (item) => {
      return item.subprices.map( subprice => ( { 'ticketType': subprice.name, 'price': subprice.price } ) )
    }

    const Seat = (items) => {
      let response = [];
      if( items.length > 0 ) {
        response =  items.map( item => {
          return item.hassubprice ? { category: item.id , 'ticketTypes': subprice(item) } : { 'category': item.id, price: item.price  }
        })
      }

      return response;
    }

    let priceing = [];
    if( seatcategory.length > 0 ) {
      priceing = Seat(seatcategory);
    }
    const handleSelection = ( object, selectedTicketType ) => {
      console.log(selectedTicketType);
      if( selectedTicketType === undefined ) {
        console.log(object)
        dispatch(addCartItem({
          id: object.id,
          price: object.pricing.price
        }))
      } else {

        dispatch(addCartItem({
          id: object.id,
          price: selectedTicketType.price,
          type: selectedTicketType.ticketType
        }))
      }
      console.log(object);
      console.log(selectedTicketType);
    }

    const handleDeSelection = ( object, deselectedTicketType ) => {
      console.log(object);
      console.log(deselectedTicketType);
      dispatch(removeCartItem({
        id: object.id,
        price: deselectedTicketType.price,
        type: deselectedTicketType.ticketType
      }))
    }

  return (
    <Layout>
    
    { image !=null  && ( <img src={image} alt="avatar" style={{ width: '100%', height: '300px' }} /> ) } 

    <div className='container' style={{ display: 'flex', justifyContent: 'space-between' }}> 
      <div className='info' style={{ flex: 1}}>
        <h2> {name} </h2>
        <p> {description}  </p>
        <p> Username: {username} </p>
        <p> Type: {type} </p>
        <p> Category: {category} </p>
        {/* <p> Venue: {venues.name} </p> */}
        {/* <p> Chart: {chartkry} </p> */}
      </div>
      <div className='' style={{ flex: 1}}>
          <Cart />
      </div>
    </div>

        { chartkry !== null && priceing.length > 0 && (
          <div className="form-group" style={{ 'height': '500px' }}> 
              <SeatsioSeatingChart
                  workspaceKey={process.env.Seatio_Public}
                  event={name}
                  region="na"
                  pricing={priceing}
                  onRenderStarted={ createdChart => { 
                    // console.log(createdChart);
                  }}
                  onChartRendered={chart => {
                    console.log(chart.selectedObjects);
                  }}
                  onObjectSelected={handleSelection}
                  onObjectDeselected={handleDeSelection}
                  onHoldSucceeded={function(objects, ticketTypes){
                    console.log('hold');
                    console.log(objects);
                    console.log(ticketTypes);
                  }}
                  onObjectStatusChanged={function(object){
                    console.log(object);
                  }}
                />
          </div>
        ) }
    </Layout>
  )
}

export default EventDetails;