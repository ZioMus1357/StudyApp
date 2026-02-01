import { useEffect, useState } from "react";
import apiFetch from "../api";

type Task = {
  _id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    apiFetch("/tasks/my")
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);


  const toggleDone = async (taskId: string) => {
    try {
      await apiFetch(`/tasks/${taskId}/toggle`, {
        method: "POST",
      });

      
      setTasks(tasks =>
        tasks.map(task =>
          task._id === taskId
            ? { ...task, done: !task.done }
            : task
        )
      );
    } catch {
      alert("Failed to update task status");
    }
  };

  if (loading) return <div className="container py-4">Ładowanie...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Moje zadania</h1>

      {tasks.length === 0 && <p>Brak zadań do wyświetlenia</p>}

      <div className="list-group">
        {tasks.map(task => (
          <div
            key={task._id}
            className={`list-group-item d-flex justify-content-between align-items-start ${
              task.done ? "list-group-item-success" : ""
            }`}
          >
            <div>
              <h5
                className={
                  task.done ? "text-decoration-line-through" : ""
                }
              >
                {task.title}
              </h5>
              <p className="mb-1">{task.description}</p>
            </div>

            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task._id)}
              />
              <label className="form-check-label">
                Zrobione
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
