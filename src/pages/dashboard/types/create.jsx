import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventType } from '@/store/slices/eventtype'

const TypesCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [ name, setName ] = useState ('')

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Dispatch Redux action with form data
    dispatch(createEventType(name));

    // Reset form state
    setName("");

    router.push('/dashboard/types')
  };

  return (
    <Layout> 
        <DashboardLayout> 
          
        <form action='' method='post' onSubmit={handleSubmit}>
              
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

export default TypesCreate