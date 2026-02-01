import { useEffect, useState } from "react";
import apiFetch from "../../api";
import CreateTaskForm from "../../components/CreateTaskForm";

type Task = {
  _id: string;
  title: string;
  description: string;
  isGlobal: boolean;
};

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/tasks");
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;

    try {
      await apiFetch(`/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Zarządzanie zadaniami</h1>


      <CreateTaskForm onCreated={loadTasks} />


      <h3 className="mt-4">Zadania globalne</h3>

      {loading && <p>Ładowanie...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && tasks.length === 0 && <p>Brak zadań</p>}

      <div className="list-group">
        {tasks.map(task => (
          <div
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <h5 className="mb-1">{task.title}</h5>
              <p className="mb-1">{task.description}</p>
              <small className="text-muted">
                {task.isGlobal ? "Global task" : "Assigned task"}
              </small>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(task._id)}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
