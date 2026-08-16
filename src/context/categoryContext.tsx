'use client';

import React, { createContext, useContext } from 'react';
import { CategoryResponseDto } from '@/dto/CategoryDto';
import { CategoryContextType } from '@/types/category';
import { useCategories as useCategoriesQuery } from '@/hooks/queries/useCategories';

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const { data = [], isLoading } = useCategoriesQuery();

  return (
    <CategoryContext.Provider value={{ categories: data, loading: isLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used inside CategoryProvider');
  return context;
};