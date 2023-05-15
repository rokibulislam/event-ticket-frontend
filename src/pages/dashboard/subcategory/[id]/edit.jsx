import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getSubEventCategory, updateSubEventCategory } from '@/store/slices/eventsubcategory'
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { protectRoute } from '@/components/protectRoute'
import { unwrapResult } from '@reduxjs/toolkit'

const EditSubCategory = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
  
    const eventcategories =  useSelector( state => state.eventcategory.items );
    const eventsubcategories =  useSelector( state => state.eventsubcategory.items );

    const [ name, setName ] = useState ('')
    const [ category, setCategory] = useState('');
  
    useEffect( () => {
      if( id !== 'undefined' ) {
        dispatch(getEventCategories());
        const eventsubcategory  = eventsubcategories.find( item => item.id == id );
        console.log(eventsubcategory);
        console.log(eventsubcategories)
        setName(eventsubcategory.name);
        setCategory(eventsubcategory.category.id);
        // dispatch(getSubEventCategory(id))
      }
    },[dispatch, id])

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        let resultAction = dispatch(updateSubEventCategory({ id, name, category_id: category }))
        unwrapResult(resultAction)
        router.push('/dashboard/subcategory') 
      } catch (error) {
        console.log(error);
      }
    } 

    const handleChange = (e) => {
        e.preventDefault();
    }
  
    return (
      <Layout>
          <DashboardLayout>
            
            <form action='' method='post' onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor=""> SubCategory Name </label>
                <input type="text" name="type_name" id="" value={name} className="form-control mb-4" onChange={ (e) => {
                      setName(e.target.value)
                    }}  />
              </div>


              <div className="form-group mb-4">
                    <label htmlFor="event_category" className='form-label'> Event Category </label>
                    <Select
                      style={{ width: 120 }}
                      onChange={ (value ) => setCategory(value)}
                      options={
                        eventcategories.map( ( item, i ) =>{
                          return { value: item.id, label: item.name }
                        })
                      }
                      value={category}
                    />
                    {/* <select className="form-control mb-4" name="event_category" id="" onChange={handleChange} >
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
  
              <div className="form-group">
                  <button className="btn btn-primary"> Update </button>
              </div>
            
            </form> 

          </DashboardLayout>
      </Layout>
    )
}

export default protectRoute(EditSubCategory)