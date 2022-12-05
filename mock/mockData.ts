import { Product, CartItem } from '../helpers/types';

export const mockData: Product[] = [
  {
    category: 'clothes',
    description: 'big jacket',
    id: 1,
    image: 'https://imageConfigDefault.url',
    price: 10,
    rating: {
      rate: 1,
      count: 2,
    },
    title: 'item1',
  },
  {
    category: 'clothes',
    description: 'small jacket',
    id: 2,
    image: 'https://SecondimageConfigDefault.url',
    price: 11,
    rating: {
      rate: 2,
      count: 4,
    },
    title: 'item2',
  },
];

export const mockCartData: CartItem[] = [
  {
    category: 'clothes',
    description: 'big jacket',
    id: 1,
    image: 'https://imageConfigDefault.url',
    price: 10,
    rating: {
      rate: 1,
      count: 2,
    },
    title: 'item1',
    quantity: 1,
    total: 10,
  },
  {
    category: 'clothes',
    description: 'small jacket',
    id: 2,
    image: 'https://SecondimageConfigDefault.url',
    price: 11,
    rating: {
      rate: 2,
      count: 4,
    },
    title: 'item2',
    quantity: 2,
    total: 22,
  },
];
