import { useEffect, useState } from "react";
import apiFetch from "../../api";
import CategoryForm from "../../components/CategoryForm";

type Category = {
  _id: string;
  name: string;
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [children, setChildren] = useState<Category[]>([]);

  const loadRoot = () => {
    apiFetch("/categories?parent=null").then(setCategories);
  };

  const loadChildren = (id: string) => {
    apiFetch(`/categories?parent=${id}`).then(setChildren);
  };

  useEffect(() => {
    loadRoot();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Usunąć kategorie?")) return;
    await apiFetch(`/categories/${id}`, { method: "DELETE" });
    loadRoot();
    if (selected) loadChildren(selected._id);
  };

  return (
    <div className="container py-4">
      <h1>Zarządzanie kategoriami</h1>

      <CategoryForm onCreated={loadRoot} />

      <div className="row">
        <div className="col-md-6">
          <h4>Główne kategorie</h4>
          <ul className="list-group">
            {categories.map(c => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between"
              >
                <span
                  role="button"
                  onClick={() => {
                    setSelected(c);
                    loadChildren(c._id);
                  }}
                >
                  {c.name}
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => remove(c._id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h4>Podkategorie</h4>

          {!selected && <p>Wybierz kategorie</p>}

          {selected && (
            <>
              <p>
                Kategoria główna: <strong>{selected.name}</strong>
              </p>

              <ul className="list-group">
                {children.map(c => (
                  <li
                    key={c._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {c.name}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => remove(c._id)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
