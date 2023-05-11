import React from 'react'
import { Select } from 'antd'

const CustomSelect = ( { Controller, control, name, label, options, errors, value } ) => {
  return (

    <div className="form-group mb-4">
        <label htmlFor={name} className='form-label'> { label } </label> <br/>
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Select
                    style={{ width: 220 }}
                    onChange={ (value ) => field.onChange(value) }
                    options={
                        options.map( ( item, i ) =>{
                            return { value: item.id, label: item.name }
                        })
                    }
                />
            )}
        />
        {errors[name] && <p style={{ color: 'red' }}> { errors[name]?.message }  </p>}
    </div>
  )
}

export default CustomSelect;