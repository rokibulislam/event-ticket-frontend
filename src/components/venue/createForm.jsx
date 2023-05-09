import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 

let validationSchema = object({
    name: string().required('Name Field Is Required').label("name"),
    nickname: string().required('Nickname Field Is Required').label("nickname"),
    postcode: string().required('Postcode Field Is Required').label("postcode"),
    country: string().required().label("country"),
    city: string().required().label("city"),
});

const VenuecreateForm = ( { onSubmit }) => {
    
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
    
    return (
        <div>
            <form action='' method='post' onSubmit={handleSubmit(onSubmit)}>    
                <div className="form-group mb-4">
                    <label htmlFor="name" className='form-label'> Venue Name </label>
                    <input {...register('name')} type="text" id="name" className="form-control"/>
                    {errors.name && <span style={{ color: 'red' }}> { errors.name?.message }  </span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="nickname" className='form-label'> Venue Nickname </label>
                    <input {...register('nickname')} type="text" id="nickname" className="form-control"/>
                    {errors.nickname && <span style={{ color: 'red' }}> { errors.nickname?.message }  </span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="postcode" className='form-label'> PostCode </label>
                    <input {...register('postcode')} type="text" id="postcode" className="form-control"/>
                    {errors.postcode && <span style={{ color: 'red' }}> { errors.postcode?.message }  </span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="country" className='form-label'> Country </label>
                    <input {...register('country', { required: true })}  type="text" name="country" id="country" className="form-control"/>
                    {errors.country && <span style={{ color: 'red' }}> { errors.country?.message }  </span>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="state" className='form-label'> State </label>
                    <input {...register('state')} type="text" name="state" id="state" className="form-control"/>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="city" className='form-label'> City </label>
                    <input {...register('city')}  type="text" name="city" id="city" className="form-control"/>
                    {errors.city && <span style={{ color: 'red' }}> { errors.city?.message }  </span>}
                </div>

                <div className="form-group">
                    <button disabled={!isValid}  className="btn btn-primary"> Submit </button>
                </div>
            
            </form>

        </div>
    )
}

export default VenuecreateForm