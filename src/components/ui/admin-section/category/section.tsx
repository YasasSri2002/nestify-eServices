'use client';

import { FormEvent } from "react";
import { useCategories, useAddCategory } from "@/hooks/queries/useCategories";

export default function AdminCategorySection() {
  const { data: categories = [], isLoading } = useCategories();
  const addCategoryMutation = useAddCategory();

  async function handleAddCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string)?.trim();
    if (!name) return;

    try {
      await addCategoryMutation.mutateAsync({ name });
      form.reset();
    } catch (err: unknown) {
      console.error("Failed to add category:", err);
    }
  }

  return (
    <>
      <div className="my-5 bg-gradient-to-b bg-gray-100 from-10% from-gray-200 rounded-2xl py-10 lg:px-10">
        <h1 className="text-center text-xl md:text-lg lg:text-2xl">All Categories</h1>
        <table className="table-auto md:table-fixed w-full ">
          <thead>
            <tr className="h-15 border-b-2">
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-neutral-500">
                  Loading categories…
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="h-10">
                  <td className="text-center text-wrap">{category.id}</td>
                  <td className="text-center">{category.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-300 grid gap-5 justify-items-center">
        <h1 className="text-center text-md md:text-lg lg:text-2xl">Add new Category</h1>
        <div className="w-full lg:w-[40em] p-5">
          <form onSubmit={handleAddCategory} className="grid justify-items-center">
            <div className="flex justify-between md:justify-evenly w-full space-y-8">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                required
                className="bg-white w-[10em] md:w-[20em] lg:w-md h-6 lg:h-10 pl-2 rounded-sm lg:rounded-xl "
              />
            </div>
            <button
              type="submit"
              disabled={addCategoryMutation.isPending}
              className="border-2 rounded-2xl bg-green-300 px-4 py-1 disabled:opacity-50 transition-opacity"
            >
              {addCategoryMutation.isPending ? 'Adding…' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}