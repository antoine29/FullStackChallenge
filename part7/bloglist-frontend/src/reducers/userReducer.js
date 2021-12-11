import { getUserFromLocalStorage } from "../utils/utils"

const initialState = getUserFromLocalStorage() !== null ?
  JSON.parse(getUserFromLocalStorage()) : null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    user
  }
}

export const reloadUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  let user = null
  if (loggedUserJSON)
    user = JSON.parse(loggedUserJSON)

  return {
    type: 'SET_USER',
    user
  }
}

export default userReducer