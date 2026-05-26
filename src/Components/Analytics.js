import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getUserTasks } from "../Contents/TaskServices";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = () => {
  const { user } = useAuth();
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

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const processingTasks = tasks.filter(
    (task) => task.status === "Processing",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const priorityData = [
    {
      name: "Low",
      value: tasks.filter((task) => task.priority === "Low").length,
    },
    {
      name: "Medium",
      value: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      name: "High",
      value: tasks.filter((task) => task.priority === "High").length,
    },
  ];

  const categoryMap = {};
  tasks.forEach((task) => {
    categoryMap[task.category] = (categoryMap[task.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    tasks: categoryMap[key],
  }));

  const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Track task performance and productivity insights</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total-card">
          <div className="stat-icon">
            <i className="bx bx-task"></i>
          </div>
          <div>
            <h3>Total Tasks</h3>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="stat-card pending-card">
          <div className="stat-icon">
            <i className="bx bx-time"></i>
          </div>
          <div>
            <h3>Pending</h3>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="stat-card processing-card">
          <div className="stat-icon">
            <i className="bx bx-loader-circle"></i>
          </div>
          <div>
            <h3>Processing</h3>
            <h2>{processingTasks}</h2>
          </div>
        </div>

        <div className="stat-card completed-card">
          <div className="stat-icon">
            <i className="bx bx-check-circle"></i>
          </div>
          <div>
            <h3>Completed</h3>
            <h2>{completedTasks}</h2>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="card-header">
            <h3>Priority Breakdown</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Category Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <Tooltip
                cursor={{
                  fill: "rgba(99,102,241,0.08)",
                }}
              />
              <Legend />
              <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="progress-card">
        <div className="card-header">
          <h3>Completion Rate</h3>
        </div>

        <div className="progress-wrapper">
          <div className="progress-circle">
            <svg width="170" height="170">
              <circle
                cx="85"
                cy="85"
                r="68"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="85"
                cy="85"
                r="68"
                stroke="#6366f1"
                strokeWidth="12"
                fill="none"
                strokeDasharray={427}
                strokeDashoffset={427 - (427 * completionRate) / 100}
                strokeLinecap="round"
                transform="rotate(-90 85 85)"
              />
            </svg>

            <div className="progress-text">
              <span>{completionRate}%</span>
              <small>Completed</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
