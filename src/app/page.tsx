"use client";
import React, { useState, FormEvent } from "react";
import { TodoForm, TodosTable } from "@/components/ui/index";

const LoginForm: React.FC = () => {
  return (
    <>
      <div className="w-full h-full font-bold">
        <h1 className="pt-5 text-2xl font-bold text-gray-900  text-center">
          State Management using ZustLand
        </h1>
        <div className="container w-full h-full flex flex-col sm:flex-row justify-around pt-5">
          <div className="w-full sm:w-1/2">
            <TodoForm />
          </div>
          <div className="min-h-20 w-full sm:w-1/2 pl-0">
            <div className="flex flex-col sm:flex-row items-center h-full">
              <TodosTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
