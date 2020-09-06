import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import {
    Icon,
    Image,
    Menu,
    Sidebar,
    Container
} from 'semantic-ui-react'
import { useActualPath } from './utils/utils'
import { setUser, reloadUser } from '../reducers/userReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Notification from './Notification'

const MobileContainer = ({ children, Media }) => {
    const [sidebarOpened, setSidebarOpened] = useState(false)
    const [topBarHiden, setTopBarHiden] = useState(false)
    const closeSideBar = () => {
        setSidebarOpened(false)
        setTopBarHiden(false)
    }
    const openSideBar = () => {
        setSidebarOpened(true)
        setTopBarHiden(true)
    }
    const currentPath = useActualPath()
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [openedCreateBlogForm, openCreateBlogForm] = useState(false)

    useEffect(() => {
        dispatch(reloadUser())
        if (!user) {
            dispatch(setTimedNotification({type: 'INFO', message:'Session expired'}))
            history.push('/login')
        }
    }, [])

    const logout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        setSidebarOpened(false)
        history.push('/login')
    }

    return (
        <Media as={Sidebar.Pushable} at='mobile'>         
            {user && !topBarHiden &&
                <Container>
                    <Menu inverted fixed='top'>
                        <Menu.Item onClick={() => {
                            openSideBar()
                        }}>
                            <Icon name='sidebar' />
                        </Menu.Item>
                        <Menu.Item
                            position='right'
                            onClick={() => { openCreateBlogForm(true)}}>
                                <Icon name='add' />
                                Add blog
                        </Menu.Item>
                    </Menu>
                </Container>
            }         
            <BlogForm openedCreateBlogForm={openedCreateBlogForm} openCreateBlogForm={openCreateBlogForm} />
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
                        onClick={() => {closeSideBar()}}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar />
                        {user === null? '' : user.name}
                    </Menu.Item>
                    <Menu.Item
                        as='a'
                        onClick={() => {
                            closeSideBar()
                            history.push('/blogs')}}
                        active={currentPath === '/'}>
                        Blogs
                    </Menu.Item>
                    <Menu.Item
                        as='a'
                        onClick={() => {
                            closeSideBar()
                            history.push('/users')}}
                        active={currentPath === '/users'}>
                        Users
                    </Menu.Item>
                    <Menu.Item
                        as='div'
                        onClick={logout}>
                        Log out</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    {/*  */}
                    <Container style={{ marginTop: '50px'}}>
                        <Notification />
                        {children}
                    </Container>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Media>
    )
}

export default MobileContainer