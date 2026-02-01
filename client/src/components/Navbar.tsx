import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        StudyApp
      </Link>

      <div className="navbar-nav ms-auto">
        {!user && (
          <>
            <Link className="nav-link" to="/login">Zaloguj</Link>
            <Link className="nav-link" to="/register">Zarejestruj</Link>
          </>
        )}

        {user && (
          <>
            <Link className="nav-link" to="/dashboard">
              Zadania
            </Link>

            <Link className="nav-link" to="/materials">
              Materiały
            </Link>

            {user.role === "admin" && (
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            )}

            <button
              className="btn btn-sm btn-outline-light ms-3"
              onClick={logout}
            >
              Wyloguj
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
