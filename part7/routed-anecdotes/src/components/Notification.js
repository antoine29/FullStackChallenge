import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
    return notification === '' ?
    (<></>) :
    (
        <div className='container'>
            <Alert variant='success'>{ notification }</Alert>
        </div>)
}

export default Notification