import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAgeRanges, updateAgeRange, createAgeRange } from "../services/AgeRangeServices";

export default function AdminAgeRanges() {
  const { id } = useParams();
  const [ageRange, setAgeRange] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true)
      fetchAgeRange();
    }
  }, [id]);

  const fetchAgeRange = async () => {
    try {
      const ageRanges = await getAgeRanges();
      const age = ageRanges.find((age) => age.ID === parseInt(id))
      setAgeRange(age.RANGOEDAD);
    } catch (error) {
      console.error("Error al obtener el rango de edad:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateAgeRange(id, ageRange)
      } else{
        await createAgeRange(ageRange)
      }
      navigate("/user-admin/list-ages");
    } catch (error) {
      console.error("Error al guardar el rango de edad:", error);
      alert("Error al guardar el rango de edad.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{isEditing ? "Editar" : "Crear"} Rango de Edad</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', width: '30%', fontWeight: 'bold', fontSize: '18px' }}>
        <label htmlFor="ageRange" style={{ marginRight: '1vh' }}>Rango de Edad: </label>
        <input
          type="text"
          id="ageRange"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? "Guardar Cambios" : "Crear Rango de Edad"}</button>
        <button type="button" onClick={() => navigate("/user-admin/list-ages")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}