'use client'
import { getAllCategories } from "@/app/api-calls/category/all/route";
import { CategoryResponseDto } from "@/dto/CategoryDto";
import { CategoryContextType } from "@/types/category";
import { createContext, useContext, useEffect, useState } from "react";



const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategories must be used inside provider");
  return context;
};