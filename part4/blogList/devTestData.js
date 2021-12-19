const bcrypt = require('bcrypt')
const User = require('./models/User')
const Blog = require('./models/Blog')

const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

const createdUsers = {}
const createdBlogs = {}

const insertUsers = async () => {
    const saltRounds = 5

    const user0HashedPass = await bcrypt.hash("user0", saltRounds)
    const user0 = new User({
        username: "user0",
        passwordHash: user0HashedPass,
    })
    const createdUser0 = await user0.save()
    createdUsers["user0"] = createdUser0
    console.log(createdUser0)

    const user1HashedPass = await bcrypt.hash("user1", saltRounds)
    const user1 = new User({
        username: "user1",
        passwordHash: user1HashedPass,
    })
    const createdUser1 = await user1.save()
    createdUsers["user1"] = createdUser1
    console.log(createdUser1)

    const user2HashedPass = await bcrypt.hash("user2", saltRounds)
    const user2 = new User({
        username: "user2",
        passwordHash: user2HashedPass,
    })
    const createdUser2 = await user2.save()
    createdUsers["user2"] = createdUser2
    console.log(createdUser2)
}

const insertBlogs = async () => {
    const user0Blog0 = new Blog({
        title: "user0 blog0",
        user: createdUsers["user0"]._id,
        likes: [createdUsers["user0"]._id, createdUsers["user1"]._id]
    })
    const createdUser0Blog0 = await user0Blog0.save()
    console.log(createdUser0Blog0)
    createdBlogs["user0blog0"] = createdUser0Blog0

    const user1Blog0 = new Blog({
        title: "user1 blog0",
        user: createdUsers["user1"]._id,
        likes: [createdUsers["user0"]._id]
    })
    const createdUser1Blog0 = await user1Blog0.save()
    console.log(createdUser1Blog0)
    createdBlogs["user1blog0"] = createdUser1Blog0

    const user2Blog0 = new Blog({
        title: "user2 blog0",
        user: createdUsers["user2"]._id
    })
    const createdUser2Blog0 = await user2Blog0.save()
    console.log(createdUser2Blog0)
    createdBlogs["user2blog0"] = createdUser2Blog0
}

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await insertUsers()
        await insertBlogs()
        //await insertReviews()
    })
    .catch(error => console.error('error connecting to MongoDB:', error.message))
    .finally(() => {
        process.exit(0)
    })
