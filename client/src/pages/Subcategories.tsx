import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiFetch from "../api";

type Category = {
  _id: string;
  name: string;
};

export default function Subcategories() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/categories?parent=${categoryId}`)
      .then(setSubcategories)
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Podkategorie</h1>

      {subcategories.length === 0 && (
        <p>Brak podkategorii</p>
      )}

      <div className="list-group">
        {subcategories.map(c => (
          <Link
            key={c._id}
            to={`/materials/${categoryId}/${c._id}`}
            className="list-group-item list-group-item-action"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
