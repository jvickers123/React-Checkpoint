import { Product } from '../helpers/types';

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
