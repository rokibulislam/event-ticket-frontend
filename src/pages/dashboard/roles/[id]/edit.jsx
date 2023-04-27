import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getRole, updateRole } from '@/store/slices/role'


const EditRole = () => {
    const router = useRouter()
    const { id  } = router.query
    const dispatch = useDispatch();
  
    const role =  useSelector( state => state.role.item );
    const [ name, setName ] = useState (role.name)
    const [ permissions, setPermissions ] = useState (role.permissions)
  
    useEffect( () => {
      dispatch(getRole(id))
    },[dispatch, router])

    const handleSubmit = (e) => {
        e.preventDefault();
    } 

    return (
        <Layout>
            <DashboardLayout>
                
                <h2> EditRole </h2>

                <form action='' method='post' onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor=""> Role Name </label>
                        <input type="text" name="type_name" id="" value={name} className="form-control mb-4" onChange={ (e) => { setName(e.target.value) }}  />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary"> Update </button>
                    </div>

                </form> 

            </DashboardLayout>
        </Layout>
    )
}

export default EditRole