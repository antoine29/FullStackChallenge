import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
    Dropdown
} from 'semantic-ui-react'
import { useActualPath } from './utils/utils'
import { setUser } from '../reducers/userReducer'

const DesktopContainer = ({ children, Media }) => {
    const [fixed, setFixed] = useState(false)
    const hideFixedMenu = () => setFixed(false)
    const showFixedMenu = () => setFixed(true)
    const currentPath = useActualPath()
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const logout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        history.push('/login')
    }

    return (
        <Media greaterThan='mobile'>
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}>
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 700, padding: '1em 0em' }}
                    vertical>
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'>
                        <Container>
                            <Link to='/'>
                                <Menu.Item as='div' active={currentPath === '/'}>
                                    Blogs
                                </Menu.Item>
                            </Link>
                            <Link to='/users'>
                                <Menu.Item as='div' active={currentPath === '/users'}>
                                    Users
                                </Menu.Item>
                            </Link>
                            <Menu.Item position='right'>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar />
                                <span>
                                    <Dropdown
                                        inline
                                        text={user === null? '' : user.name}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Logout' onClick={logout}/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                            </Menu.Item>
                        </Container>
                    </Menu>
                    {/* <HomepageHeading /> */}
                    {children}
                    <p>{currentPath}</p>

                </Segment>
            </Visibility>

        </Media>
    )
}

export default DesktopContainer