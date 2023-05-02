import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventCategory } from '@/store/slices/eventcategory';
import { useRouter } from "next/router"
import { protectRoute } from '@/components/protectRoute';

const CategoryCreate = () => {
  const dispatch = useDispatch();
  let router = useRouter();
  const [ name, setName ] = useState ('')

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEventCategory(name));
    setName("");
    router.push('/dashboard/category')
  };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit}>
              
              <div className="form-group mb-4">
                <label htmlFor="type_name" className='form-label'> Category Name </label>
                <input type="text" name="type_name" id="" value={name} className="form-control" onChange={ (e) => {
                  setName(e.target.value)
                }}  />
              </div>
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CategoryCreate)