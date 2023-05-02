import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createPermission } from '@/store/slices/permission'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { protectRoute } from '@/components/protectRoute';

const CreatePermission = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const [ name, setName ] = useState ('')
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createPermission(name));
      router.push('/dashboard/permissions')
    };

    return (
        <Layout>  
            <DashboardLayout>
                <h2>  Create Permission  </h2>
                <form action='' method='post' onSubmit={handleSubmit}>
            
                    <div className="form-group mb-4">
                        <label htmlFor="type_name" className='form-label'> Permission Name </label>
                        <input type="text" name="type_name" id="" value={name} className="form-control" onChange={ (e) => { setName(e.target.value) }}  />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type='submit'> Submit </button>
                    </div>

                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(CreatePermission)