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
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const processingTasks = tasks.filter(
    (task) => task.status === "Processing"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const priorityData = [
    {
      name: "Low",
      value: tasks.filter(
        (task) => task.priority === "Low"
      ).length,
    },
    {
      name: "Medium",
      value: tasks.filter(
        (task) => task.priority === "Medium"
      ).length,
    },
    {
      name: "High",
      value: tasks.filter(
        (task) => task.priority === "High"
      ).length,
    },
  ];

  const categoryMap = {};
  tasks.forEach((task) => {
    categoryMap[task.category] =
      (categoryMap[task.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map(
    (key) => ({
      name: key,
      tasks: categoryMap[key],
    })
  );

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
  ];

  return (
    <div className="analytics-page">
      <h1>Analytics Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h2>{totalTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>{pendingTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Processing</h3>
          <h2>{processingTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{completedTasks}</h2>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Priority Breakdown</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {priorityData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Category Distribution</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="tasks"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="progress-card">
        <h3>Completion Rate</h3>

        <div className="progress-circle">
          <svg width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#6366f1"
              strokeWidth="12"
              fill="none"
              strokeDasharray={408}
              strokeDashoffset={
                408 -
                (408 * completionRate) / 100
              }
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>

          <div className="progress-text">
            {completionRate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;