const _ = require('lodash')
const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs =>
	blogs.reduce((mostLikedBlog, blog) => blog.likes > mostLikedBlog.likes? blog : mostLikedBlog, blogs[0])

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}