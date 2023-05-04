import { getTicketTypes } from '@/store/slices/tickettype';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CustomTicketRepeatField({ fields, setFields, handleTicketeChange, handleTicketAddField, handleTicketRemoveField }) {
    let dispatch = useDispatch();
    const tickettypes =  useSelector( state => state.tickettype.items );

    useEffect( () => {
        dispatch(getTicketTypes());
    }, [dispatch])
        
    return (
    <>
        <table className='table'>
            <thead>
              <tr>
                <th> Ticket Type </th>
                <th> Ticket Name </th>
                <th> Qty </th>
                <th> Ticket Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
        {fields.map((field, i) => (
          <tr key={i}>
            <td>         
                { tickettypes.length > 0 ? (
                    <select className='form-control' name='ticket_type' onChange={ (e) => handleTicketeChange(i,e)}>
                        { tickettypes.map( item => <option value={item.id} key={item.id}> { item.name  } </option>) }
                    </select>
                ) : ''}
            </td>
            <td>
            {/* <label htmlFor={`price-${i}`}>Price:</label> */}
            <input
              type="text"
              name={`ticket_name`}
              value={field[i]?.price}
              className='form-control'
              onChange={(e) => handleTicketeChange(i, e)}
              placeholder='Enter Ticket Name'
            />
            </td>
            <td>
            {/* <label htmlFor={`qty`}>Quantity:</label> */}
            <input
              type="text"
              name={`ticket_qty`}
              value={field[i]?.qty}
              className='form-control'
              onChange={(e) => handleTicketeChange(i, e)}
              placeholder='Enter Ticket Qty'
            />
            </td>
            <td>
            {/* <label htmlFor={`fee`}>Fee:</label> */}
            <input
              type="text"
              name={`ticket_price`}
              value={field[i]?.fee}
              className='form-control'
              onChange={(e) => handleTicketeChange(i, e)}
              placeholder='Enter Ticket Price'
            />
          </td>
          <td>
            {fields.length > 1 && (
              <button className='btn btn-danger' type="button" onClick={() => handleTicketRemoveField(i)}>
                Remove
              </button>
            )}
          </td>

          </tr>
        ))}
      </tbody>
    </table>
        <button className='btn btn-primary' type="button" onClick={handleTicketAddField}>
          Add
        </button>
        <br/>
        </>
  );
}

export default CustomTicketRepeatField;