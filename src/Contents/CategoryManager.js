import React, {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../Context/AuthContext";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../Contents/CategoryService";

const CategoryManager = () => {
  const { user } = useAuth();

  const [category, setCategory] =
    useState("");

  const [categories, setCategories] =
    useState([]);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [editValue, setEditValue] =
    useState("");

  useEffect(() => {
    if (user?.$id) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const response =
        await getCategories(user.$id);

      setCategories(
        response.documents || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(
        category,
        user.$id
      );

      setCategory("");
      fetchCategories();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      setCategories((prev) =>
        prev.filter(
          (cat) => cat.$id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (cat) => {
    setEditingCategory(cat.$id);
    setEditValue(cat.name);
  };

  const handleUpdate = async () => {
    try {
      await updateCategory(
        editingCategory,
        editValue
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat.$id === editingCategory
            ? {
                ...cat,
                name: editValue,
              }
            : cat
        )
      );

      setEditingCategory(null);
      setEditValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-manager">
      <h3 className="section-title">
        Category Management
      </h3>

      <form
        className="category-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter category name"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        />

        <button type="submit">
          <i className="bx bx-plus"></i>
          Add Category
        </button>
      </form>

      <div className="category-list">
        {categories.length === 0 ? (
          <p className="empty-state">
            No categories found
          </p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.$id}
              className="category-card"
            >
              <span>{cat.name}</span>

              <div className="category-actions">
                <button
                  className="edit-category-btn"
                  onClick={() =>
                    startEdit(cat)
                  }
                >
                  <i className="bx bx-edit"></i>
                </button>

                <button
                  className="delete-category-btn"
                  onClick={() =>
                    handleDelete(cat.$id)
                  }
                >
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingCategory && (
        <div className="edit-category-overlay">
          <div className="edit-category-modal">
            <h3>Edit Category</h3>

            <input
              value={editValue}
              onChange={(e) =>
                setEditValue(
                  e.target.value
                )
              }
            />

            <div className="edit-category-actions">
              <button
                className="save-btn"
                onClick={handleUpdate}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setEditingCategory(
                    null
                  )
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;