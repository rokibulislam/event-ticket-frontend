import React from 'react'
import { Controller } from "react-hook-form";
import {  Radio } from 'antd';
const CustomRadio = ({ control, label, name, options, errors }) => {
  return (
    <>
        <label htmlFor="" className='form-label'> {label} </label> 
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control'>
                    { options.length > 0 && ( options.map( item =>  <Radio value={item.value}> { item.label } </Radio> ))}
                </Radio.Group>
            )}
        />
    </>
  )
}

export default CustomRadio