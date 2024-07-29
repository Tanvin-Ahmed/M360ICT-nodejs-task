export type CreateAuthorRequest = {
  name: string;
  bio: string;
  birth_date: Date;
};

export interface SingleAuthorResponse extends CreateAuthorRequest {
  id: number;
}

export type CreateBookRequest = {
  title: string;
  description: string;
  published_date: Date;
  author_id: number | string;
};

export interface CreateBookResponse extends CreateBookRequest {
  id: number;
}

export interface AuthorWithBooks extends SingleAuthorResponse {
  books: Partial<CreateBookResponse>[];
}

export interface AuthorsWithBooksResponse {
  author_id: number;
  author_name: string;
  bio: string;
  birth_date: Date;
  book_id: number;
  book_title: string;
  book_description: string;
  published_date: Date;
}
