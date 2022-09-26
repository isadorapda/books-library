export const OPEN_LIBRARY_BASE_API = 'http://openlibrary.org'
export const OPEN_LIBRARY_SEARCH_API = '/search.json'

export const OPEN_LIBRARY_SUBJECTS_API = '/subjects/'
export const OPEN_LIBRARY_BOOKS_API = (openLibraryId: string) =>
  `/books/OL${openLibraryId}M.json`

export const OPEN_LIBRARY_COVERS_BASE_API =
  'https://covers.openlibrary.org/b/olid/'
