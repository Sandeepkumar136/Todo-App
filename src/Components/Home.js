import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories(user.$id);
      setCategories(response.documents);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div>
      <h1>Create Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.$id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

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

        {(form.repeatType === "Custom" || form.repeatType === "None") && (
          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        )}

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
      <button
        onClick={async () => {
          const permission = await Notification.requestPermission();

          console.log(permission);
        }}
      >
        Enable Notifications
      </button>
    </div>
  );
};

export default Home;
