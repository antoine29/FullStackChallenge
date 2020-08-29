import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_FILTERED, CURRENT_USER } from '../queries'

const Recommend = (props) => {

    const [books, setBooks] = useState([])
    const [currentUser, setCurrentUser] = useState('sss')

    const currentUserQuery = useQuery(CURRENT_USER)
    const [runAllBooksLazyQuery, allBooksLazyQuery] = useLazyQuery(ALL_BOOKS_FILTERED)

    useEffect(() => {
        if (currentUserQuery.data) {
            console.log('filtering by genre:', currentUserQuery.data.me)
            setCurrentUser(currentUserQuery.data.me)
            runAllBooksLazyQuery({ variables: { author: null, genre: currentUserQuery.data.me.favoriteGenre } })
        }
    }, [currentUserQuery])

    useEffect(() => {
        if (allBooksLazyQuery.data) {
            console.log('updating books', allBooksLazyQuery.data.allBooks)
            setBooks(allBooksLazyQuery.data.allBooks)
            console.log(books)
        }
    }, [allBooksLazyQuery])

    if (!props.show) {
        return null
    }

    if (currentUserQuery.loading || allBooksLazyQuery.loading ) return <div>loading...</div>

    return (
        <div>
            <h2>Recommendations</h2>
            <h3>books based in your favorite genre: {currentUser.favoriteGenre}</h3>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th> author </th>
                        <th> published </th>
                    </tr>
                    {books.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend