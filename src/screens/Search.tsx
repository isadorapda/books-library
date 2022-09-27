import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Select from 'react-select'
import styled, { keyframes } from 'styled-components'
import { BookCard } from '../components/BookCard'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_SEARCH_API,
} from '../constants/endpoints'
import { DataSearchApi } from '../types/Model'
import {
  SELECT_SUBJECT_OPTIONS,
  SELECT_LANGUAGE_OPTIONS,
} from '../constants/bookInfos'

const SearchWrapper = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 300px 1fr;
`
const Filters = styled.div`
  background-color: #aebdca;
  height: 100vh;
  box-shadow: 0 0 10px 1px #adadad92;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: #f5efe6;
    margin: 100px 0 30px 0;
  }
  h3 {
    color: #f5efe6;
  }
  .react-select-selectContainer {
    width: 80%;
    border-radius: 8px;
    box-shadow: 0 0 10px 1px #adadad92;
    background-color: #f5efe6;
  }
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 6px;
  margin: 150px auto 15px auto;
  position: relative;
  background-color: #f5efe6;
  border-radius: 8px;
  box-shadow: 0 0 10px 1px #adadad92;
  input {
    border: none;
    width: 100%;
    background-color: transparent;
    padding: 6px 8px;
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
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

function Search() {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<DataSearchApi>({
    num_found: 0,
    docs: [],
  })

  const fetchSearchTerm = () => {
    setIsLoading(true)
    const queryParams = `?q=${searchTerm.trim().replaceAll(/\s+/g, '+')}`
    const endpoint =
      OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SEARCH_API + queryParams
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
  }

  return (
    <SearchWrapper>
      <Filters>
        <h2>Filters</h2>
        <h3>Subjects</h3>
        <Select
          options={SELECT_SUBJECT_OPTIONS}
          className="react-select-selectContainer"
        />
        <h3>Languages</h3>
        <Select
          options={SELECT_LANGUAGE_OPTIONS}
          className="react-select-selectContainer"
        />
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
      </Filters>

      <h4>
        {searchTerm === '' ? (
          ' Type keywords in the search input to find your next book!'
        ) : isLoading ? (
          <LoadinBook className="loader"></LoadinBook>
        ) : data.num_found === 0 ? (
          `Sorry, we couln'd find any book based on your search terms.`
        ) : (
          ` We found ${data.num_found} book${
            data.num_found === 1 ? '' : 's'
          } matching
        your search:`
        )}
      </h4>
      <div>
        {data.docs.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </SearchWrapper>
  )
}

export default Search
