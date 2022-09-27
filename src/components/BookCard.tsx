import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styled from 'styled-components'
import { BookSearchApi } from '../types/Model'
import { OPEN_LIBRARY_COVERS_BASE_API } from '../constants/endpoints'

const BookItem = styled.article`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
  margin: 20px auto;
  padding: 8px 15px;
  position: relative;
  font-family: 'Junge', serif;
  font-weight: 400;
`
const Header = styled.h3`
  margin: 10px 0;
  font-size: 1.1rem;
`
const Paragraph = styled.p`
  margin: 5px 0;
  padding-bottom: 10px;
  font-size: 1rem;
  color: #7895b2;
  font-family: 'Inconsolata', monospace;
`

const IconToLike = styled(MdFavoriteBorder)`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  transition: all 0.1s;
  &:active {
    transform: scale(1.2);
    color: #f75e5e;
  }
`
const IconLiked = styled(MdFavorite)`
  position: absolute;
  right: 20px;
  top: 20px;
  color: #f75e5e;
  cursor: pointer;
`
const IconArrowOpen = styled(IoIosArrowDown)`
  position: absolute;
  right: 20px;
  top: 52px;
  cursor: pointer;
`
const IconArrowClose = styled(IoIosArrowUp)`
  position: absolute;
  right: 20px;
  top: 52px;
  cursor: pointer;
`
const HiddenContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  padding: 8px 0;
  line-height: 1.5;
  font-weight: 600;
  font-size: 0.8rem;
  li {
    list-style: circle;
  }
`
const BookInfo = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BookCover = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-height: 200px;
    box-shadow: 0 0 8px 2px #6968687b;
  }
`
type Props = {
  book: BookSearchApi
}
export const BookCard: React.FC<Props> = ({ book }) => {
  const [showContent, setShowContent] = React.useState<boolean>(false)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)

  return (
    <BookItem>
      <Header>{book.title}</Header>
      <Paragraph>{book.author_name}</Paragraph>
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

      {!showContent ? (
        <IconArrowOpen title="Read more" onClick={() => setShowContent(true)} />
      ) : (
        <IconArrowClose title="Close" onClick={() => setShowContent(false)} />
      )}

      {showContent ? (
        <HiddenContent>
          <BookInfo>
            <p>
              <strong>Published Year:</strong> {book.first_publish_year}
            </p>
            <p>
              <strong>Genre:</strong>
              {book.subject
                ? book.subject
                    .slice(0, 10)
                    .map((sub) => <li key={sub}>{sub}</li>)
                : null}
            </p>
          </BookInfo>
          <BookCover>
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
          </BookCover>
        </HiddenContent>
      ) : null}
    </BookItem>
  )
}
