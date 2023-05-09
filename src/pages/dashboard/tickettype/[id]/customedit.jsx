import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getTicketType, updateTicketType } from '@/store/slices/tickettype'
import { protectRoute } from '@/components/protectRoute'

const EditTicketType = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const tickettypes =  useSelector( state => state.tickettype.items );
  const [ name, setName ] = useState ('')

  useEffect( () => {
    if( id !== 'undefined' ) {
      const type  = tickettypes.find( item => item.id == id );
      setName(type.name);
    }
    // dispatch(getTicketType(id))
  },[dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicketType({ id, name }))
    router.push('/dashboard/tickettype')
  } 

  return (
    <Layout>
        <DashboardLayout>
            <h2> EditTicketType </h2>

            <form action='' method='post' onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor=""> Ticket Type Name </label>
                <input type="text" name="type_name" id="" value={name} className="form-control mb-4" onChange={ (e) => {
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

export default protectRoute(EditTicketType)