const initialState = null

let timeOutId = undefined
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setTimedNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        if(timeOutId !== undefined) clearTimeout(timeOutId)
        timeOutId = setTimeout(() => dispatch({
            type: 'SET_NOTIFICATION',
            notification: null
        }), time)
    }
}

export default notificationReducer