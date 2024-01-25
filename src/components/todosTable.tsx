"use client";
import React, { useEffect } from "react";
import useTodoStore from "@/store/todos";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui/index";

const TodosTable = () => {
  const {
    id,
    title,
    status,
    description,
    todos,
    setFormValues,
    loadTodos,
    getTodoById,
    deleteTodo,
  } = useTodoStore();

  useEffect(() => {
    // Load todos when the component mounts
    loadTodos();
  }, []);
  const handleDelete = async (id: string) => {
    const existingTodo = getTodoById(id);

    if (existingTodo) {
      await deleteTodo(id);
    }
  };

  const handleEdit = async (id: string) => {
    const existingTodo = getTodoById(id);

    if (existingTodo) {
      setFormValues({
        id: existingTodo.id,
        title: existingTodo.title,
        status: existingTodo.status,
        description: existingTodo.description,
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo: any, index: number) => (
            <TableRow key={todo.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell>{todo.description.slice(0, 15)}...</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(todo?.id)}>Edit</Button>
                  <Button
                    className="bg-red-500"
                    onClick={() => handleDelete(todo?.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TodosTable;
