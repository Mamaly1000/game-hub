export interface productInterface {
  _id: string;
  title: string;
  description: string;
  slug: string;
  category: {
    _id: string;
    title: string;
    englishTitle: string;
  };
  imageLink: string;
  price: number;
  offPrice: number;
  discount: number | null;
  brand: string;
  tags: string[];
  rating: number;
  numReviews: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  quantity: number;
  likesCount: number;
  isLiked: boolean;
}
export interface singleProductInterface {
  _id: string;
  title: string;
  description: string;
  slug: string;
  category: {
    icon: {
      sm: string | null;
      lg: string | null;
    };
    _id: string;
    title: string;
    englishTitle: string;
  };
  imageLink: string;
  price: number;
  offPrice: number;
  discount: number;
  brand: string;
  tags: string[];
  rating: number;
  numReviews: number;
  quantity: number | undefined | null;
  countInStock: number;
  likes: unknown[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface singleCartProductInterface {
  discount: number | null;
  imageLink: string;
  offPrice: number;
  price: number;
  countInStock: number;
  quantity: number;
  slug: string;
  title: string;
  _id: string;
}
export interface createProductInterface {
  title: string;
  description: string;
  slug: string;
  imageLink: string;
  brand: string;
  tags: string[];
  category: string;
  price: string;
  discount: string;
  countInStock: string;
  offPrice: string;
}
