import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap'; // Importa el componente Dropdown de Bootstrap

export default function ListUsuarios() {
  const [usuarios, setUser] = useState([]);
  
  useEffect(() => {
    fetchUser();
  }, []); // Agrega un array vacío como dependencia para que se ejecute solo una vez

  const fetchUser = async () => {
    const usuarios = await getUser();
    setUser(usuarios);
    console.log(usuarios);
  };

  const handleEdit = (id) => {
    // Lógica para editar el usuario con el ID proporcionado
    console.log(`Editar usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el usuario con el ID proporcionado
    console.log(`Eliminar usuario con ID: ${id}`);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de Usuario</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rango de Edad</th>
            <th scope="col">Acciones</th> {/* Columna para el botón de acciones */}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <th scope="row">{usuario.id}</th>
              <td>{usuario.name}</td>
              <td>{usuario.namecompleto}</td>
              <td>{usuario.password}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rangoedad}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Acciones
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(usuario.id)}>Editar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(usuario.id)}>Eliminar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
                    <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>dasd</td>
            <td>sdaasd</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
