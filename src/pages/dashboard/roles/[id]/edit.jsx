import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getRole, updateRole } from '@/store/slices/role'
import { getPermissions } from '@/store/slices/permission'
import { protectRoute } from '@/components/protectRoute'
import { unwrapResult } from '@reduxjs/toolkit'

const EditRole = () => {
    const router = useRouter()
    const { id  } = router.query
    const dispatch = useDispatch();
    const [ name, setName ] = useState ('')
    const permissions =  useSelector( state => state.premission.items );
    const roles =  useSelector( state => state.role.items );
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect( () => {
        if( id !== undefined ) {
            const role  = roles.find( item => item.id == id );
            setName(role.name);
            // setPermissions(role.permissions);
            // dispatch(getRole(id))
            dispatch(getPermissions())
        }
    },[dispatch, id])


    const handleOptionSelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selectedOptions);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        try {
            let resultAction = dispatch(updateRole( { 
                id: id,
                name: name,
                permissions: selectedOptions
            }));
            unwrapResult(resultAction)
            router.push('/dashboard/roles');   
        } catch (error) {
            console.log(error);
        }
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

                    <div className="form-group mb-4">
                        <label htmlFor="permissions" className='form-label'> Permissions </label>
                        <select className="form-control mb-4" name="permissions" id="permissions" onChange={handleOptionSelect} multiple>
                            { permissions.length > 0  ? (
                                permissions.map( ( item ) =>{ return ( <option key={item.id} value={item.name}>{ item.name }</option>) })
                            ) : ''}
                        </select>
                    </div> 

                    <div className="form-group">
                        <button className="btn btn-primary"> Update </button>
                    </div>

                </form> 

            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(EditRole)