import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
    const padding = {
        paddingRight: 5
    }
    return(
        <div>
            <h1>Blog List</h1>
            <div>
                <Link to='/' style={padding}>Blog list</Link>
                <Link to='/users' style={padding}>users</Link>
                {/* <Link to='/about' style={padding}>about</Link> */}
            </div>
        </div>
    )
}

export default Header