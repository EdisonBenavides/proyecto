import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { getAgeRanges, deleteAgeRange } from "../services/AgeRangeServices";
import { useNavigate } from "react-router-dom";

export default function ListAges() {
  const [ages, setAges] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchAges();
  }, []);

  const fetchAges = async () => {
    try {
      const ages = await getAgeRanges();
      setAges(ages);
      console.log(ages);
    } catch (error) {
      console.error("Error al obtener los rangos de edad:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este rango de edad?")) {
      try {
        await deleteAgeRange(id);
        setAges(ages.filter(age => age.ID !== id));
      } catch (error) {
        console.error("Error al eliminar el rango de edad:", error);
      }
    }
  }

  const handleEdit = (age) => {
    navigate(`/user-admin/edit-age/${age.ID}`)
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Rango de Edad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ages.map((age) => (
            <tr key={age.ID}>
              <th scope="row">{age.ID}</th>
              <td>{age.RANGOEDAD}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Acciones
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(age)}>Editar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(age.ID)}>Eliminar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}