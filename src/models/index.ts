export type CategoryInput = {
  categoryName: string;
};

export type Category = CategoryInput & {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
