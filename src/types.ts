export type CreateAuthorRequest = {
  name: string;
  bio: string;
  birth_date: Date;
};

export interface SingleAuthorResponse extends CreateAuthorRequest {
  id: number;
}
