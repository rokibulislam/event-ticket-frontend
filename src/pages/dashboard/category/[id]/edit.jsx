import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getEventCategory, updateEventCategory } from '@/store/slices/eventcategory'

const EditCategory = () => {
    const router = useRouter()
    const { id : routerId } = router.query
    const dispatch = useDispatch();
  
    const category =  useSelector( state => state.eventcategory.item );

    const [ name, setName ] = useState ('')

    const [ id, setId ] = useState (null)
  
    useEffect( () => {
      dispatch(getEventCategory(routerId))
      setName(category.name)
      setId(category.id)
    },[dispatch, router])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateEventCategory({ id, name }))

      router.push('/dashboard/category')
    } 
  
    return (
      <Layout>
          <DashboardLayout>
            
            <form action='' method='post' onSubmit={handleSubmit}>

              <input type="hidden" name="id" value={id} />

              <div className="form-group">
                <label htmlFor=""> Category Name </label>
                <input type="text" name="type_name" id="" value={name} className="form-control" onChange={ (e) => {
                      setName(e.target.value)
                    }}  />
              </div>
  
              <div className="form-group">
                  <button className="btn btn-primary"> Update </button>
              </div>
            
            </form> 

          </DashboardLayout>
      </Layout>
    )
}

export default EditCategory