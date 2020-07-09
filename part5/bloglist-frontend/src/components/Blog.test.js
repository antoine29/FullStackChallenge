import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'author0',
      url: 'url0',
      likes: 0,
      user: {
        username: 'username0',
        id: 0
      }
    }
  })

  test('Blog component gets render', () => {
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('Initially only its title is rendered', () => {
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).not.toHaveTextContent(
      'author0'
    )
    expect(component.container).not.toHaveTextContent(
      'url0'
    )
    expect(component.container).not.toHaveTextContent(
      '0'
    )
  })

  test('Clicking the view button renders all the blog fields', () => {
    const component = render(
      <Blog blog={blog} />
    )
    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'author0'
    )
    expect(component.container).toHaveTextContent(
      'url0'
    )
    expect(component.container).toHaveTextContent(
      '0'
    )
  })

  test('Clicking the like button twice, calls event handler two times', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} setLikedBlog={mockHandler} />
    )
    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})