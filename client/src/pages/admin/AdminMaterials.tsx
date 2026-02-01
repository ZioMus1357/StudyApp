import { useState } from "react";
import CreateMaterialForm from "../../components/CreateMaterialForm";

export default function AdminMaterials() {
  const [, setRefresh] = useState(0);

  return (
    <div className="container py-4">
      <h1>Zarządzaj materiałami</h1>
      <CreateMaterialForm onCreated={() => setRefresh(x => x + 1)} />
    </div>
  );
}
