import React from 'react'
import { Switch } from 'antd';
import {  useFieldArray } from "react-hook-form";
import { CloseOutlined,PlusOutlined } from '@ant-design/icons';

const CustomVenuehook = ( { Controller, name , control, register, setValue, watch, errors }) => {
    const { fields: rawFields, append, remove, insert, update } = useFieldArray({ control, name: name });

    const watchedField = watch(name);

    const fields = rawFields.map((field, index) => {
        return {
          ...field,
          ...watchedField[index]
        };
      });
    // console.log(watchedField);
    console.log(errors);

    const addSubprice = (index, object ) => {
        // console.log('add Subprice',  fields[index].subprices.push({ name: '', price: '', fee: '' }) );
        // console.log(watchedField);
        update(index,  fields[index].subprices.push({ name: '', price: '', fee: '' }) )
        console.log(watchedField);
    }

    const handleRemoveNestedField = (index, addressIndex) => {
        console.log(index);
        console.log(addressIndex);
    }

    return (
    <>
        {fields.map((field, index) => (
            <>
            
            <div className='row' key={index}>
              
              <div className='col-md-2'>
                <label htmlFor="" className="form-label"> Category Name {field.showSubPrice} </label>
                <input
                  className='form-control'
                  type="text"
                  {...register(`venuetickets.${index}.name`,{ required: true })}
                />
                {errors.venuetickets && errors.venuetickets[index]?.name && (
                     <span style={{ color: 'red' }}> {errors.venuetickets[index]?.name?.message} </span>
                )}
              </div>

              { !watchedField[index]?.showSubPrice && (
                <>
                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Price </label>
                        <input
                        className='form-control'
                        type="text"
                        {...register(`venuetickets.${index}.price`)}
                        value={field.price}
                        />
                        {errors.venuetickets && errors.venuetickets[index]?.price && (
                            <span style={{ color: 'red' }}> {errors.venuetickets[index]?.price?.message} </span>
                        )}
                    </div>

                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Fee </label>
                        <input
                        className='form-control'
                        type="text"
                        {...register(`venuetickets.${index}.fee`)}
                        value={field.fee}
                        />
                        {errors.venuetickets && errors.venuetickets[index]?.fee && (
                            <span style={{ color: 'red' }}> {errors.venuetickets[index]?.fee?.message} </span>
                        )}
                    </div>

                    <div className='col-md-2'>
                        <label htmlFor="" className="form-label"> Qty </label>
                        <input
                            className='form-control'
                            type="text"
                            {...register(`venuetickets.${index}.qty`)}
                            value={field.qty}
                        />
                        {errors.venuetickets && errors.venuetickets[index]?.qty && (
                            <span style={{ color: 'red' }}> {errors.venuetickets[index]?.qty?.message} </span>
                        )}
                    </div>
                </>
            )}

            <div className='col-md-2'>
              <label htmlFor="" className="form-label"> Add Subprice </label>
              <Switch  onChange={ (value) => {
                console.log('mojaloss')
                setValue(`venuetickets.${index}..showSubPrice`, value) 
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

                <button className='btn btn-create' style={{ maxWidth: '200px' }} type="button" onClick={ () => addSubprice(index) }> <PlusOutlined /> Add SubPrice </button>
            </>
            ) }  

        </>
    
        ))}

        <br />
        
        <button type="button" className='btn btn-create' onClick={() => append({ 
            name: '',
            price: '',
            fee: '',
            qty: '',
            showSubPrice: false,
            subprices: [
            { name: '', price: '', fee: '' }
            ]
        })}> Add Venue Ticket </button>
    </>
    )
}

export default CustomVenuehook