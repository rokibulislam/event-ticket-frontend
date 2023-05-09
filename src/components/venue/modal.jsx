import React from 'react'
import { Modal } from 'antd'
import VenuecreateForm from './createForm';


const VenueModal = ( props ) => {
    console.log(props.isopen);
    const handleOk = () => {
        props.setIsOpen(false)
    }

    const handleCancel =  () => {
        props.setIsOpen(false)
    }

    const onSubmit = (data ) => {
        console.log(data);
    }

    return (
        <div>
            <Modal title="Basic Modal" open={false}>
                <VenuecreateForm onSubmit={onSubmit}/>
            </Modal>
        </div>
    )
}

export default VenueModal