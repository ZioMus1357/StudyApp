import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">StudyApp</h1>

      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary">
          Zaloguj się
        </Link>

        <Link to="/register" className="btn btn-outline-primary">
          Zarejestruj się
        </Link>
      </div>
    </div>
  );
}
