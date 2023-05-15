import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createPermission } from '@/store/slices/permission'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { protectRoute } from '@/components/protectRoute';
import { permissionvalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';

const CreatePermission = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(permissionvalidationSchema)});

    const onSubmit = (data) => {
        console.log(data);
        try {
            let resultAction = dispatch(createPermission(data.name));
            unwrapResult(resultAction)
            router.push('/dashboard/permissions')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Layout>  
            <DashboardLayout>
                <h2>  Create Permission  </h2>
                <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
                    <CustomInput register={register} label="Permission Name" name="name" errors={errors}  />
                    <div className="form-group">
                        <button disabled={!isValid} className="btn btn-primary" type='submit'> Submit </button>
                    </div>
                </form> 
            </DashboardLayout>
        </Layout>
    )
}

export default protectRoute(CreatePermission)