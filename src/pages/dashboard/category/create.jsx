import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"

const CategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const [ name, setName ] = useState ('')

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Dispatch Redux action with form data
    dispatch(createEventCategory(name));

    // Reset form state
    setName("");

    router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group">
                    <label htmlFor=""> Category Name </label>
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

export default CategoryCreate