import React from 'react'

const Notification = ({ notification }) => {
    return notification === '' ?
    (<></>) :
    (
        <div>
            <p>{ notification }</p>
        </div>)
}

export default Notification