import { categoriesTypes } from '../types/categories.types';

const { SELECT_CATEGORY } = categoriesTypes;

export const selectCategory = (name) => ({
  type: SELECT_CATEGORY,
  categoryName: name,
});
