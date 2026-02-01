import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AdminHome from "./pages/admin/AdminHome";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMaterials from "./pages/admin/AdminMaterials";

import Materials from "./pages/Materials";
import Subcategories from "./pages/Subcategories";
import MaterialsBySubcategory from "./pages/MaterialsBySubcategory";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials/:categoryId"
          element={
            <ProtectedRoute>
              <Subcategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials/:categoryId/:subId"
          element={
            <ProtectedRoute>
              <MaterialsBySubcategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/materials"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminMaterials />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </main>
    </>
  );
}
