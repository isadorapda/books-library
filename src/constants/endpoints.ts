export const OPEN_LIBRARY_BASE_API = 'http://openlibrary.org'
export const OPEN_LIBRARY_SEARCH_API = '/search.json'

export const OPEN_LIBRARY_SUBJECTS_API = (subject: string) =>
  `/subjects/${subject}.json?details=true`

export const OPEN_LIBRARY_BOOKS_API = (openLibraryId: string) =>
  `/books/OL${openLibraryId}M.json`

export const OPEN_LIBRARY_COVERS_BASE_API = (coverId: string) =>
  `https://covers.openlibrary.org/b/olid/${coverId}-M.jpg`
