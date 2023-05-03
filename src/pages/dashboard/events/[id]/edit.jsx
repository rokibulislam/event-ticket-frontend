import Layout from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout';
import { getEvent, updateEvent } from '@/store/slices/event';
import { getEventCategories, getSubCategoriesByCategory } from '@/store/slices/eventcategory'
import { getEventTypes } from '@/store/slices/eventtype'
import { getVenues } from '@/store/slices/venue';
import { protectRoute } from '@/components/protectRoute';
import { Select } from 'antd';

const EditEvents = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();
  
  //redux store
  const events =  useSelector( state => state.event.items );
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventsubcategories =  useSelector( state => state.eventcategory.subcategory );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const venues =  useSelector( state => state.venue.items );

  //state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [type, setType] = useState('')
  const [venue, setVenue] = useState('')
  const [image, setImage] = useState(null);

  useEffect( () => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  },[dispatch, router])

  useEffect( () => {
    if( category !== '') {
      console.log('subcategory fetching');
      dispatch(getSubCategoriesByCategory(category))
    }
  }, [category])

  useEffect( () => {
    if( id !== 'undefined' ) {
      let event  = events.find( item => item.id == id );
      console.log(event);
      setName(event.name)
      setDescription(event.description);
      setCategory(event.category.id);
      setType(event.type.id);
    }
  },[dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Layout>
      <DashboardLayout>
        
        <h2> Edit Events </h2> 
        
        <form action='' method='post' onSubmit={handleSubmit}>
          
          <div className="form-group mb-4">
            <label htmlFor="event_name" className='form-label'> Event Name </label> 
            <input type="text" name="event_name" id="" className="form-control" value={name} onChange={(e) => setName(e.target.value)}  />
          </div>

          
        <div className="row">

          <div className="col">
            <div className="form-group mb-4">
              <label htmlFor="event_type" className='form-label'> Event Type </label> <br/>
              <Select
                style={{ width: 220 }}
                onChange={ (value ) => setType(value)}
                options={ eventtypes.length > 0 ? eventtypes.map( item => {
                  return { value: item.id,label: item.name }
                }) : [] }
                value={type}
              /> 
                {/* <select className="form-control" name="event_type" id="" onChange={ (e) => setType(e.target.value)} >
                {
                  eventtypes.length > 0  ? (
                    eventtypes.map( ( item, i ) =>{
                      return (
                        <option value={item.id}>
                          { item.name }
                        </option>
                      )
                    })
                  ) : ''
                }
              </select> */}
            </div>
          </div>

          <div className="col">

            <div className="form-group mb-4">
              <label htmlFor="event_category" className='form-label'> Event Category </label> <br/>
              <Select
                style={{ width: 220 }}
                onChange={ (value ) => setType(value)}
                options={ eventcategories.length > 0 ? eventcategories.map( item => {
                  return { value: item.id,label: item.name }
                }) : [] }
                value={type}
                /> 
                {/* <select className="form-control" name="event_category" id="" onChange={ (e) => setCategory(e.target.value)} >
                {
                    eventcategories.length > 0  ? (
                      eventcategories.map( ( item, i ) =>{
                        return (
                          <option value={item.id}>
                            { item.name }
                          </option>
                        )
                      })
                    ) : ''
                  }
                </select> */}
            </div>
          
          </div>

          <div className="col">
            <div className="form-group mb-4"> 
              <label htmlFor="event_subcategory" className='form-label'> Event SubCategory </label> <br/>
              <Select
                style={{ width: 220 }}
                onChange={ (value ) => setType(value)}
                options={ eventsubcategories.length > 0 ? eventsubcategories.map( item => {
                  return { value: item.id,label: item.name }
                }) : [] }
                value={subcategory}
                /> 
            </div>
          </div>

          <div className="col">
                
              <div className="form-group mb-4">
                <label htmlFor="event_venue" className='form-label'> Event Venue </label>
                <select className="form-control" name="event_venue" id="" onChange={(e) => setVenue(e.target.value) } >
                  { 
                    venues.length > 0  ? (
                      venues.map( ( item, i ) =>{
                        return (
                          <option value={item.id}>
                            { item.name }
                          </option>
                        )
                      })
                    ) : ''
                  }
                </select>
              </div> 
              
          </div>

        </div>


          <div className="form-group mb-4">
            <label htmlFor="description" className='form-label'> About Your Event </label>
            <textarea name="description" id="description" className="form-control" value={description} onChange={ (e) => setDescription(e.target.value) }>  </textarea>
          </div>

          <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
          </div>

        </form>

      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditEvents)