import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createPermission } from '@/store/slices/permission'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { protectRoute } from '@/components/protectRoute';


let validationSchema = object({
    name: string().required().label("Name")
});

const CreatePermission = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});

    const onSubmit = (data) => {
        dispatch(createPermission(data.name));
        router.push('/dashboard/permissions')
    };

    return (
        <Layout>  
            <DashboardLayout>
                <h2>  Create Permission  </h2>
                <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
            
                    <div className="form-group mb-4">
                        <label htmlFor="name" className='form-label'> Permission Name </label>
                        <input {...register('name')} type="text" id="name" className="form-control" />
                    </div>

                    <div className="form-group">
                        <button disabled={!isValid} className="btn btn-primary" type='submit'> Submit </button>
                    </div>

                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(CreatePermission)