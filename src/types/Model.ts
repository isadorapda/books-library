export interface BookSearchApi {
  author_name: string[]
  key: string
  first_publish_year: number
  title: string
  subject: string[]
  isFavorite: boolean
  cover_edition_key: string
  language?: string[]
  isbn: string[]
  number_of_pages_median?: number
}

export interface DataSearchApi {
  num_found: number
  docs: BookSearchApi[]
}

export interface BookApi {
  title: string
  authors?: { key: string }[]
  isbn_10?: string[]
  isbn_13?: string[]
}
export interface BookSubjectApi {
  cover_edition_key: string
  authors: { key?: string; name: string }
  title: string
  subject: string[]
  key: string
}
export interface DataSubjectApi {
  works: BookSubjectApi[]
  name: string
  key: string
}
