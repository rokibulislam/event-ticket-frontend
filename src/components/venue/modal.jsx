import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'antd';
import VenuecreateForm from './createForm';
import { createVenue } from '@/store/slices/venue';


const VenueModal = ( { isModalOpen, setIsModalOpen } ) => {
    let dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (data) => {
        dispatch(createVenue(
            {
                name: data.name, 
                nickname: data.nickname,
                city: data.city,
                country: data.country,
                // state: stateId,
                country: data.country,
                state: data.state,
                postcode: data.postcode
            }
        ))
        setIsModalOpen(false)
    }

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> 
            <VenuecreateForm onSubmit={onSubmit}/>
        </Modal>
    );
};

export default VenueModal;