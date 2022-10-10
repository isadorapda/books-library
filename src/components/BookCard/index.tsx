import React from 'react'
import { BookSearchApi } from '../../types/Model'
import { OPEN_LIBRARY_COVERS_BASE_API } from '../../constants/endpoints'
import {
  BookItem,
  BookTitleHeader,
  AuthorsNames,
  IconToLike,
  IconLiked,
  HiddenContent,
  ShowBookInfo,
  BookInfo,
  CloseBookInfo,
} from './BookCardStyles'

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
            : require('../../images/no-image.png')
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
