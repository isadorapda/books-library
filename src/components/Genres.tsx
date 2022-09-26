import React from 'react'
import styled from 'styled-components'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_COVERS_BASE_API,
  OPEN_LIBRARY_SUBJECTS_API,
} from '../constants/endpoints'
import { DataSubjectApi } from '../types/Model'
import { BOOK_SUBJECTS } from '../constants/bookInfos'

const ContentWrapper = styled.div`
  grid-column: 1/-1;
  width: 100vw;
  margin: 100px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    width: 100%;
    text-align: left;
    margin-bottom: 30px;
    font-family: 'Inconsolata', monospace;
    color: #7895b2;
    font-weight: 600;
    font-size: 1.8rem;
    padding: 0 30px;
  }
`
const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  max-width: 100%;
  font-family: 'Montserrat', sans-serif;
`
const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: 350px;

  width: 90%;
`
const SubjectName = styled.h3`
  margin: auto 10px auto 0;
  grid-column: 1;
  background-color: #e8dfca;
  box-shadow: 0 0 10px 0.5px #aaa9a92f;
  color: #7895b2;
  font-family: 'Junge', serif;
  height: 90%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SectionGenres = styled.section`
  grid-column: 2;
  display: flex;
  align-items: center;
  overflow: scroll;
  margin-left: 30px;
  width: 100%;
`
const SingleBookArticle = styled.article`
  height: 90%;
  min-width: 160px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0 10px 0.5px #aaa9a92f;
  margin: 0 9px;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    padding: 3px;
    margin: 20px 0;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
    font-family: 'Inconsolata', monospace;
  }
`

export const Genres: React.FC = () => {
  const [bookSubjectData, setBookSubjectData] = React.useState<
    DataSubjectApi[]
  >([])

  React.useEffect(() => {
    async function fetchBookSubjectsData() {
      const endpoints = BOOK_SUBJECTS.map(
        (subject) =>
          `${
            OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SUBJECTS_API
          }${subject}.json?details=true`
      )
      const requests = endpoints.map((endpoint) => fetch(endpoint))
      const responses = await Promise.all(requests)
      const data = []
      for (const response of responses) {
        data.push(await response.json())
      }
      setBookSubjectData(data)
    }
    fetchBookSubjectsData()
  }, [])

  return (
    <ContentWrapper>
      <h2>Genres</h2>

      <SubjectsGrid>
        {bookSubjectData.map(({ works, name, key }) => (
          <BooksGrid key={key}>
            <SubjectName>{name}</SubjectName>
            <SectionGenres>
              {works.map((work) => (
                <SingleBookArticle>
                  <img
                    src={
                      work.cover_edition_key
                        ? OPEN_LIBRARY_COVERS_BASE_API +
                          `${work.cover_edition_key}-M.jpg`
                        : require('../images/no-image.png')
                    }
                    alt=""
                  />
                  <p>{work.title}</p>
                </SingleBookArticle>
              ))}
            </SectionGenres>
          </BooksGrid>
        ))}
      </SubjectsGrid>
    </ContentWrapper>
  )
}
