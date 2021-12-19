import { create, patch, _delete, getAll, like } from '../services/blogs'

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
    const newBlog = await create(blog, token)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

// ToDo: use axios interceptors to include the token automatically
export const likeBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const likedBlog = await like(blog.id, token)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const deleteBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    await _delete(blog.id, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs,
    })
  }
}

export default blogsReducer