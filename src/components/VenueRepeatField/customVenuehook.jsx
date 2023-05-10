import React from 'react'
import { Switch } from 'antd';
import {  useFieldArray } from "react-hook-form";
import { CloseOutlined,PlusOutlined } from '@ant-design/icons';

const CustomVenuehook = ( { Controller, name , control, register, setValue, watch }) => {
    const { fields, append, remove } = useFieldArray({ control, name: name });

    const watchedField = watch(name);
    // console.log(watchedField);
    return (
    <>
        {fields.map((field, index) => (
            <>
            
            <div className='row' key={index}>
              
              <div className='col-md-4'>
                <label htmlFor="" className="form-label"> Category Name {field.showSubPrice} </label>
                <input
                  className='form-control'
                  type="text"
                  {...register(`venuetickets.${index}.name`,{ required: true })}
                />
              </div>

              { !watchedField[index]?.showSubPrice && (
                <>
                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Price </label>
                        <input
                        className='form-control'
                        type="text"
                        {...register(`venuetickets.${index}.price`,{ required: true })}
                        value={field.price}
                        />
                    </div>

                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Fee </label>
                        <input
                        className='form-control'
                        type="text"
                        {...register(`venuetickets.${index}.fee`,{ required: true })}
                        value={field.fee}
                        />
                    </div>

                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Qty </label>
                        <input
                        className='form-control'
                        type="text"
                        {...register(`venuetickets.${index}.qty`,{ required: true })}
                        value={field.qty}
                        />
                    </div>
                </>
            )}

            <div className='col-md-2'>
              <label htmlFor="" className="form-label"> Add Subprice </label>
              <Switch  onChange={ (e) => {
                console.log('mojaloss')
                setValue(`venuetickets.${index}..showSubPrice`, !field.showSubPrice) 
              }} />

            </div>
            
            {fields.length > 1 && (
                <div className='col-md-2'>
                    <CloseOutlined onClick={() => remove(index)} className='btn-danger' />
                </div>
            )}
            
            </div>

            { watchedField[index]?.showSubPrice && (
                
            <>
                {field.subprices.map((address, addressIndex) => (
                    <>
                    <div className="row" key={addressIndex}>
                        <div className="col-md-3">
                            <label htmlFor="" className="form-label"> Price Level Name </label>
                            <input
                            className='form-control'
                            type="text"
                            name={`name-${index}-${addressIndex}`}
                            />
                        </div>
                        <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Ticket Price </label>
                        <input
                            className='form-control'
                            type="text"
                            name={`price-${index}-${addressIndex}`}
                        />
                        </div>
                        <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Service Fee </label>
                        <input
                            className='form-control'
                            type="text"
                            name={`fee-${index}-${addressIndex}`}
                        />
                        </div>

                        <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Qty </label>
                        <input
                            className='form-control'
                            type="text"
                            name={`qty-${index}-${addressIndex}`}
                        />
                        </div>
                        
                        
                        {/* <div className='col-md-2'>
                            <label htmlFor="" className="form-label"> Box Office </label>
                            <Switch  onChange={ (e) => handleNestedFieldChange(index, addressIndex, 'boxoffice', !field.boxoffice)} />
                        </div> */}

                        <div className="col-md-1">
                            <CloseOutlined onClick={() => handleRemoveNestedField(index, addressIndex)}/>
                        </div>
                    </div>
                    </> 
                ))}

                <button className='btn btn-create' style={{ maxWidth: '200px' }} type="button"> <PlusOutlined /> Add SubPrice </button>
            </>
            ) }  

        </>
    
        ))}

        
        <button type="button" className='btn btn-create' onClick={() => append({ 
            name: '',
            price: '',
            fee: '',
            showSubPrice: false,
            subprices: [
            { name: '', price: '', fee: '' }
            ]
        })}> Add Venue Ticket </button>
    </>
    )
}

export default CustomVenuehook