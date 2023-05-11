import React, { useEffect } from 'react'
import { Switch } from 'antd';
import {  useFieldArray } from "react-hook-form";
import { CloseOutlined,PlusOutlined } from '@ant-design/icons';
import { Radio, Select } from 'antd';

const CustomTickethook = ({ Controller, name, control, register, setValue, watch, errors, values= [] }) => {
    const { fields, append, remove } = useFieldArray({ control, name, defaultValues: [
      { ticketName: '', ticketPrice: '', ticketQty: '', showSettings: false, settings: {
        canbepurchase: 0,
        description: '',
        minimumticketperorder: 0,
        maximumticketperorder: 0,
        serviceFee: 0,
      }  }

    ] });
    const watchedField = watch(name);

    useEffect(() => {
      // if( values.length > 0 ) {
      //     values.forEach((item) => append(item))
      // }
    }, [values]);

    console.log("errors");
    console.log(errors.tickets)

    return (
    <>
      {/* <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              name={`${name}[${index}].name`}
              defaultValue={field.name}
              ref={register()}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: '' })}>
          Add Field
        </button>
      </div> */}

      
      <table className='table'>
            <thead>
              <tr>
                {/* <th> Ticket Type </th> */}
                <th> Ticket Name </th>
                <th> Ticket Price</th>
                <th> Ticket Qty </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <>
                <tr key={field.id}>
                  <td>
                    <input
                      className='form-control'
                      type="text"
                      placeholder="Ticket Name"
                      {...register(`${name}.${index}.ticketName`,{ required: true })}
                    />
                    {errors.tickets && errors.tickets[index]?.ticketName && (
                     <span style={{ color: 'red' }}> {errors.tickets[index]?.ticketName?.message} </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Ticket Price"
                      {...register(`${name}.${index}.ticketPrice`,{ required: true })}
                    />
                    {errors.tickets && errors.tickets[index]?.ticketPrice && (
                      <span style={{ color: 'red' }}> {errors.tickets[index]?.ticketPrice?.message} </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Ticket Quantity"
                      {...register(`${name}.${index}.ticketQty`,{ required: true })}
                    />
                    {errors.tickets && errors.tickets[index]?.ticketQty && (
                      <span style={{ color: 'red' }}> {errors.tickets[index]?.ticketQty?.message} </span>
                    )}
                  </td>
                  <td> 
                  <button onClick={ e => {
                    e.preventDefault();
                    setValue(`tickets.${index}..showSettings`, true); 
                  }} className='btn'> Settings  </button> </td>
                  <td>
                  {fields.length > 1 && (
                    <CloseOutlined onClick={() => remove(index)} className='btn-danger' />
                  )}
                  </td>
                </tr>

                { watchedField[index]?.showSettings && (
                  <>
                        <tr>
                          <td className='form-group' colSpan="4">
                              <label htmlFor="" className="form-label"> Ticket Description </label>
                              <textarea type='text' className='form-control' placeholder="Enter ticket Description"  
                              {...register(`${name}.${index}.settings.description`)}> </textarea>
                          </td>
                        </tr>

                        <tr>
                          <td className='form-group'>
                              <label htmlFor="" className="form-label"> TICKET CAN BE PURCHASED  </label> <br/>
                              <Controller
                                control={control}
                                name={`${name}.${index}.settings.canbepurchase`}
                                render={({ field }) => (
                                  <Select
                                    style={{ width: 220 }}
                                    onChange={ (value ) => field.onChange(value) }
                                    options={[
                                      { value: 0, label: 'By Attendaees and Staff'},
                                      { value: 1, label: 'Attendaees Only'},
                                      { value: 2, label: 'Staff Only'},
                                      { value: 3, label: 'Disable'},
                                    ]}
                                  />
                                )}
                              />
                          </td>
                        </tr>

                        <tr>
                            <td className='form-group' colSpan="1">
                              <label htmlFor="" className='form-label'> Minimum Tickets Per Order </label>
                              <input type="text" className='form-control' {...register(`${name}.${index}.settings.minimumticketperorder`)} id="" />
                            </td>
                            <td className='form-group' colSpan="2">
                              <label htmlFor="" className='form-label'> MAXIMUM TICKETS PER ORDER </label>
                              <input type="text" className='form-control'{...register(`${name}.${index}.settings.maximumticketperorder`)} id="" />
                            </td>
                        </tr>

                        <tr>
                          <td className='form-group'>
                              <label htmlFor="" className='form-label'> DO YOU WANT TO CHARGE YOUR TICKET BUYERS A SERVICE FEE? </label> 
                              <Controller
                                control={control}
                                name={`${name}.${index}.settings.serviceFee`}
                                render={({ field }) => (
                                  <Radio.Group onChange={ (e) => field.onChange(e.target.value)} className='form-control'>
                                    <Radio value={0}> Absorb fee: Ticketing fees will be charged to your credit card on files </Radio>
                                    <Radio value={1}> Pass ticketing fees and credit card processing fees to the buyer </Radio>
                                    <Radio value={2}> Charge a custom fee </Radio>
                                  </Radio.Group>
                                )}
                              />
                          </td>
                        </tr>
                        
                        <button className='btn' onClick={ (e) => { 
                          e.preventDefault();
                          setValue(`tickets.${index}..showSettings`, false); 
                        }}> 
                          <CloseOutlined /> Close Settings 
                        </button>
                  </>
                )}
                </>
              ))}
            </tbody>
          </table>
          
          <button type="button" className='btn btn-create' onClick={() => append({ ticketName: '', ticketPrice: '', ticketQty: ''  })}> Add Ticket </button> <br/>
    </>
    );
  };

export default CustomTickethook
