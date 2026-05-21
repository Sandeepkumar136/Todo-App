import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { createCategory } from "../Contents/CategoryService";

const CategoryManager = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(category, user.$id);
      alert("Category created");
      setCategory("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryManager;