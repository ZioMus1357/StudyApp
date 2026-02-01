import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../api";

type Category = {
  _id: string;
  name: string;
};

export default function Materials() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/categories?parent=null")
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Materiały do nauki</h1>

      <div className="list-group">
        {categories.map(c => (
          <Link
            key={c._id}
            to={`/materials/${c._id}`}
            className="list-group-item list-group-item-action"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
