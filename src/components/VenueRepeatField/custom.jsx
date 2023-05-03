import React, { useState } from 'react';

function CustomVenueRepeatField( { fields, setFields} ) {

  function handleChange(i, event) {
    const values = [...fields];
    values[i][event.target.name] = event.target.value;
    console.log(values);
    setFields(values);
  }

  function handleAddField() {
    const values = [...fields];
    values.push({ name: '', price: '', qty: '', fee: '' });
    setFields(values);
  }

  function handleRemoveField(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (
    <>
        <table className='table'>
            <thead>
              <tr>
                <th> Category Name </th>
                <th> Price </th>
                <th> Fee </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
        {fields.map((field, i) => (
          <tr key={i}>
            <td>
            <input
              type="text"
              name={`name`}
              value={field[i]?.name}
              className='form-control'
              onChange={(e) => handleChange(i, e)}
              placeholder='Enter Ticket Type Name'
            />
            </td>
            <td>
            {/* <label htmlFor={`price-${i}`}>Price:</label> */}
            <input
              type="text"
              name={`price`}
              value={field[i]?.price}
              className='form-control'
              onChange={(e) => handleChange(i, e)}
              placeholder='Enter Ticket Price'
            />
            </td>
            <td>
            {/* <label htmlFor={`qty`}>Quantity:</label> */}
            <input
              type="text"
              name={`qty`}
              value={field[i]?.qty}
              className='form-control'
              onChange={(e) => handleChange(i, e)}
              placeholder='Enter Ticket Price'
            />
            </td>
            <td>
            {/* <label htmlFor={`fee`}>Fee:</label> */}
            <input
              type="text"
              name={`fee`}
              value={field[i]?.fee}
              className='form-control'
              onChange={(e) => handleChange(i, e)}
              placeholder='Enter Ticket Fee'
            />
          </td>
          <td>
            {fields.length > 1 && (
              <button className='btn btn-danger' type="button" onClick={() => handleRemoveField(i)}>
                Remove
              </button>
            )}
          </td>

          </tr>
        ))}
      </tbody>
    </table>
        <button className='btn btn-primary' type="button" onClick={handleAddField}>
          Add
        </button>
        <br/>
        </>
  );
}

export default CustomVenueRepeatField;