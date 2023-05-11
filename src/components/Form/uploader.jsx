import React from 'react'
import {  Upload, Button } from 'antd';
import { Controller } from "react-hook-form";

const CustomUploader = ( { control, name, label, errors }) => {
  return (
    <div className="form-group mb-5" style={{ 'height': "150px"}}>
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Upload.Dragger 
                    multiple={false}
                    onChange= { info =>field.onChange(info.file) }
                >
                    Drag files here OR <br/>
                    <Button> Click Upload </Button>
                </Upload.Dragger>
            )}
        />
        {errors[name] && <span style={{ color: 'red' }}> { errors[name]?.message }  </span>}
    </div>
  )
}

export default CustomUploader