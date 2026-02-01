import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Panel administratora</h1>

      <div className="list-group">
        <Link
          to="/admin/tasks"
          className="list-group-item list-group-item-action"
        >
           Zarządzanie zadaniami
        </Link>

        <Link
          to="/admin/categories"
          className="list-group-item list-group-item-action"
        >
           Zarządzanie kategoriami
        </Link>

        <Link
          to="/admin/materials"
          className="list-group-item list-group-item-action"
        >
           Zarządzanie materiałami
        </Link>
      </div>
    </div>
  );
}
