import React from 'react'
import styled from 'styled-components'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_COVERS_BASE_API,
  OPEN_LIBRARY_SUBJECTS_API,
} from '../constants/endpoints'
import { DataSubjectApi } from '../types/Model'
import { BOOK_SUBJECTS } from '../constants/bookInfos'
import bookMarker2 from '../images/bookMarker2.svg'

const ContentWrapper = styled.div`
  grid-column: 1/-1;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    width: 100%;
    text-align: center;
    margin: 50px 0;
    color: black;
    padding: 0 30px;
    font-family: 'Junge', serif;
    font-size: 2rem;
  }
`
const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 450px;
  row-gap: 50px;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
`
const BooksGrid = styled.div`
  grid-template-columns: 100%;
  grid-template-rows: 100px 350px;
  width: 100%;
`
const SubjectName = styled.div`
  position: relative;
  grid-row: 1;
  height: 41px;

  h3 {
    color: #fcf8e8;
    font-family: 'Junge', serif;
    position: absolute;
    z-index: 10;
    top: 5px;
    left: 30px;
    height: 100%;
  }
  img {
    z-index: 9;
    left: -5px;
    top: 0;
    position: absolute;
  }
`
const SectionGenres = styled.section`
  display: flex;
  align-items: center;
  margin: 0 auto;
  overflow: scroll;
  grid-row: 2;
  width: 90%;
`
const SingleBookArticle = styled.article`
  height: 350px;
  min-width: 200px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0.5px 15px 3px #8181814b;
  margin: 20px 15px;
  padding: 5px 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    height: 200px;
    width: 100%;
    object-fit: contain;
    padding: 3px;
    margin: 20px 0;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
`

export const Genres: React.FC = () => {
  const [bookSubjectsData, setBookSubjectsData] = React.useState<
    DataSubjectApi[]
  >([])

  React.useEffect(() => {
    async function fetchBookSubjectsData() {
      const endpoints = BOOK_SUBJECTS.map(
        (subject) => OPEN_LIBRARY_BASE_API + OPEN_LIBRARY_SUBJECTS_API(subject)
      )
      const requests = endpoints.map((endpoint) => fetch(endpoint))
      const responses = await Promise.all(requests)
      const data = []
      for (const response of responses) {
        data.push(await response.json())
      }
      setBookSubjectsData(data)
    }
    fetchBookSubjectsData()
  }, [])

  return (
    <ContentWrapper>
      <h2>Subjects</h2>

      <SubjectsGrid>
        {bookSubjectsData.map(({ works, name, key }) => (
          <BooksGrid key={key}>
            <SubjectName>
              <img src={bookMarker2} alt="" />
              <h3>{name}</h3>
            </SubjectName>
            <SectionGenres>
              {works.map((work) => (
                <SingleBookArticle key={work.key}>
                  <img
                    src={
                      work.cover_edition_key
                        ? OPEN_LIBRARY_COVERS_BASE_API(work.cover_edition_key)
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
