const bcrypt = require('bcrypt')
const User = require('../models/User')
const Blog = require('../models/Blog')

const plainInitialUsers = [
	{
		name: 'user0',
		username: 'user0',
		password: 'p0ssword'
	},
	{
		name: 'user1',
		username: 'user1',
		password: 'p1ssword'
	}
]

const initialUsers = async () => [
	{
		name: plainInitialUsers[0].name,
		username: plainInitialUsers[0].username,
		passwordHash: await bcrypt.hash(plainInitialUsers[0].password, 10)
	},
	{
		name: plainInitialUsers[1].name,
		username: plainInitialUsers[1].username,
		passwordHash: await bcrypt.hash(plainInitialUsers[1].password, 10)
	}
]

const initialBlogs = (userId0, userId1) => [
	{
		title: 'title0',
		author: 'author0',
		url: 'http://www.google.com',
		likes: 1,
		user: userId0
	},
	{
		title: 'title1',
		author: 'author1',
		url: 'http://www.google.com',
		likes: 2,
		user: userId1
	}
]

const usersInDB = async () => {
	const users = await User.find({}).populate('blogs', { user: 0, likes: 0 })
	return users
}

const blogsInDB = async () => {
	const blogs = await Blog.find({}).populate('user', { blogs : 0 })
	return blogs.map(blog => {
		let jsonBlog  = blog.toJSON()
		jsonBlog.id = jsonBlog.id.toString()
		jsonBlog.user.id = jsonBlog.user.id.toString()
		return jsonBlog
	})
}

const cleanUsersDB = async () => await User.deleteMany({})

const cleanBlogsDB = async () => await Blog.deleteMany({})

module.exports = {
	plainInitialUsers,
	initialUsers,
	initialBlogs,
	usersInDB,
	blogsInDB,
	cleanBlogsDB,
	cleanUsersDB
}