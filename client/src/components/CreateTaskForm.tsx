import { useEffect, useState } from "react";
import apiFetch from "../api";

type User = {
  _id: string;
  email: string;
};

export default function CreateTaskForm({
  onCreated
}: {
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGlobal, setIsGlobal] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  useEffect(() => {
    apiFetch("/users")
      .then(setUsers)
      .catch(() => setError("Failed to load users"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          isGlobal,
          assignedTo: isGlobal ? [] : assignedTo
        })
      });

      onCreated();
      setTitle("");
      setDescription("");
      setAssignedTo([]);
      setIsGlobal(true);
      setSuccess("Zadanie utworzone pomyślnie");
    } catch {
      setError("Błąd przy tworzeniu zadania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h3 className="mb-3">Utwórz nowe zadanie</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Tytuł</label>
          <input
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Opis</label>
          <textarea
            className="form-control"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

       
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isGlobal}
            onChange={e => setIsGlobal(e.target.checked)}
          />
          <label className="form-check-label">
            Przypisz do wszystkich użytkowników (global task)
          </label>
        </div>

        
        {!isGlobal && (
        <div className="mb-3">
            <label className="form-label">Wybierz użytkowników do przypisania</label>

            <div className="border rounded p-2" style={{ maxHeight: 200, overflowY: "auto" }}>
            {users.map(u => (
                <div className="form-check" key={u._id}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={assignedTo.includes(u._id)}
                    onChange={e => {
                    if (e.target.checked) {
                        setAssignedTo([...assignedTo, u._id]);
                    } else {
                        setAssignedTo(assignedTo.filter(id => id !== u._id));
                    }
                    }}
                />
                <label className="form-check-label">
                    {u.email}
                </label>
                </div>
            ))}
            </div>
        </div>
        )}


        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Tworzenie..." : "Utwórz zadania"}
        </button>
      </form>
    </div>
  );
}
