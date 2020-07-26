import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  test('Submiting the form with some input values will call the event handler with the input values', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const authorInput = component.container.querySelector('.authorInput')
    const titleInput = component.container.querySelector('.titleInput')
    const urlInput = component.container.querySelector('.urlInput')
    const form = component.container.querySelector('.blogForm')

    let blog = {
      author: 'author0',
      title: 'title0',
      url: 'url0'
    }

    fireEvent.change(authorInput, {
      target: { value: blog.author }
    })
    fireEvent.change(titleInput, {
      target: { value: blog.title }
    })
    fireEvent.change(urlInput, {
      target: { value: blog.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
  })
})