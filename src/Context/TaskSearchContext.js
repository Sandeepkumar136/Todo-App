import React, { createContext, useContext, useState } from "react";

const TaskSearchContext = createContext();

export const TaskSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TaskSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TaskSearchContext.Provider>
  );
};

export const useTaskSearch = () => {
  const context = useContext(TaskSearchContext);

  if (!context) {
    throw new Error(
      "useTaskSearch must be used inside TaskSearchProvider"
    );
  }

  return context;
};