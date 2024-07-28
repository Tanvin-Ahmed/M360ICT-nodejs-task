export type CreateAuthorRequest = {
  name: string;
  bio: string;
  birth_date: Date;
};

export interface SingleAuthorResponse extends CreateAuthorRequest {
  id: number | string;
}

export type CreateBookRequest = {
  title: string;
  description: string;
  published_date: Date;
  author_id: number | string;
};

export interface CreateBookResponse extends CreateBookRequest {
  id: number | string;
}
