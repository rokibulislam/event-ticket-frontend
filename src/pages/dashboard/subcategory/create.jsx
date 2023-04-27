import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { createSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';

const SubCategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();

  const [ input, setInput ] = useState ({
    'name': '',
    'event_category': ''
  })

  const eventcategories =  useSelector( state => state.eventcategory.items );

  useEffect(() => {
    dispatch(getEventCategories())
  }, [dispatch])
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // dispatch(createSubEventCategory(name));
    // router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> SubCategory Name </label>
                <input type="text" name="name" id="" value={input.name} className="form-control" onChange={ (e) => {
                  setName(e.target.value)
                }}  />
              </div>

              <div className="form-group mb-4">
                    <label htmlFor="event_category" className='form-label'> Event Category </label>
                    <select className="form-control mb-4" name="event_category" id="" onChange={handleChange} >
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
                    </select>
                </div>
  
              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default SubCategoryCreate