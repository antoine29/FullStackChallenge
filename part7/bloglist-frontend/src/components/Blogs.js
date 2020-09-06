import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getBlogs, likeBlog } from '../reducers/blogsReducer'
import { List } from 'semantic-ui-react'
import Blog from './Blog'
import ResponsiveContainer from './ResponsiveContainer'

const Blogs = ({ blogs, getBlogs, likeBlog }) => {

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <ResponsiveContainer>
      <List>
      {blogs
        .map(blog =>
          <Blog blog={blog} key={blog.id}/>
          )
      }
      </List>
    </ResponsiveContainer>
  )
}
  

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  getBlogs,
  likeBlog
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs