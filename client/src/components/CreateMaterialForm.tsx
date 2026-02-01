import { useEffect, useState } from "react";
import apiFetch from "../api";

type Category = {
  _id: string;
  name: string;
};

export default function CreateMaterialForm({ onCreated }: { onCreated: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    apiFetch("/categories?parent=null").then(setCategories);
  }, []);

  useEffect(() => {
    if (category) {
      apiFetch(`/categories?parent=${category}`).then(setSubcategories);
    }
  }, [category]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/materials", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        category,
        subcategory
      })
    });
    setTitle("");
    setContent("");
    onCreated();
  };

  return (
    <form onSubmit={submit} className="mb-4">
      <h4>Dodaj materiały</h4>

      <select
        className="form-select mb-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="">Kategoria</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        className="form-select mb-2"
        value={subcategory}
        onChange={e => setSubcategory(e.target.value)}
        required
      >
        <option value="">Podkategoria</option>
        {subcategories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Tytuł"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        className="form-control mb-2"
        placeholder="Treść"
        rows={5}
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />

      <button className="btn btn-primary">Dodaj</button>
    </form>
  );
}
