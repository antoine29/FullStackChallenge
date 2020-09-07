import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state
  case 'LIKE_BLOG':
    return state
  case 'DELETE_BLOG':
    return state
  case 'GET_BLOGS':
    return action.data.sort((a, b)  => b.likes - a.likes)
  default: return state
  }
}

export const createBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const newBlog = await blogsService.create(blog, token)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogsService.patch(blog.id, { likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const deleteBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    await blogsService._delete(blog.id, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs,
    })
  }
}

export default blogsReducer