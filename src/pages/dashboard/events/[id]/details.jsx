import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Upload, Button } from 'antd';


import { getEventTypes } from '@/store/slices/eventtype'
import { getEventCategories, getSubCategoriesByCategory } from '@/store/slices/eventcategory'
import { getVenues } from '@/store/slices/venue';

import { protectRoute } from '@/components/protectRoute';
import CustomSelect from '@/components/Form/select';
import CustomDatepicker from '@/components/Form/datepicker';
import CustomTimepicker from '@/components/Form/timepicker';
import CustomRadio from '@/components/Form/radio';

const EventDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const events =  useSelector( state => state.event.items );
  const eventtypes =  useSelector( state => state.eventtype.items );
  const eventcategories =  useSelector( state => state.eventcategory.items );
  const eventsubcategories =  useSelector( state => state.eventsubcategory.items );
  const venues =  useSelector( state => state.venue.items );

  console.log(eventtypes);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [venue, setVenue] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('')

  const { control, register, handleSubmit, reset, setValue, watch, formState: { errors, isValid } } = useForm();


  useEffect(() => {
    dispatch(getEventCategories());
    dispatch(getEventTypes());
    dispatch(getVenues());
  }, [dispatch, router] )

  useEffect( () => {
    if( category !== '') {
      dispatch(getSubCategoriesByCategory(category.id))
    }
  }, [category])

  useEffect( () => {
    if( id !== 'undefined' ) {
      let event  = events.find( item => item.id == id );
      setName(event.name)
      setType(event?.type);
      setCategory(event?.category)
      setSubcategory(event?.subcategory)
      setVenue(event?.venue)
      setDescription(event?.description)
      setImage(event.image)
    }
  },[dispatch, id])

  useEffect(() => {
    reset({
      name: name,
      type: type,
      category: category,
      venue: venue,
      description: description,
      subcategory: subcategory,
      image: image
    })
}, [name, type, category, venue, description])

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Layout>
      <DashboardLayout>
       <h2> EventDetails </h2>
       <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor=""> Event Name </label>
                  <input {...register('name')} type="text" name="name" id="" className="form-control mb-4" />
                  {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
                </div>
              </div>
            </div>

            <div className='row'>
                <div className="col-md-4">
                  <CustomSelect 
                    Controller={Controller} 
                    control={control} 
                    label="Event Type"
                    name="type"
                    options={eventtypes}
                    errors={errors}
                    value={ { 
                      value: type.id,
                      label: type.name,
                    }}
                  /> 
                </div>

              <div className="col-md-4">
                <CustomSelect 
                  Controller={Controller} 
                  control={control} 
                  label="Event Category"
                  name="category"
                  options={eventcategories}
                  errors={errors}
                  value={ { 
                    value: category.id,
                    label: category.name,
                  }}
                />
              </div>

          {/* { event.subcategory != null && (
            <div className="col-md-4">
                <div className="form-group mb-4"> 
                    <label htmlFor="subcategory" className='form-label'> Event SubCategory </label> <br/>
                    <Controller
                      control={control}
                      name="subcategory"
                      value={subcategory}
                      render={({ field }) => (
                        <Select
                          value={type}
                          style={{ width: 220 }}
                          onChange={ (value ) => field.onChange(value) }
                          options={
                            eventsubcategories.map( ( item, i ) =>{
                              return { value: item.id, label: item.name }
                            })}
                        />
                      )}
                    />
                </div>
              </div>
           )}    */}
          </div>


          <div className='row'>
              <div className="col-md-4">
                <CustomSelect 
                  Controller={Controller} 
                  control={control} 
                  label="Event Venue"
                  name="venue"
                  options={venues}
                  errors={errors}
                  value=""
                />
              </div>

              <div className="col-md-4">
                  <CustomSelect 
                    Controller={Controller} 
                    control={control} 
                    label="Event Status"
                    name="status"
                    options={[ { id: 0, name: 'Draft', id: 1, name: 'Active',  id: 2, name: 'Archived',  id: 3, name: 'Deleted',  }]}
                    errors={errors}
                    value=""
                  />
              </div>

          </div>

          <div className="form-group mb-5">
            <label htmlFor="description"> About Your Event </label>
            <textarea {...register('description')}  id="description" className="form-control mb-4">  </textarea>
          </div>

          <div className="form-group mb-5" style={{ 'height': "150px"}}>
            <Controller
                control={control}
                name="image"
                render={({ field }) => (
                <Upload.Dragger multiple={false} onChange= { info =>field.onChange(info.file) }>
                  {image ? (
                    <img src={image} alt="avatar" style={{ width: '200px', height: '200px' }} />
                  ) : (
                    <>
                    Drag files here OR <br/>
                    <Button> Click Upload </Button>
                    </>
                  )}

                </Upload.Dragger>
                )}
            />
          </div>

       </form>
      </DashboardLayout>
    </Layout>
  )
}

export default EventDetails