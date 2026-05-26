import React, { useEffect, useCallback, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useTaskSearch } from "../Context/TaskSearchContext";
import TaskSuggestions from "../Contents/TaskSuggestions";
import {
  getUserTasks,
  updateTask,
  deleteTask,
} from "../Contents/TaskServices";

const Tasks = () => {
  const { user } = useAuth();
  const { searchQuery } = useTaskSearch();

  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const fetchTasks = useCallback(async () => {
    if (!user) return;

    try {
      const response = await getUserTasks(user.$id);
      setTasks(response.documents);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const shouldResetRecurringTask = (task) => {
    if (!task.completedAt) return false;

    const now = new Date();
    const completedDate = new Date(task.completedAt);

    if (task.repeatType === "Daily") {
      return now.toDateString() !== completedDate.toDateString();
    }

    if (task.repeatType === "Weekly") {
      const diffDays =
        (now - completedDate) / (1000 * 60 * 60 * 24);
      return diffDays >= 7;
    }

    if (task.repeatType === "Monthly") {
      return (
        now.getMonth() !== completedDate.getMonth() ||
        now.getFullYear() !== completedDate.getFullYear()
      );
    }

    return false;
  };

  const handleStatusUpdate = async (taskId, status) => {
    try {
      const completedAt =
        status === "Completed"
          ? new Date().toISOString()
          : null;

      await updateTask(taskId, {
        status,
        completedAt,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.$id === taskId
            ? {
                ...task,
                status,
                completedAt,
              }
            : task
        )
      );

      setMenuOpen(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.$id !== taskId)
      );

      setMenuOpen(null);
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (task) => {
    setEditingTaskId(task.$id);

    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });

    setMenuOpen(null);
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = async (taskId) => {
    try {
      await updateTask(taskId, editForm);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.$id === taskId
            ? {
                ...task,
                ...editForm,
              }
            : task
        )
      );

      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    "All",
    ...new Set(
      tasks
        .map((task) => task.category)
        .filter(Boolean)
    ),
  ];

  const applyFilters = (taskList) => {
    return taskList.filter((task) => {
      const priorityMatch =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      const searchMatch =
        task.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        priorityMatch &&
        categoryMatch &&
        searchMatch
      );
    });
  };

  const pendingTasks = applyFilters(
    tasks.filter(
      (task) =>
        task.status === "Pending" ||
        (task.status === "Completed" &&
          shouldResetRecurringTask(task))
    )
  );

  const processingTasks = applyFilters(
    tasks.filter((task) => task.status === "Processing")
  );

  const completedTasks = applyFilters(
    tasks.filter(
      (task) =>
        task.status === "Completed" &&
        !shouldResetRecurringTask(task)
    )
  );

  const renderTaskList = (taskList, section) => {
    if (taskList.length === 0) {
      return <p>No {section} tasks found.</p>;
    }

    return taskList.map((task) => (
      <div className="task-card" key={task.$id}>
        {editingTaskId === task.$id ? (
          <div className="edit-form">
            <input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
            />

            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
            />

            <select
              name="priority"
              value={editForm.priority}
              onChange={handleEditChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button onClick={() => saveEdit(task.$id)}>
              Save
            </button>

            <button
              onClick={() => setEditingTaskId(null)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="task-meta">
                <small>{task.category}</small>
                <small>{task.priority}</small>
                <small>{task.repeatType}</small>
              </div>
            </div>

            <div className="task-actions">
              {task.status !== "Processing" && (
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      task.$id,
                      "Processing"
                    )
                  }
                >
                  <i className="bx bx-rotate-ccw"></i>
                </button>
              )}

              {task.status !== "Completed" && (
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      task.$id,
                      "Completed"
                    )
                  }
                >
                  <i className="bx bx-check"></i>
                </button>
              )}
            </div>

            <div className="menu-wrapper">
              <button
                className="menu-btn"
                onClick={() =>
                  setMenuOpen(
                    menuOpen === task.$id
                      ? null
                      : task.$id
                  )
                }
              >
                ⋮
              </button>

              {menuOpen === task.$id && (
                <div className="dropdown-menu">
                  <button
                    onClick={() => startEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task.$id)
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="tasks-page">
      <h1>My Tasks</h1>
      <div className="priority-tabs">
        {["All", "Low", "Medium", "High"].map((item) => (
          <button
            key={item}
            className={
              priorityFilter === item ? "active" : ""
            }
            onClick={() => setPriorityFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="category-slider">
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              categoryFilter === cat ? "active" : ""
            }
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section>
        <h2>Pending Tasks</h2>
        {renderTaskList(pendingTasks, "pending")}
      </section>

      <section>
        <h2>Processing Tasks</h2>
        {renderTaskList(processingTasks, "processing")}
      </section>

      <section>
        <h2>Completed Tasks</h2>
        {renderTaskList(completedTasks, "completed")}
      </section>
    </div>
  );
};

export default Tasks;