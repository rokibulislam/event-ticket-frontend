import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { useRouter } from "next/router"
import { createSubEventCategory } from '@/store/slices/eventsubcategory';
import { getEventCategories } from '@/store/slices/eventcategory';
import { Select } from 'antd'
import { protectRoute } from '@/components/protectRoute';

const SubCategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const eventcategories =  useSelector( state => state.eventcategory.items );

  useEffect(() => {
    dispatch(getEventCategories())
  }, [dispatch])
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(input);
    dispatch(createSubEventCategory({
      name: inpname,
      category_id: input.event_category
    }));
    // router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> SubCategory Name </label>
                <input type="text" name="name" id="" value={input.name} className="form-control" onChange={ (e) => setName(e.target.value)}  />
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
                  <button className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(SubCategoryCreate)