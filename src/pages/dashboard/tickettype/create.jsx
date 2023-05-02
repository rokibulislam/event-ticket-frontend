import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import { useRouter } from "next/router"
import { createTicketType } from '@/store/slices/tickettype';
import { protectRoute } from '@/components/protectRoute';

const CreateTicketType = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const [ name, setName ] = useState ('')

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(createTicketType(name));
    setName("");
    router.push('/dashboard/tickettype')
  };

  return (
    <Layout>
        <DashboardLayout>
            <h2> CreateTicketType </h2>
            <form action='' method='post' onSubmit={handleSubmit}>
            
              <div className="form-group mb-4">
                <label htmlFor="type_name" className='form-label'> Ticket Type Name </label>
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

export default protectRoute(CreateTicketType)