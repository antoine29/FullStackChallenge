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
} from 'semantic-ui-react'
import { useActualPath } from './utils/utils'
import { setUser } from '../reducers/userReducer'

const MobileContainer = ({ children, Media }) => {
    const [sidebarOpened, setSidebarOpened] = useState(false)
    const closeSideBar = () => setSidebarOpened(false)
    const openSideBar = () => setSidebarOpened(true)
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
        <Media as={Sidebar.Pushable} at='mobile'>
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    onHide={closeSideBar}
                    visible={sidebarOpened}
                    inverted
                    vertical
                    width='thin'>
                    <Menu.Item
                        as='div'
                        onClick={closeSideBar}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar />
                        {user === null? 'l' : user.name}
                    </Menu.Item>
                    <Link to='/'>
                        <Menu.Item
                            as='div'
                            onClick={closeSideBar}
                            active={currentPath === '/'}>
                            Blogs
                        </Menu.Item>
                    </Link>
                    <Link to='/users'>
                        <Menu.Item
                            as='div'
                            onClick={closeSideBar}
                            active={currentPath === '/users'}>
                            Users
                        </Menu.Item>
                    </Link>
                    <Menu.Item
                        as='div'
                        onClick={logout}>
                        Log out</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical>
                        <Container>
                            {/* <Menu inverted pointing secondary closeSideBar='large'> */}
                            <Menu inverted pointing secondary>
                                <Menu.Item onClick={openSideBar}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                {/* <Menu.Item position='right'>
                                        <Button as='a' inverted>
                                            Log in
                                        </Button>
                                        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                            Sign Up
                                        </Button>
                                    </Menu.Item> */}
                            </Menu>
                        </Container>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Media>
    )
}

export default MobileContainer