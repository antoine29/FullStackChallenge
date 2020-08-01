import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import { setUser } from '../reducers/userReducer'

const Header = ({user, setUser}) => {
    const history = useHistory();
    const logout = () => {
        window.localStorage.clear()
        setUser(null)
        history.push('/login')
    }
    const padding = {
        paddingRight: 5
    }
    return(
        <div>
            <h1>Blog List</h1>
            <div>
                <Link to='/' style={padding}>Blogs</Link>
                <Link to='/users' style={padding}>Users</Link>
                {/* <Link to='/about' style={padding}>about</Link> */}
                {user !== null &&
                <p> {user.name} logged-in
                    <button
                        type="submit"
                        onClick={() => logout()}
                    >logout
                    </button>
                </p> }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    setUser
}

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)
export default ConnectedHeader