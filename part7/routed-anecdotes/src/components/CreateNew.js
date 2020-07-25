import React from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../customHooks/'
import { Table, Form, Button, FormGroup } from 'react-bootstrap'

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
            <h2>Create a new anecdote</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label>Content</Form.Label>
                    <Form.Control {...filterInputProps(content)}/>
                    <Form.Label>Author</Form.Label>
                    <Form.Control {...filterInputProps(author)}/>
                    <Form.Label>Url for more info</Form.Label>
                    <Form.Control {...filterInputProps(info)}/>
                    <Button variant='primary' type='submit'>create</Button>
                    <Button variant='primary' type='button' onClick={handleReset}>reset</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default CreateNew