import DashboardLayout from '@/components/DashboardLayout'
import CustomTickethook from '@/components/TicketField/customTickethook'
import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { createTicketByEvents, getTicketsbyEvents } from '@/store/slices/tickets'

const EventTickets = () => {
  const dispatch = useDispatch();
  const { control, setValue, register, handleSubmit, watch, trigger, formState: { errors, isValid } } = useForm()
  const tickets =  useSelector( state => state.tickets.items );

  useEffect(() => {
     dispatch( getTicketsbyEvents() );
  })
    
  const onSubmit = data => {
    console.log(data);
    dispatch(createTicketByEvents());
  }

  return (
    <Layout>
        <DashboardLayout>
           <h2>  EventTickets </h2>
          <form action='' method='post' onSubmit={handleSubmit}>
            <CustomTickethook Controller={Controller} name="tickets" control={control} register={register} setValue={setValue} watch={watch} errors={errors} /> 
          </form>
        </DashboardLayout>
    </Layout>
  )
}

export default EventTickets