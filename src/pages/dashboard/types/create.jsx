import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { createEventType } from '@/store/slices/eventtype'
import { useForm } from "react-hook-form";
import { protectRoute } from '@/components/protectRoute';
import { yupResolver } from "@hookform/resolvers/yup";
import { typevalidationSchema } from '@/validation';
import CustomInput from '@/components/Form/input';
import { unwrapResult } from '@reduxjs/toolkit';

const TypesCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(typevalidationSchema)});
  
  const onSubmit = (data) => {
    try {
      let resultAction = dispatch(createEventType(data.name));
      unwrapResult(resultAction);
      router.push('/dashboard/types')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout> 
        <DashboardLayout> 
        <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
            <CustomInput register={register} label="Type Name" name="name" errors={errors}  />
            <div className="form-group">
              <button className="btn btn-primary"> Submit </button>
            </div>
        </form>
        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(TypesCreate)