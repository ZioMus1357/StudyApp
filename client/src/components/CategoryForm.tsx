import { useEffect, useState } from "react";
import apiFetch from "../api";

type Category = {
  _id: string;
  name: string;
};

type Props = {
  onCreated: () => void;
};

export default function CategoryForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    apiFetch("/categories?parent=null").then(setCategories);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await apiFetch("/categories", {
      method: "POST",
      body: JSON.stringify({
        name,
        parent
      })
    });

    setName("");
    setParent(null);
    onCreated();
  };

  return (
    <form onSubmit={submit} className="card p-3 mb-4">
      <h5>Dodaj kategorie</h5>

      <input
        className="form-control mb-2"
        placeholder="Nazwa kategorii"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <select
        className="form-select mb-2"
        value={parent || ""}
        onChange={e => setParent(e.target.value || null)}
      >
        <option value="">— kategoria główna —</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button className="btn btn-primary">Dodaj</button>
    </form>
  );
}
