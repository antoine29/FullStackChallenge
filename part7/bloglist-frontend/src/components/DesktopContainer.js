import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
  Dropdown
} from 'semantic-ui-react'
import { useActualPath } from './utils/utils'
import { setUser } from '../reducers/userReducer'
import BlogForm from './BlogForm'
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
      <BlogForm openedCreateBlogForm={open} openCreateBlogForm={setOpen} />
      {user &&
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
              <Menu.Item as='a'
                active={currentPath === '/users'}
                onClick={() => { history.push('/users') }}>
                        Users
              </Menu.Item>
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
              </Menu.Item>
            </Container>
          </Menu>
          {/* <HomepageHeading /> */}
        </Container>}
      <Container style={{ marginTop: '65px' }} inverted>
        <Notification />
        {children}
      </Container>
    </Media>
  )
}

export default DesktopContainer