export type CategoryInput = {
  categoryName: string;
};

export type Category = CategoryInput & {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface MediaInput {
  key: string;
  type: string;
  originalName: string;
  link: string;
}

export interface Media extends MediaInput {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  userId: string;
  categoryId: number;
  thumbnail: string;
}
