import React from 'react'
import { useDispatch } from 'react-redux'

const FilterForm = () => {
    let dispatch = useDispatch();
    
    const handleSubmit = () => {
        console.log('submit');
    }

    return (
        <div> 
            <h2> Filter Form </h2>
            <form>
                <button type='submit'> Filter </button>
            </form>
        </div>
    )
}

export default FilterForm