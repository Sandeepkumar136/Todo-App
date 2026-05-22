import React, { useEffect, useState } from "react";
import { useTaskSearch } from "../Context/TaskSearchContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserTasks } from "./TaskServices";

const TaskSuggestions = () => {
  const { searchQuery, setSearchQuery } = useTaskSearch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        const response = await getUserTasks(user.$id);
        setTasks(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [user]);

  if (!searchQuery.trim()) return null;

  const filteredTasks = tasks.filter((task) =>
    task.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSelect = (title) => {
    setSearchQuery(title);
    navigate("/tasks");
  };

  return (
    <div className="search-suggestions">
      {filteredTasks.length > 0 ? (
        filteredTasks.slice(0, 5).map((task) => (
          <div
            key={task.$id}
            className="suggestion-item"
            onClick={() => handleSelect(task.title)}
          >
            {task.title}
          </div>
        ))
      ) : (
        <div className="suggestion-item">
          No tasks found
        </div>
      )}
    </div>
  );
};

export default TaskSuggestions;