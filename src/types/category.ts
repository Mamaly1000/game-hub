export interface categoryInterface {
  icon: {
    sm: null | string;
    lg: null | string;
  };
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  type: string;
  parentId: null | string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
