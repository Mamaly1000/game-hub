import { categoryTypes } from "./common";

export interface categoryInterface {
  icon: {
    sm: null | string;
    lg: null | string;
  };
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  type: categoryTypes;
  parentId: null | string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface createCategoryInterface {
  title: string;
  englishTitle: string;
  description: string;
  type: categoryTypes | "";
}
