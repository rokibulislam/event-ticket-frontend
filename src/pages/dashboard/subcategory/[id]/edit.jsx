import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getSubEventCategory, updateSubEventCategory } from '@/store/slices/eventsubcategory'
import { getEventCategories } from '@/store/slices/eventcategory';

const EditSubCategory = () => {
    const router = useRouter()
    const { id : routerId } = router.query
    const dispatch = useDispatch();
  
    const eventcategories =  useSelector( state => state.eventcategory.items );
    const eventsubcategory =  useSelector( state => state.eventsubcategory.item );

    const [ name, setName ] = useState ('')

    const [ id, setId ] = useState (null)
  
    useEffect( () => {
      dispatch(getSubEventCategory(routerId))
      dispatch(getEventCategories());
      setName(eventsubcategory.name)
      setId(eventsubcategory.id)
    },[dispatch, router])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateSubEventCategory({ id, name }))

      router.push('/dashboard/subcategory')
    } 

    const handleChange = (e) => {
        e.preventDefault();
    }
  
    return (
      <Layout>
          <DashboardLayout>
            
            <form action='' method='post' onSubmit={handleSubmit}>

              <input type="hidden" name="id" value={id} />

              <div className="form-group">
                <label htmlFor=""> SubCategory Name </label>
                <input type="text" name="type_name" id="" value={eventsubcategory.name} className="form-control mb-4" onChange={ (e) => {
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
                  <button className="btn btn-primary"> Update </button>
              </div>
            
            </form> 

          </DashboardLayout>
      </Layout>
    )
}

export default EditSubCategory