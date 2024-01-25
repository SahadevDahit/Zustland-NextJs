"use client";
import React, { useEffect } from "react";
import useTodoStore from "@/store/todos";
import { v4 as uuidv4 } from "uuid";

const TodoForm: React.FC = () => {
  const {
    id,
    title,
    status,
    description,
    setFormValues,
    resetForm,
    addTodo,
    getTodoById,
    updateTodo,
  } = useTodoStore();

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };
  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTodoId = uuidv4();
    await addTodo({
      id: newTodoId,
      title,
      status,
      description,
    });

    resetForm();
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("id " + id);
    const existingTodo = getTodoById(id);

    if (existingTodo) {
      await updateTodo({
        id,
        title,
        status,
        description,
      });
    }
    // const loadedTodos = useTodoStore.getState().todos;
    // console.log("Loaded Todos:", loadedTodos);

    resetForm();
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-15">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Todos !!! Ready to manage tasks
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-solid border-3 rounded-lg border-black-700">
          <form className="space-y-6 p-5">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  value={title}
                  onChange={handleInputChange}
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Status
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  required={true}
                  value={status}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="inProgress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  {/* Add more status options as needed */}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoForm;
