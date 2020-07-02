const listHelper = require('../utils/list_helpers')

const blogs0 = []
const blogs1 = [
	{
		title: 'title0',
		author: 'author0',
		likes: 2
	}
]
const blogs2 = [
	{
		title: 'title0',
		author: 'author1',
		likes: 2
	},
	{
		title: 'title1',
		author: 'author0',
		likes: 2
	}
]
const blogs3 = [
	{
		title: 'title0',
		author: 'author0',
		likes: 2
	},
	{
		title: 'title1',
		author: 'author0',
		likes: 3
	},
	{
		title: 'title2',
		author: 'author2',
		likes: 3
	}
]

describe('dummy', () => {
	test('dummy returns one', () => {
		const result = listHelper.dummy(blogs0)
		expect(result).toBe(1)
	})
})

describe('total lkes', () => {
	test('when blog list has five total likes, ', () => {
		const result = listHelper.totalLikes(blogs2)
		expect(result).toBe(4)
	})

	test('when blog list is empty, ', () => {
		const result = listHelper.totalLikes(blogs0)
		expect(result).toBe(0)
	})

	test('when there is only one blog, ', () => {
		const result = listHelper.totalLikes(blogs1)
		expect(result).toBe(blogs1[0].likes)
	})
})

describe('favorite blog', () => {
	test('when favorite blog has 3 likes, ', () => {
		const result = listHelper.favoriteBlog(blogs3)
		expect(result).toEqual(blogs3[1])
	})

	test('when pass an empty blog list, ', () => {
		const result = listHelper.favoriteBlog(blogs0)
		expect(result).toEqual(undefined)
	})

	test('when there is only one blog, ', () => {
		const result = listHelper.favoriteBlog(blogs1)
		expect(result).toEqual(blogs1[0])
	})

	test('when there is more than one favorite blog, returns the first, ', () => {
		const result = listHelper.favoriteBlog(blogs3)
		expect(result).toEqual(blogs3[1])
	})
})

describe('mostBlogs', () => {
	test('when the blogest author has two blogs, ', () => {
		const result = listHelper.mostBlogs(blogs3)
		expect(result).toEqual({ author: 'author0', blogs: 2 })
	})

	test('when there is only one blog, ', () => {
		const result = listHelper.mostBlogs(blogs1)
		expect(result).toEqual({ author: 'author0', blogs: 1 })
	})

	test('when there is more than one blogued authors, returns the first ', () => {
		const result = listHelper.mostBlogs(blogs2)
		expect(result).toEqual({ author: 'author1', blogs: 1 })
	})

	test('when pass an empty array', () => {
		const result = listHelper.mostBlogs(blogs0)
		expect(result).toEqual({})
	})
})

describe('mostLikes', () => {
	test('when the most liked author has 5 likes, ', () => {
		const result = listHelper.mostLikes(blogs3)
		expect(result).toEqual({ author: 'author0', likes: 5 })
	})

	test('when there is only one blog, ', () => {
		const result = listHelper.mostLikes(blogs1)
		expect(result).toEqual({ author: 'author0', likes: 2 })
	})

	test('when there is more than most liked authors, returns the first ', () => {
		const result = listHelper.mostLikes(blogs2)
		expect(result).toEqual({ author: 'author1', likes: 2 })
	})

	test('when pass an empty array', () => {
		const result = listHelper.mostLikes(blogs0)
		expect(result).toEqual({})
	})
})