import React from 'react'
import { Controller } from "react-hook-form";
import { DatePicker } from 'antd';

const CustomDatepicker = ( { control, label, name, errors } ) => {
  return (
    <div className='form-group mb-4'>
        <label htmlFor={name} className='form-label'> {label} </label>
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <DatePicker className="form-control" onChange={ (date, dateString) => field.onChange(dateString)} />
            )}
        />
        {errors[name] && <span style={{ color: 'red' }}> { errors[name]?.message }  </span>}
    </div>
  )
}

export default CustomDatepicker