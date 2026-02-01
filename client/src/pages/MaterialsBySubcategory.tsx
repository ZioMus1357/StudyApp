import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiFetch from "../api";

type Material = {
  _id: string;
  title: string;
  content: string;
};

export default function MaterialsBySubcategory() {
  const { subId } = useParams<{ subId: string }>();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [selected, setSelected] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subId) return;

    apiFetch(`/materials/subcategory/${subId}`)
      .then(setMaterials)
      .finally(() => setLoading(false));
  }, [subId]);

  if (loading) {
    return <div className="container py-4">Ładowanie materiałów...</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Materiały</h1>

      {materials.length === 0 && <p>Brak materia w tej kategorii.</p>}

      <div className="row">

        <div className="col-md-4">
          <ul className="list-group">
            {materials.map(mat => (
              <li
                key={mat._id}
                className={`list-group-item ${
                  selected?._id === mat._id ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(mat)}
              >
                {mat.title}
              </li>
            ))}
          </ul>
        </div>


        <div className="col-md-8">
          {selected ? (
            <div className="card">
              <div className="card-body">
                <h3>{selected.title}</h3>
                <hr />
                <p style={{ whiteSpace: "pre-line" }}>
                  {selected.content}
                </p>
              </div>
            </div>
          ) : (
            <p>Wybierz materiały do czytania.</p>
          )}
        </div>
      </div>
    </div>
  );
}
