import React from 'react'
import styled from 'styled-components'
import { BiSearchAlt2 } from 'react-icons/bi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { BookCard } from '../../components/BookCard/'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_SEARCH_API,
} from '../../constants/endpoints'
import { DataSearchApi } from '../../types/Model'
import {
  Column,
  Container,
  Heading,
  LoadingBook,
} from '../../GlobalStyling/GlobalStyles'
import {
  SearchContainer,
  ButtonActionInput,
  HeaderResults,
  GridResults,
} from './SearchStyles'

const SearchTitle = styled(Heading)`
  font-size: 1.2rem;
  @media screen and (min-width: 1536px) {
    margin-top: 50px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 819px) {
    font-size: 1rem;
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
    <Container>
      <SearchTitle>
        Type keywords in the search box to find your next book!
      </SearchTitle>
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
        <Column>
          <HeaderResults>
            {searchClickHappened.current ? getSearchResultLabel() : null}
          </HeaderResults>
          <GridResults>
            {data.docs.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </GridResults>
        </Column>
      )}
    </Container>
  )
}

export default Search
