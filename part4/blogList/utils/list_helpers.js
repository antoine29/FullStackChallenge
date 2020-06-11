const _ = require('lodash')
const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs =>
	blogs.reduce((mostLikedBlog, blog) => blog.likes > mostLikedBlog.likes? blog : mostLikedBlog, blogs[0])

const mostBlogs = blogs => {
	if (blogs.length === 0) return {}
	const authorGrouped = _.reduce(blogs, (result, blog) => {
		(result[blog.author] || (result[blog.author] = [])).push(blog)
		return result
	}, {})

	const values = _.values(authorGrouped)
	return _.reduce(values, (author, group) =>
		group.length > author.blogs ?
			{ author: group[0].author, blogs: group.length } : author, { author: values[0][0].author, blogs: values[0].length })
}

const mostLikes = blogs => {
	if (blogs.length === 0) return {}
	const likesCounted = _.reduce(blogs, (result, blog) => {
		result[blog.author] !== undefined ?
			result[blog.author] += blog.likes : result[blog.author] = blog.likes
		return result
	}, {})

	return _.reduce(_.values(likesCounted), (max, author, index) =>
		author > max.likes ? { author: _.keys(likesCounted)[index], likes: author } : max, { author: 'undefined', likes: 0 })
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}