import { User } from "./auth.model";

export type Pagination = {
  page: number;
  pageSize: number;
};

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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  userId: string;
  categoryId: number;
  imageKeys: string[];
  type: string;
  trending: boolean;
  author: string;
  meta: string;
  isPublish: boolean;
  publishedAt: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  user: Partial<User>;
  category: Partial<Category>;
  thumbnail: Partial<Media>;
  userId?: string;
  categoryId?: number;
  imageKeys: string[];
  type: string;
  trending: boolean;
  author: string;
  meta: string;
  isPublish: boolean;
  publishedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostResponse extends Post {
  headers: PostHeader[];
}

export interface PostHeader {
  tagName: string;
  level: number;
  link: string;
  label: string;
}
