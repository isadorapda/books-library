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
    margin: 100px 0 50px 0;
  }
  h3 {
    color: #94b49f;
  }
`
const Button = styled.button`
  margin: 90px 0;
  width: 200px;
  padding: 10px 15px;
  box-shadow: 2px 2px 9px 0.5px #8181817b;
  border-radius: 8px;
  border: transparent;
  background-color: #ecb390;
  color: #df7861;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: white;
    box-shadow: 4px 4px 5px 1px #8181817b;
  }
`
const flash = keyframes`
  0%{
    background-color: #ecb390;
    box-shadow: 32px 0 #ecb390, -32px 0 #df7861;
  }
  50%{
    background-color: #df7861;
    box-shadow: 32px 0 #ecb390, -32px 0  #ecb390;
  }
  100%{
    background-color: #ecb390;
    box-shadow: 32px 0 #df7861, -32px 0  #df7861; 
  }
`
const appear = keyframes`
  0%{
opacity: 1;
width: 0;
  }
  100%{
    opacity: 1;
width: 80%;
  }
`
const LoadinBook = styled.span`
  margin-top: 50px;
  &.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #df7861;
    box-shadow: 32px 0 #df7861, -32px 0 #df7861;
    position: relative;
    animation: ${flash} 0.5s ease-out infinite alternate;
  }
`
const slideIn = keyframes`
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(0%);
  }

`
const RandomBookContainer = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 30px;
`
const CoverContainer = styled.div`
  background-color: #94b49f;
  height: 500px;
  width: 100%;
  grid-column: 1;
  box-shadow: 4px 4px 5px 1px #8181817b;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slideIn} 0.5s ease-in;
  img {
    height: 70%;
    object-fit: cover;
    box-shadow: 0 0 10px 1px #8181817b;
  }
`

const BookInfo = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 30px;
  margin-bottom: 50px;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  animation: ${appear} 4s steps(60, end) forwards;

  h2 {
    margin-bottom: 20px;
    max-width: 200px;
    font-weight: 300;
    text-transform: capitalize;
    letter-spacing: 1px;
    animation-delay: 1s;
  }
  h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94b49f;
    margin-bottom: 20px;
    font-size: 1rem;
    animation-delay: 2s;
    width: 70%;
  }
`
const ListGenres = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin-bottom: 15px;
    animation-delay: 1.4s;
  }
  li {
    animation-delay: 1.6s;
    line-height: 20px;
    list-style: circle;
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
            <CoverContainer>
              <img
                src={
                  bookDetails?.cover_edition_key
                    ? OPEN_LIBRARY_COVERS_BASE_API(
                        bookDetails.cover_edition_key
                      )
                    : require('../images/no-image.png')
                }
                alt={
                  bookDetails?.cover_edition_key
                    ? `Cover of the book ${bookDetails.title}`
                    : `The book ${bookDetails.title} has no cover available`
                }
              />
            </CoverContainer>
          ) : null}
          <BookInfo>
            <h2>{book.title}</h2>
            <h3>{(bookDetails?.author_name || []).join('; ')}</h3>
            {firstClickHappened.current ? (
              <ListGenres>
                <h4>Genres:</h4>
                {(bookDetails?.subject || []).slice(0, 10).map((sub) => (
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
