import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { getAllUsers, deleteUser } from "../services/userServices";
import AuthForm from './AuthForm';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usuarios = await getAllUsers();
      setUsuarios(usuarios);
      console.log(usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        setUsuarios(usuarios.filter(usuario => usuario.ID !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Email</th>
            <th scope="col">Edad</th>
            <th scope="col">Estado</th>
            <th scope="col">Perfil</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.ID}>
              <th scope="row">{usuario.ID}</th>
              <td>{usuario.USUARIO}</td>
              <td>{usuario.NOMBRE}</td>
              <td>{usuario.CONTRASENA}</td>
              <td>{usuario.EMAIL}</td>
              <td>{usuario.EDAD}</td>
              <td>{usuario.ESTADO}</td>
              <td>{usuario.PERFIL}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Acciones
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(usuario.id)}>Editar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(usuario.ID)}>Eliminar</Dropdown.Item>
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
