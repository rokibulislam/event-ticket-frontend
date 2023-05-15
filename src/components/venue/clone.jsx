import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { cloneSeatsIoChartData, getSeatsIoChartData } from '@/store/slices/event';
import CustomInput from '@/components/Form/input';

const Venueclone = ( { id, setClone }) => {
    let dispatch = useDispatch();
    let { handleSubmit, register, formState: { errors } } = useForm();
    let chartImage = useSelector( state => state.event.chartImage )
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getSeatsIoChartData('44db2f75-d305-48fc-9855-b33c1f53e0b3'));
    }, [dispatch, id])
    
    const onSubmit = () => {
        try {
            // dispatch(cloneSeatsIoChartData({
            //     'copyVenueId' : id,
            //     // 'eventIdentifier' : "b70fab15-01e0-497c-8dda-06f3b66539ab",
            //     // 'nickName' : "chittagong with new chart"
            // }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <h2> VenueClone {id} </h2>
        <img src={chartImage.publishedVersionThumbnailUrl} />
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput register={register} label="Nickname" name="nickname" placeholder="Enter Nickname" errors={errors}  />
            <button type='submit' className='btn btn-primary'> Clone The Chart </button>
        </form>

    </>
    )
}

export default Venueclone