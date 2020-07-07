import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogIn }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
		
	const handleSetUser = event => {
		event.preventDefault()
		handleLogIn(username, password)
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={ handleSetUser }>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={ ({ target }) => setUsername(target.value)}/>
					</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={ ({ target }) => setPassword(target.value) }/>
					</div>
				<button type="submit">login</button>
			</form>
		</div>)
}

LoginForm.propTypes = {
	handleLogIn: PropTypes.func.isRequired
}

export default LoginForm