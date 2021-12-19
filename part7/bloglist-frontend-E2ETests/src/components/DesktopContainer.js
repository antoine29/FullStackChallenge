import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
  Dropdown
} from 'semantic-ui-react'
import { useActualPath } from '../utils/utils'
import { setUser } from '../reducers/userReducer'
import AddBlogForm from './AddBlogForm'
import Notification from './Notification'

const DesktopContainer = ({ children, Media }) => {
  const currentPath = useActualPath()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [open, setOpen] = useState(false)

  const logout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    history.push('/signin')
  }

  return (
    <Media greaterThan='mobile'>
      <AddBlogForm openedCreateBlogForm={open} openCreateBlogForm={setOpen} />
      {currentPath !== '/signin' && currentPath !== '/signup' &&
      <Container>
        <Menu
          fixed='top'
          size='large'
          inverted>
          <Container>
            <Dropdown item simple text='Blogs' onClick={() => { history.push('/blogs') }}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {setOpen(true)}}>Add blog</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              as='a'
              active={currentPath === '/users'}
              onClick={() => { history.push('/users') }}> Users
            </Menu.Item>
            {user ?
            <Menu.Item position='right'>
              <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar />
              <span>
                <Dropdown
                  // item
                  // simple
                  inline
                  text={user === null ? '' : user.name}>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Logout' onClick={logout} />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </Menu.Item>:
            <Menu.Item
              position='right'
              as='a'
              onClick={() => {
                console.log("hii")
                history.push('/signin')
              }}> Sign in
            </Menu.Item>}
          </Container>
        </Menu>
        {/* <HomepageHeading /> */}
      </Container>}
      <Container style={{ marginTop: '65px' }} inverted>
        {children}
        <Notification />
      </Container>
    </Media>
  )
}

export default DesktopContainer