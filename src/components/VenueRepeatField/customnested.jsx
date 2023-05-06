import React, { useState } from 'react';
import { Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

function CustomnestedVenueRepeatField( { fields, setFields }) {
    
    const handleAddField = () => {
        setFields([...fields, { 
          name: '',
          price: '',
          fee: '',
          qty: '',
          showSubPrice: false,
          subprices: [
            { name: '', price: '', fee: '', qty: '', boxoffice: false }
          ]
        }]);
    };
      
    const handleRemoveField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };
      
    const handleFieldChange = (index, field, value) => {
        const newFields = [...fields];
        newFields[index][field] = value;
        setFields(newFields);
        console.log(fields);
    };
      
    const handleAddNestedField = (index) => {
        const newFields = [...fields];
        newFields[index].subprices.push({ name: '', price: '', fee: '', qty: '', boxoffice: false  });
        setFields(newFields);
    };
      
    const handleRemoveNestedField = (index, addressIndex) => {
        const newFields = [...fields];
        newFields[index].subprices.splice(addressIndex, 1);
        setFields(newFields);
    };

    const handleNestedFieldChange = (index, addressIndex, field, value) => {
        const newFields = [...fields];
        newFields[index].subprices[addressIndex][field] = value;
        setFields(newFields);
        console.log(fields);
    }

    return (
      <>
          {fields.map((field, index) => (
            <div className='row' key={index}>
            
            <div className='row'>
              <div className='col-md-4'>
                <label htmlFor="" className="form-label"> Category Name </label>
                <input
                  className='form-control'
                  type="text"
                  name={`name-${index}`}
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
              </div>
            
            { !field.showSubPrice && (
              <>
              <div className='col-md-2'>
                <label htmlFor="" className="form-label"> Price </label>
                <input
                  className='form-control'
                  type="text"
                  name={`price-${index}`}
                  value={field.price}
                  onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                />
              </div>
              <div className='col-md-2'>
                <label htmlFor="" className="form-label"> Fee </label>
                <input
                  className='form-control'
                  type="text"
                  name={`fee-${index}`}
                  value={field.fee}
                  onChange={(e) => handleFieldChange(index, 'fee', e.target.value)}
                />
              </div>
              <div className='col-md-2'>
                <label htmlFor="" className="form-label"> Qty </label>
                <input
                  className='form-control'
                  type="text"
                  name={`qty-${index}`}
                  value={field.qty}
                  onChange={(e) => handleFieldChange(index, 'qty', e.target.value)}
                />
              </div>
              </>
            )  }

            <div className='col-md-2'>
              <label htmlFor="" className="form-label"> Add Subprice </label>
              <Switch  onChange={ (e) => handleFieldChange(index, 'showSubPrice', !field.showSubPrice)} />
            </div>
          
          {fields.length > 1 && (
            <div className='col-md-2'>
              <CloseOutlined onClick={() => handleRemoveField(index)}/>
            </div>
          )}
        
        </div>
        { field.showSubPrice && (
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
                          value={address.name}
                          onChange={(e) => handleNestedFieldChange(index, addressIndex, 'name', e.target.value)}
                        />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor="" className="form-label"> Ticket Price </label>
                      <input
                        className='form-control'
                        type="text"
                        name={`price-${index}-${addressIndex}`}
                        value={address.price}
                        onChange={(e) => handleNestedFieldChange(index, addressIndex, 'price', e.target.value)}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor="" className="form-label"> Service Fee </label>
                      <input
                        className='form-control'
                        type="text"
                        name={`fee-${index}-${addressIndex}`}
                        value={address.fee}
                        onChange={(e) => handleNestedFieldChange(index, addressIndex, 'fee', e.target.value)}
                      />
                    </div>

                    <div className='col-md-2'>
                      <label htmlFor="" className="form-label"> Qty </label>
                      <input
                        className='form-control'
                        type="text"
                        name={`qty-${index}-${addressIndex}`}
                        value={address.qty}
                        onChange={(e) => handleNestedFieldChange(index, addressIndex, 'qty', e.target.value)}
                      />
                    </div>
                    
                    
                    <div className='col-md-2'>
                      <label htmlFor="" className="form-label"> Box Office </label>
                      <Switch  onChange={ (e) => handleNestedFieldChange(index, addressIndex, 'boxoffice', !field.boxoffice)} />
                    </div>

                    <div className="col-md-1">
                      <CloseOutlined onClick={() => handleRemoveNestedField(index, addressIndex)}/>
                    </div>
                  </div>
                </> 
                ))}
       
                <button className='btn btn-primary' style={{ maxWidth: '200px' }} type="button" onClick={() => handleAddNestedField(index)}>
                   <PlusOutlined /> Add SubPrice
                </button>
            </>
        ) }        
            </div>

          ))}
          <br/>
          <button className='btn btn-primary' type="button" onClick={() => handleAddField()}> <PlusOutlined />  Add Field </button>
      </>
      );
}

export default CustomnestedVenueRepeatField;