import React, { useState } from 'react';

function CustomnestedVenueRepeatField() {
    
    const [fields, setFields] = useState([
        { 
          name: '',
          age: '',
          addresses: [
            { street: '', city: '', state: '' }
          ]
        },
    ]);

    const [showNestedFields, setShowNestedFields] = useState(false);

    const handleAddField = () => {
        setFields([...fields, { 
          name: '',
          age: '',
          addresses: [
            { street: '', city: '', state: '' }
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
    };
      
    const handleAddNestedField = (index) => {
        const newFields = [...fields];
        newFields[index].addresses.push({ street: '', city: '', state: '' });
        setFields(newFields);
    };
      
    const handleRemoveNestedField = (index, addressIndex) => {
        const newFields = [...fields];
        newFields[index].addresses.splice(addressIndex, 1);
        setFields(newFields);
    };

    const handleNestedFieldChange = (index, addressIndex, field, value) => {
        const newFields = [...fields];
        newFields[index].addresses[addressIndex][field] = value;
        setFields(newFields);
    }

    return (
        <form>
          {fields.map((field, index) => (
            <div key={index}>
                <label htmlFor=""> name</label>
              <input
                type="text"
                name={`name-${index}`}
                value={field.name}
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
              />
              <label htmlFor=""> age </label>
              <input
                type="text"
                name={`age-${index}`}
                value={field.age}
                onChange={(e) => handleFieldChange(index, 'age', e.target.value)}
              />
        {
            showNestedFields && (
           <>
                {field.addresses.map((address, addressIndex) => (
                <div key={addressIndex}>
                    <label htmlFor=""> street </label>
                  <input
                    type="text"
                    name={`street-${index}-${addressIndex}`}
                    value={address.street}
                    onChange={(e) => handleNestedFieldChange(index, addressIndex, 'street', e.target.value)}
                  />
                    <label htmlFor=""> city </label>

                  <input
                    type="text"
                    name={`city-${index}-${addressIndex}`}
                    value={address.city}
                    onChange={(e) => handleNestedFieldChange(index, addressIndex, 'city', e.target.value)}
                  />
                  <label htmlFor=""> state </label>
                  <input
                    type="text"
                    name={`state-${index}-${addressIndex}`}
                    value={address.state}
                    onChange={(e) => handleNestedFieldChange(index, addressIndex, 'state', e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemoveNestedField(index, addressIndex)}>
                    Remove Address
                  </button>
                </div>
                ))}
       
                <button type="button" onClick={() => handleAddNestedField(index)}>
                    Add Address
                </button>
                <button type="button" onClick={() => handleRemoveField(index)}>
                    Remove Field
                </button>
            </>
        ) }
        <button onClick={(e) => {
            e.preventDefault();
            setShowNestedFields(!showNestedFields)
        }}> { showNestedFields ?  'Hide Addresses' : 'Show Addresses'}  </button>

        
            </div>

          ))}
          <button type="button" onClick={() => handleAddField()}>
            Add Field
          </button>
        </form>
      );
}

export default CustomnestedVenueRepeatField;