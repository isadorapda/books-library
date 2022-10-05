import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { RiDeleteBack2Line } from 'react-icons/ri'
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
  h2 {
    margin: 120px auto 30px auto;
    font-family: 'Junge', serif;
    font-size: 1rem;
  }
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  padding: 6px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 1px #adadad43;
  input {
    border: none;
    width: 87%;
    background-color: transparent;
    padding: 6px 8px;
  }
`
const ButtonActionInput = styled.button<{ buttonColor: string }>`
  cursor: pointer;
  border-radius: 0 8px 8px 0;
  height: 100%;
  width: 12.5%;
  border: none;
  position: absolute;
  right: 0px;
  color: #fcf8e8;
  background-color: ${({ buttonColor }) => buttonColor};
`
const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const HeaderResults = styled.h4`
  margin: 30px 0;
  font-family: 'Inconsolata', monospace;
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
    background-color: #a9ceb6d5;
    box-shadow: 32px 0 #a9ceb6d5, -32px 0 #94B49F;
  }
  50%{
    background-color: #94B49F;
    box-shadow: 32px 0 #a9ceb6d5, -32px 0  #a9ceb6d5;
  }
  100%{
    background-color: #a9ceb6d5;
    box-shadow: 32px 0 #94B49F, -32px 0  #94B49F; 
  }
`
const LoadingBook = styled.div`
  margin-top: 50px;
  &.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #94b49f;
    box-shadow: 32px 0 #94b49f, -32px 0 #94b49f;
    position: relative;
    animation: ${flash} 0.5s ease-out infinite alternate;
  }
`
const DATA_INITIAL_STATE = {
  num_found: 0,
  docs: [],
}
function Search() {
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<DataSearchApi>(DATA_INITIAL_STATE)

  const searchClickHappened = React.useRef<boolean>(false)
  const clearSearchClickHappened = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (!searchTerm) {
      setData(DATA_INITIAL_STATE)
      searchClickHappened.current = false
    }
  }, [searchTerm])

  const fetchSearchTerm = () => {
    setIsLoading(true)
    searchClickHappened.current = true
    clearSearchClickHappened.current = true
    const queryParams = `?q=${searchTerm.trim().replaceAll(/\s+/g, '+')}`
    const endpoint =
      OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SEARCH_API + queryParams
    fetch(endpoint)
      .then((response) => response.json())
      .then((data: DataSearchApi) => {
        setData(data)
        setIsLoading(false)
      })
  }
  const onClearInputHandler = () => {
    searchClickHappened.current = false
    setSearchTerm('')
    setData(DATA_INITIAL_STATE)
  }

  const getSearchResultLabel = (): string => {
    if (!searchTerm && !searchClickHappened.current) {
      return ''
    }
    const numberFound = data.num_found
    if (numberFound === 0 && !isLoading) {
      return `Sorry, we couln'd find any book based on your search terms.`
    }
    return `We found ${numberFound} book${numberFound === 1 ? '' : 's'} matching
  your search:`
  }

  return (
    <SearchWrapper>
      <h2>Type keywords in the search box to find your next book!</h2>
      <SearchContainer>
        <input
          placeholder="What are you looking for?"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            clearSearchClickHappened.current = false
          }}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm) {
              fetchSearchTerm()
            }
          }}
        />

        {searchClickHappened.current &&
        clearSearchClickHappened.current &&
        !isLoading ? (
          <ButtonActionInput
            onClick={onClearInputHandler}
            title="Clear Search"
            buttonColor="#df7861"
          >
            <RiDeleteBack2Line />
          </ButtonActionInput>
        ) : (
          <ButtonActionInput
            onClick={fetchSearchTerm}
            disabled={!searchTerm}
            title="Search"
            buttonColor="#94B49F"
          >
            <BiSearchAlt2 />
          </ButtonActionInput>
        )}
      </SearchContainer>

      {isLoading ? (
        <LoadingBook className="loader" />
      ) : (
        <SearchResults>
          <HeaderResults>
            {searchClickHappened.current ? getSearchResultLabel() : null}
          </HeaderResults>
          <GridResults>
            {data.docs.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </GridResults>
        </SearchResults>
      )}
    </SearchWrapper>
  )
}

export default Search
