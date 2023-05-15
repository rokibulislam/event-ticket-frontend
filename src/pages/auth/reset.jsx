import DashboardLayout from '@/components/DashboardLayout'
import CustomInput from '@/components/Form/input'
import CustomPassword from '@/components/Form/password'
import { yupResolver } from "@hookform/resolvers/yup";

import Layout from '@/components/layout'
import React from 'react'
import { useForm } from 'react-hook-form'



const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting }, setError } = useForm();

  return (
    <Layout>
        <DashboardLayout>
            <h2> ResetPassword </h2>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              <CustomPassword label="New Password"  name="password" placeholder='New Password' />
              <CustomPassword label="Confirm Password"  name="confirmPassword" placeholder='Confirm Password' />
              <button type="submit">Reset Password</button>
            </form>
        </DashboardLayout>
    </Layout>
  )
}

export default ResetPassword