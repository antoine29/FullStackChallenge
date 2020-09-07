import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, getBlogs } from '../reducers/blogsReducer'
import { Image, Card, Icon } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const increaseLikes = async blog => {
    await dispatch(likeBlog(blog))
    dispatch(getBlogs())
  }

  return blog !== null ?
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>
          <Link to={`/users/${blog.user.id}`}>
            {blog.user.name}
          </Link>
        </Card.Header>
        <Card.Description>
          {blog.title}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <span style={{ marginRight: 10 }}>
          <Icon name='thumbs up' onClick={() => { increaseLikes(blog) }} />{blog.likes} likes
        </span>
        <span onClick={() => { history.push(`/blogs/${blog.id}`) }}>
          <Icon name='comments' />{blog.comments.length} comments
        </span>
      </Card.Content>
    </Card>
    :
    <></>
}

export default Blog