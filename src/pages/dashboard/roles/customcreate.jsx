import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createRole } from '@/store/slices/role'
import { getPermissions } from '@/store/slices/permission'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType, array } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';

let validationSchema = object({
  name: string().required().label("Name"),
  permissions: array().required().label("Permissions"),
});

const CreateRole = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dispatch = useDispatch();
    let router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
    const permissions =  useSelector( state => state.premission.items );

    useEffect( () => {
        dispatch(getPermissions())
    },[dispatch])

    const handleOptionSelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selectedOptions);
    }
    
    const onSubmit = (data) => {
        console.log(data);
        dispatch(createRole( { 
            name: data.name,
            permissions: selectedOptions
        }));
    };

  return (
    <Layout> 
      <DashboardLayout>        
          <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Role Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="permissions" className='form-label'> Event Venue </label>
                <select className="form-control mb-4" {...register('permissions', { required: true })} id="permissions" onChange={handleOptionSelect} multiple>
                    { 
                    permissions.length > 0  ? (
                        permissions.map( ( item ) =>{
                        return (
                            <option key={item.id} value={item.name}>
                            { item.name }
                            </option>
                        )
                        })
                    ) : ''
                    }
                </select>
            </div> 
  
              <div className="form-group">
                  <button disabled={!isValid} className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
      </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CreateRole)