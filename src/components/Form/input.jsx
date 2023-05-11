import React from 'react'

const CustomInput = ( register, name, label, errors) => {
  return (
    <div className="form-group mb-4">
        <label htmlFor={name} className='form-label'> Event Name </label>
        <input {...register(name)} type="text" id="name" className="form-control" />
        {errors[name] && <span style={{ color: 'red' }}> { errors[name]?.message }  </span>}
    </div>
  )
}

export default CustomInput