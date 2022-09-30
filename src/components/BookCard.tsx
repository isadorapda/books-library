import React from 'react'
import { MdFavorite } from 'react-icons/md'
import { IoIosArrowUp } from 'react-icons/io'
import styled, { keyframes } from 'styled-components'
import { BookSearchApi } from '../types/Model'
import { OPEN_LIBRARY_COVERS_BASE_API } from '../constants/endpoints'

const BookItem = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding: 20px 6px;
  background-color: white;
  box-shadow: 0 0 10px 0.5px #aaa9a92f;
  font-family: 'Junge', serif;
  font-weight: 400;
  text-align: center;

  img {
    max-height: 150px;
    max-width: 70%;
    box-shadow: 0 0 8px 2px #6968687b;
    object-fit: cover;
  }
`
const BookTitleHeader = styled.h3`
  position: absolute;
  top: 200px;
  padding: 0 6px;
  max-height: 50px;
  max-width: 90%;
  overflow: auto;
  font-size: 0.87rem;
`
const AuthorsNames = styled.p`
  position: absolute;
  top: 260px;
  padding: 0 6px 10px 6px;
  max-width: 90%;
  overflow: auto;
  max-height: 30px;
  font-size: 0.87rem;
  color: #94b49f;
  font-family: 'Inconsolata', monospace;
`
const IconToLike = styled(MdFavorite)`
  position: absolute;
  right: 10px;
  top: 20px;
  cursor: pointer;
`
const IconLiked = styled(IconToLike)`
  color: #df7861;
`

const slideIn = keyframes`
  0%{
    transform: translateY(100%);
  }
  25%{
    transform: translateY(75%);
  }
  50%{
    transform: translateY(50%);
  }
  75%{
    transform: translateY(25%);
  }
  100%{
    transform: translateY(0%);
  }
`

const HiddenContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 10px 15px 20px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fcf8e8;
  box-shadow: 0 0 10px 0.5px #aaa9a92f;
  animation: ${slideIn} 0.3s ease-in;
`
const arrowAction = keyframes`
  0%, 100%{
    transform: translateY(10px);
  }
  50%{
    transform: translateY(-10px);
  }
`
const ShowBookInfo = styled(IoIosArrowUp)`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  width: 50px;
  height: 30px;
  color: #94b49f;
  font-family: 'Carrois Gothic', sans-serif;
  font-size: 0.6rem;
  &:hover {
    animation: ${arrowAction} 0.9s ease-in-out infinite;
  }
`
const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  font-family: 'Inconsolata', monospace;
  color: black;
  line-height: 1.5;
  font-weight: 400;
  max-height: 90%;
  overflow: auto;
  font-size: 0.9rem;

  li {
    list-style: circle;
  }
`
const CloseBookInfo = styled.span`
  position: absolute;
  right: 50%;
  bottom: 8px;
  color: #df7861;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: rotate(180deg);
  }
`
type Props = {
  book: BookSearchApi
}

export const BookCard: React.FC<Props> = ({ book }) => {
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const [isContentOpen, setIsContentOpen] = React.useState<boolean>(false)

  const subjectsToShow = (): JSX.Element[] => {
    const subjectsArray: string[] = book.subject
    if (!subjectsArray) {
      return []
    }
    return subjectsArray.slice(0, 10).map((sub) => <li key={sub}>{sub}</li>)
  }

  return (
    <BookItem>
      <img
        src={
          book.cover_edition_key
            ? OPEN_LIBRARY_COVERS_BASE_API(book.cover_edition_key)
            : require('../images/no-image.png')
        }
        alt={
          book?.cover_edition_key
            ? `Cover of the book ${book.title}`
            : `The book ${book.title} has no cover available`
        }
      />

      <BookTitleHeader>{book.title}</BookTitleHeader>
      <AuthorsNames>
        {book.author_name?.length > 3 || book.author_name
          ? book.author_name.slice(0, 2).join('; ')
          : null}
      </AuthorsNames>
      {isFavorite ? (
        <IconLiked
          title="Remove from Favorites"
          onClick={() => setIsFavorite(false)}
        />
      ) : (
        <IconToLike
          title="Add to Favorites"
          onClick={() => setIsFavorite(true)}
        />
      )}

      <ShowBookInfo title="Read more" onClick={() => setIsContentOpen(true)} />

      {isContentOpen ? (
        <HiddenContent>
          <BookInfo>
            <p>
              <strong>Year Published:</strong> {book.first_publish_year}
              <br />
              <strong>Pages:</strong> {book.number_of_pages_median}
              <br />
              <strong>All Authors:</strong>{' '}
              {(book.author_name || []).join('; ')}
            </p>
            <strong>Genres:</strong>
            {subjectsToShow()}
            <CloseBookInfo
              title="Close"
              onClick={() => setIsContentOpen(false)}
            >
              X
            </CloseBookInfo>
          </BookInfo>
        </HiddenContent>
      ) : null}
    </BookItem>
  )
}
