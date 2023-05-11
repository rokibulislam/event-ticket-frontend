import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import DashboardLayout from '@/components/DashboardLayout'
import Layout from '@/components/layout'
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 
import { updateTicketType } from '@/store/slices/tickettype';
import { protectRoute } from '@/components/protectRoute';
import { tickettypevalidationSchema } from '@/validation';

const CustomTicketType = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors, isValid } } =  useForm({resolver: yupResolver(tickettypevalidationSchema)});

    const tickettypes =  useSelector( state => state.tickettype.items );
    const [ name, setName ] = useState ('')
  
    useEffect( () => {
      if( id !== 'undefined' ) {
        const type  = tickettypes.find( item => item.id == id );
        setName(type.name);
      }
      // dispatch(getTicketType(id))
    },[dispatch, id])

    useEffect(() => {
      reset({
        name: name
      })
    }, [name])
    

    const onSubmit = (data) => {
        dispatch(updateTicketType({ 
          id: id, 
          name: data.name 
        } ));
        router.push('/dashboard/tickettype')
    };

  return (
    <Layout>
        <DashboardLayout>
            <h2> Custom Edit Ticket Type Create </h2>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group mb-4">
                <label htmlFor="name" className='form-label'> Ticket Type Name </label>
                <input {...register('name', { required: true })} type="text" id="name" className="form-control" />
                {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
              </div>
  
              <div className="form-group">
                  <button  className="btn btn-primary"> Submit </button>
              </div>
  
          </form> 
        </DashboardLayout> 
    </Layout>
  )
}

export default protectRoute(CustomTicketType)