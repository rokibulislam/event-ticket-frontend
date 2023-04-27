import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getTicketType, updateTicketType } from '@/store/slices/tickettype'

const EditTicketType = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();

  const tickettype =  useSelector( state => state.tickettype.item );
  const [ name, setName ] = useState (tickettype.name)

  useEffect( () => {
    dispatch(getTicketType(id))
  },[dispatch, router])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicketType({ id, name }))

    // router.push('/dashboard/tickettype')
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

export default EditTicketType