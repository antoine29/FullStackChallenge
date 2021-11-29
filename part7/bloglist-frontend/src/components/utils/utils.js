import { useLocation, useHistory } from 'react-router-dom'
import { setUser } from '../../reducers/userReducer'

export const useActualPath = () => {
  const location = useLocation()
  return location.pathname
}

export const useAppLogout = () => {
  const history = useHistory()
  window.localStorage.clear()
  setUser(null)
  history.push('/signin')
}