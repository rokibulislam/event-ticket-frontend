import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { getPermissions } from '@/store/slices/permission'
import { createRole } from '@/store/slices/role'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"

const CreateRole = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const [ name, setName ] = useState ('')
    const permissions =  useSelector( state => state.premission.items );

    useEffect( () => {
        dispatch(getPermissions())
    },[dispatch])

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setSelectedOptions(selectedOptions);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createRole( { 
        name: name,
        permissions: selectedOptions
      }));
    };
  
    return (
        <Layout>  
            <DashboardLayout>
                <h2>  Create Role  </h2>
                <form action='' method='post' onSubmit={handleSubmit}>
              
                    <div className="form-group mb-4">
                        <label htmlFor="type_name" className='form-label'> Role Name </label>
                        <input type="text" name="type_name" id="" value={name} className="form-control" onChange={ (e) => { setName(e.target.value) }}  />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="event_venue" className='form-label'> Event Venue </label>
                        <select className="form-control mb-4" name="event_venue" id="event_venue" onChange={handleOptionSelect} multiple>
                            { 
                            permissions.length > 0  ? (
                                permissions.map( ( item ) =>{
                                return (
                                    <option value={item.name}>
                                    { item.name }
                                    </option>
                                )
                                })
                            ) : ''
                            }
                        </select>
                    </div> 
        
                    <div className="form-group">
                        <button className="btn btn-primary" type='submit'> Submit </button>
                    </div>
        
                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default CreateRole