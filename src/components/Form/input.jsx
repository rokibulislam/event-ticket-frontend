import React from 'react'

const CustomInput = ( { register, name, label, errors, ...rest } ) => {
  return (
    <div className="form-group mb-4">
        <label htmlFor={name} className='form-label'> {label} </label>
        <input {...register(name)}  type="text" id={name} className="form-control" {...rest} />
        {errors[name] && <span style={{ color: 'red' }}> { errors[name]?.message }  </span>}
    </div>
  )
}

export default CustomInput