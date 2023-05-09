import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardLayout from '@/components/DashboardLayout'
import { getVenue, updateVenue } from '@/store/slices/venue'
import { protectRoute } from '@/components/protectRoute'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from 'yup'; 

let validationSchema = object({
  name: string().required().label("name"),
  nickname: string().required().label("nickname"),
  postcode: string().required().label("postcode"),
  country: string().required().label("country"),
  city: string().required().label("city"),
});

const EditVenue = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();
  const venues =  useSelector( state => state.venue.items );
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({resolver: yupResolver(validationSchema)});
  
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect( () => {
    if( id !== 'undefined') {
      const venue  = venues.find( item => item.id == id );
      setName(venue?.name);
      setNickname(venue?.nickname);
      setPostcode(venue?.postcode);
      setCountry(venue?.country);
      setState(venue?.state)
      setCity(venue?.city);
     // dispatch(getVenue(id))
    }
  },[dispatch, id])

  useEffect(() => {
    reset({
      name: name,
      nickname: nickname,
      postcode: postcode,
      country: country,
      state: state,
      city: city
    })
  }, [name,nickname,postcode,country,city, state])
  

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateVenue({
      id: id,
      name: data.name,
      nickname: data.nickname,
      city: data.city,
      country: data.country,
      state: data.state,
      postcode: data.postcode
    }))
    router.push('/dashboard/venue')
  }

  return (
    <Layout>
      <DashboardLayout>
        <h2> EditVenue </h2>
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
      </DashboardLayout>
    </Layout>
  )
}

export default protectRoute(EditVenue)