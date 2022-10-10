import React from 'react'
import {
  OPEN_LIBRARY_BASE_API,
  OPEN_LIBRARY_COVERS_BASE_API,
  OPEN_LIBRARY_SUBJECTS_API,
} from '../../constants/endpoints'
import { DataSubjectApi } from '../../types/Model'
import { BOOK_SUBJECTS } from '../../constants/bookInfos'
import bookMarker2 from '../../images/bookMarker2.svg'
import {
  SubjectsWrapper,
  Title,
  MainGrid,
  BooksGrid,
  SubjectName,
  SectionGenres,
  SingleBookArticle,
} from './GenresStyles'

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
    <SubjectsWrapper>
      <Title>Subjects</Title>

      <MainGrid>
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
                        : require('../../images/no-image.png')
                    }
                    alt={
                      work.cover_edition_key
                        ? `Cover of ${work.title}`
                        : `The book titled ${work.title} has no cover available`
                    }
                  />
                  <p>{work.title}</p>
                </SingleBookArticle>
              ))}
            </SectionGenres>
          </BooksGrid>
        ))}
      </MainGrid>
    </SubjectsWrapper>
  )
}
