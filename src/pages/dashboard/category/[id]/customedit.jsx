import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getEventCategory, updateEventCategory } from '@/store/slices/eventcategory'
import { protectRoute } from '@/components/protectRoute'

const EditCategory = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')
    const categories =  useSelector( state => state.eventcategory.items );

  
    useEffect( () => {
      if( id !== 'undefined' ) {
        const category  = categories.find( item => item.id == id );
        setName(category.name);
        // dispatch(getEventCategory(routerId))
      }
    },[dispatch, id])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateEventCategory({ id, name }))
      router.push('/dashboard/category')
    } 
  
    return (
      <Layout>
          <DashboardLayout>
            
            <form action='' method='post' onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor=""> Category Name </label>
                <input type="text" name="name" id="" value={name} className="form-control mb-4" onChange={ (e) => { setName(e.target.value) }}  />
              </div>
  
              <div className="form-group">
                  <button className="btn btn-primary"> Update </button>
              </div>
            
            </form> 

          </DashboardLayout>
      </Layout>
    )
}

export default protectRoute(EditCategory)