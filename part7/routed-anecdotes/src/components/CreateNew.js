import React from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../customHooks/'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })

        props.setNotification(`a new anecdote '${content.value}' created!`)
        history.push('/')
        setTimeout(() => props.setNotification(''), 10000)
    }

    const handleReset = () => {
        content.setValue('')
        author.setValue('')
        info.setValue('')
    }

    const filterInputProps = fieldHook => {
        const {setValue, ...props} = fieldHook
        return props
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...filterInputProps(content)}/>
                </div>
                <div>
                    author
                    <input {...filterInputProps(author)}/>
                </div>
                <div>
                    url for more info
                    <input {...filterInputProps(info)} />
                </div>
                <button>create</button>
                <button type='button' onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew