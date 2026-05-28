import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { createTask } from "../Contents/TaskServices";
import { getCategories } from "../Contents/CategoryService";

const Home = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    repeatType: "None",
    dueDate: "",
    priority: "Medium",
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategories(user.$id);

      setCategories(response.documents);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user, fetchCategories]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(
        {
          ...form,
          status: "Pending",
          completedAt: null,
        },
        user.$id,
      );

      alert("Task created");

      setForm({
        title: "",
        description: "",
        category: "",
        repeatType: "None",
        dueDate: "",
        priority: "Medium",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="home-container">
      <div className="task-card">
        <h1 className="task-title">Create New Task</h1>
        <p className="task-subtitle">
          Organize your work beautifully and stay productive
        </p>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task description..."
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="task-cat"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.$id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="form-row">
            <select
              name="repeatType"
              value={form.repeatType}
              onChange={handleChange}
            >
              <option value="None">One Time</option>
              <option value="Daily">Every Day</option>
              <option value="Weekly">Every Week</option>
              <option value="Monthly">Every Month</option>
              <option value="Custom">Select Date</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {(form.repeatType === "Custom" || form.repeatType === "None") && (
            <input
              type="datetime-local"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          )}

          <button type="submit" className="primary-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
