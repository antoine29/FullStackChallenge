import React from 'react'
import '../index.css'

const NotificationComponent = ({ message }) => {
	if (message === null)
		return null

	return (
		<div className="error">
			{message}
		</div>
	)
}

const ShowNotificationMessage = (message, timeOut, setNotificationMessage) => {
	setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage((null))
    }, timeOut);
}

export default {
	NotificationComponent, 
	ShowNotificationMessage
}