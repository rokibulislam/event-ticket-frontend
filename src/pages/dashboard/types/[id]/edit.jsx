import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getEventType,updateEventType } from '@/store/slices/eventtype'

const EditType = () => {
    const router = useRouter()
    const { id: routerId } = router.query
    const dispatch = useDispatch();
  
    const type =  useSelector( state => state.eventtype.item );
  
    const [ name, setName ] = useState ('')

    const [ id, setId ] = useState (null)

    useEffect( () => {
      dispatch(getEventType(routerId))
      setName(type?.name)
      setId(type?.id)
    },[dispatch, router])
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateEventType({ id, name }))

      router.push('/dashboard/types')
    }

    return (
      <Layout>
          <DashboardLayout>
          <form action='' method='post' onSubmit={handleSubmit}>

              <input type="hidden" name="id" value={id} />
              
              <div className="form-group">
                    <label htmlFor=""> Type Name </label>
                    <input type="text" name="type_name" id="" value={name} className="form-control" onChange={ (e) => {
                      setName(e.target.value)
                    }}  />
              </div>
  
              <div className="form-group">
                  <button className="btn btn-primary"> Submit </button>
              </div>
  
          </form>
          </DashboardLayout>
      </Layout>
    )
}

export default EditType