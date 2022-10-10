import React from 'react'
import styled from 'styled-components'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_BOOKS_API,
  OPEN_LIBRARY_SEARCH_API,
  OPEN_LIBRARY_COVERS_BASE_API,
} from '../../constants/endpoints'
import { DataSearchApi, BookSearchApi, BookApi } from '../../types/Model'
import { containsStringFromArray } from '../../utils/containsStringFromArray'
import {
  Container,
  MainHeading,
  Heading,
  LoadingBook,
} from '../../GlobalStyling/GlobalStyles'
import {
  Button,
  RandomBookContainer,
  CoverContainer,
  BookInfo,
} from './RandomBookStyles'

const H1 = styled(MainHeading)`
  font-size: 2rem;
  @media screen and (min-width: 1536px) {
    margin-top: 90px;
    font-size: 2rem;
  }

  @media screen and (min-width: 820px) and (max-width: 1023px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 819px) {
    font-size: 1.2rem;
  }
`
const H2 = styled(Heading)`
  font-size: 1.4rem;
  @media screen and (min-width: 1536px) {
    font-size: 1.6rem;
  }

  @media screen and (min-width: 820px) and (max-width: 1023px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 819px) {
    font-size: 1.1rem;
  }
`

const API_BOOK_LANGUAGE = '/languages/eng'

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
    <Container>
      <H1>Feeling Adventorous?</H1>
      <H2 color="#94b49f">Let us surprise you in your next reading!</H2>
      <Button onClick={getRandomBook}>Surprise me!</Button>

      {isLoading ? (
        <LoadingBook className="loader"></LoadingBook>
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
                    : require('../../images/no-image.png')
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
              <div>
                <h4>Genres:</h4>
                {(bookDetails?.subject || []).slice(0, 10).map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </div>
            ) : null}
          </BookInfo>
        </RandomBookContainer>
      )}
    </Container>
  )
}
