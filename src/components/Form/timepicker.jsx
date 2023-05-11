import React from 'react'
import { Controller } from "react-hook-form";
import { TimePicker  } from 'antd';

const CustomTimepicker = ( { control, label, name, errors }) => {
    return (
        <div className='form-group mb-4'>
            <label htmlFor={name} className='form-label'> {label} </label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TimePicker className="form-control" mode='time' onChange={ (time, timeString) => field.onChange(timeString)} />
                )}
            />
            {errors[name] && <span style={{ color: 'red' }}> { errors[name]?.message }  </span>}
        </div>
    )
}

export default CustomTimepicker