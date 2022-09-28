import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import styled, { keyframes } from 'styled-components'
import { BookCard } from '../components/BookCard'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_SEARCH_API,
} from '../constants/endpoints'
import { DataSearchApi } from '../types/Model'

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  h4 {
    margin: 20px 0;
    font-family: 'Inconsolata', monospace;
  }
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  padding: 6px;
  margin: 120px auto 10px auto;
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 1px #adadad43;
  input {
    border: none;
    width: 90%;
    background-color: transparent;
    padding: 6px 8px;
  }
  button {
    cursor: pointer;
    border-radius: 0 8px 8px 0;
    height: 100%;
    width: 10%;
    background-color: #7895b2;
    border: none;
    position: absolute;
    right: 0px;
    color: #f5efe6;
  }
`
const GridResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 350px;
  gap: 10px;
  width: 100%;
  margin-bottom: 50px;
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
const LoadinBook = styled.div`
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
type ShouldShowBooks = {
  [key: string]: boolean
}

function Search() {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<DataSearchApi>({
    num_found: 0,
    docs: [],
  })
  const [shouldShowBooks, setShouldShowBooks] = React.useState<ShouldShowBooks>(
    {}
  )
  const firstClickHappened = React.useRef<boolean>(false)

  const fetchSearchTerm = () => {
    setIsLoading(true)
    firstClickHappened.current = true
    const queryParams = `?q=${searchTerm.trim().replaceAll(/\s+/g, '+')}`
    const endpoint =
      OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SEARCH_API + queryParams
    fetch(endpoint)
      .then((response) => response.json())
      .then((data: DataSearchApi) => {
        setData(data)
        const initialSetShowBooks = data.docs.reduce((acc, current) => {
          acc[current.key] = false
          return acc
        }, {} as ShouldShowBooks)
        setShouldShowBooks(initialSetShowBooks)
        setIsLoading(false)
      })
  }
  const resultSearch = () => {
    const numberFound = data.num_found
    if (numberFound === 0 && !isLoading) {
      return `Sorry, we couln'd find any book based on your search terms.`
    } else if (isLoading) {
      return
    }
    return `We found ${numberFound} book${numberFound === 1 ? '' : 's'} matching
  your search:`
  }

  const toggleShouldShowBook = (id: keyof ShouldShowBooks) => {
    let copySHouldShowBooks = { ...shouldShowBooks }
    copySHouldShowBooks[id] = !shouldShowBooks[id]
    setShouldShowBooks(copySHouldShowBooks)
  }

  return (
    <SearchWrapper>
      <SearchContainer>
        <input
          placeholder="What are you looking for?"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchSearchTerm()
            }
          }}
        />
        <button onClick={fetchSearchTerm}>
          <BiSearchAlt2 />
        </button>
      </SearchContainer>
      <h4>
        {firstClickHappened.current
          ? resultSearch()
          : ' Type keywords in the search input to find your next book!'}
      </h4>
      {isLoading || (isLoading && data) ? (
        <LoadinBook className="loader"></LoadinBook>
      ) : (
        <GridResults>
          {data.docs.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              shouldShowContent={shouldShowBooks[book.key]}
              toggleShowContent={toggleShouldShowBook}
            />
          ))}
        </GridResults>
      )}
    </SearchWrapper>
  )
}

export default Search
