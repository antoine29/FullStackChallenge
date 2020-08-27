const Book = require('./models/Book')

const booksFilter = async args => {
    // genre filtering 
    let genreFilter = !args.genre ? {} : { genres: args.genre }
    let books = await Book.find(genreFilter).populate('author')
    // author filtering
    if (args.author) books = books.filter(book => book.author.name === args.author)
    
    return books
}

const allGenres = async() => {
    const result = await Book.aggregate(
        [
            {
                $group: { _id: null, arrayOfArrayGenres: { $push: '$genres' }}        
            },
            {
                $project: {
                    repeatedGenres: {
                        $reduce: {
                            input: "$arrayOfArrayGenres",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", "$$this"]}
                        }
                    }
                }
            },
            { $unwind: "$repeatedGenres"},
            { $group: { _id: null, genres: { $addToSet: "$repeatedGenres"}}}
        ]
    )
    return result[0].genres
}

module.exports = {
    booksFilter,
    allGenres
}