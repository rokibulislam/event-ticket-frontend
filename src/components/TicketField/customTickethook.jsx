import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';

const CustomTickethook = ({ name, register }) => {
    const { control } = useForm({
      defaultValues: {
        [name]: [],
      },
    });
  
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });
  
    return (
      <div>
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
      </div>
    );
  };

export default CustomTickethook
