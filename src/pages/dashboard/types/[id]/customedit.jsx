import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getEventType,updateEventType } from '@/store/slices/eventtype'

const EditType = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const types =  useSelector( state => state.eventtype.items );
    const [ name, setName ] = useState ('')

    useEffect( () => {
      if( id !== 'undefined' ) {
        const type  = types.find( item => item.id == id );
        setName(type.name);
      }
    },[dispatch, id])
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateEventType({ id, name }))
      router.push('/dashboard/types')
    }

    return (
      <Layout>
          <DashboardLayout>
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group">
                    <label htmlFor=""> Type Name </label>
                    <input type="text" name="type_name" id="" value={name} className="form-control mb-4" onChange={ (e) => {
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