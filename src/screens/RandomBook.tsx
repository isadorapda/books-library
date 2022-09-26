import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_BOOKS_API,
  OPEN_LIBRARY_SEARCH_API,
  OPEN_LIBRARY_COVERS_BASE_API,
} from '../constants/endpoints'
import { DataSearchApi, BookSearchApi, BookApi } from '../types/Model'
import { containsStringFromArray } from '../utils/containsStringFromArray'

const API_BOOK_LANGUAGE = '/languages/eng'

const RandomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  position: relative;
  h1 {
    margin: 100px 0 20px 0;
    font-family: 'Inconsolata', monospace;
    font-size: 2.6rem;
  }
`
const Button = styled.button`
  margin: 30px 0;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #7eabf32e;
  background-color: #7eabf32e;
  color: #2e63b9ec;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: white;
    background-color: #6ca0f445;
    font-size: 1.1rem;
  }
`
const flash = keyframes`
  0%{
    background-color: #95b9f1;
    box-shadow: 32px 0 #95b9f1, -32px 0 #6ca0f4;
  }
  50%{
    background-color: #6ca0f4;
    box-shadow: 32px 0 #95b9f1, -32px 0  #95b9f1;
  }
  100%{
    background-color: #95b9f1;
    box-shadow: 32px 0 #6ca0f4, -32px 0  #6ca0f4; 
  }
`
const LoadinBook = styled.span`
  margin-top: 50px;
  &.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #6ca0f4;
    box-shadow: 32px 0 #6ca0f4, -32px 0 #6ca0f4;
    position: relative;
    animation: ${flash} 0.5s ease-out infinite alternate;
  }
`
const RandomBookContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 250px;
    width: fit-content;
    margin-bottom: 30px;
  }
`
const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  margin-bottom: 50px;

  h2 {
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-align: center;
  }
  h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #2e63b9ec;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1rem;
  }
`
const ListGenres = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    text-align: center;
    margin-bottom: 15px;
  }
`

const DEFAULT_STATE_BOOK_SEARCH_API: BookSearchApi = {
  title: '',
  cover_edition_key: '',
  author_name: [],
  key: '',
  first_publish_year: 0,
  subject: [],
  isbn: [],
  isFavorite: false,
  language: [],
}

export const RandomBook: React.FC = () => {
  const [book, setBook] = React.useState<BookApi>({
    authors: [],
    title: '',
  })
  const [bookDetails, setBookDetails] = React.useState<BookSearchApi>(
    DEFAULT_STATE_BOOK_SEARCH_API
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const firstClickHappened = React.useRef<boolean>(false)

  const getRandomBook = React.useCallback(async () => {
    console.log('getRandomBook')
    firstClickHappened.current = true
    setIsLoading(true)
    const openLibraryId = `${Math.floor(Math.random() * 10000000)}`
    const endpoint =
      OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_BOOKS_API(openLibraryId)
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.languages && data.languages[0].key === API_BOOK_LANGUAGE) {
          setBook(data)
          return
        }
        getRandomBook()
      })
  }, [])

  React.useEffect(() => {
    if (book.title) {
      console.log('useEffect')
      const queryParams = `?q=${book.title.trim().replaceAll(' ', '+')}`
      const endpoint =
        OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SEARCH_API + queryParams
      fetch(endpoint)
        .then((response) => response.json())
        .then((data: DataSearchApi) => {
          const selectedBooksIsbns = [
            ...(book.isbn_10 || []),
            ...(book.isbn_13 || []),
          ]
          const bookDetailsMatch = data.docs.filter((searchApiBook) => {
            if (!selectedBooksIsbns.length || !searchApiBook.isbn) {
              return false
            }
            return containsStringFromArray(
              searchApiBook.isbn,
              selectedBooksIsbns
            )
          })
          setIsLoading(false)
          if (!bookDetailsMatch[0] || !selectedBooksIsbns.length) {
            setBookDetails(DEFAULT_STATE_BOOK_SEARCH_API)
            getRandomBook()
            return
          }
          setBookDetails(bookDetailsMatch[0])
        })
    }
  }, [book, getRandomBook])
  console.log('reference', bookDetails)

  return (
    <RandomWrapper>
      <h1>Feeling Adventorous?</h1>
      <h3>Let us surprise you in your next reading!</h3>
      <Button onClick={getRandomBook}>Surprise me!</Button>

      {isLoading ? (
        <LoadinBook className="loader"></LoadinBook>
      ) : (
        <RandomBookContainer>
          {firstClickHappened.current ? (
            <img
              src={
                bookDetails?.cover_edition_key
                  ? OPEN_LIBRARY_COVERS_BASE_API +
                    bookDetails.cover_edition_key +
                    '-M.jpg'
                  : require('../images/no-image.png')
              }
              alt=""
            />
          ) : null}
          <BookInfo>
            <h2>{book.title}</h2>
            <h3>{(bookDetails?.author_name || []).join('; ')}</h3>
            {firstClickHappened.current ? (
              <ListGenres>
                <h4>Genres:</h4>
                {(bookDetails?.subject || []).map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </ListGenres>
            ) : null}
          </BookInfo>
        </RandomBookContainer>
      )}
    </RandomWrapper>
  )
}
