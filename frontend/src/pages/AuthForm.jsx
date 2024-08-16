import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AuthForm.css";
import { getAgeRanges } from "../services/AgeRangeServices";
import { validateUser, createUser, updateUser } from "../services/UserServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [ageRanges, setAgeRanges] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [userToEdit, setUserToEdit] = useState(null)
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState('Público');
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminContext = location.pathname.includes('/user-admin/create-user') || location.pathname.includes('/user-admin/edit-user')

  const tittle = isLogin ? "Diario Digital Tamagotchi" : userToEdit ? "Actualizar Usuario" : isAdminContext ? "Nuevo Usuario (Administración)" : "Crea una cuenta";
  const buttonText = isLogin ? "Crear cuenta nueva" : userToEdit ? "Actualizar" : isAdminContext ? "Crear Usuario" : "Registrarte";

  useEffect(() => {
    if (isAdminContext) {
      setIsLogin(false);
    }
  }, [isAdminContext]);

  useEffect(() => {
    fetchAgeRanges();

    if (location.state && location.state.userToEdit) {
      setIsLogin(false);
      const user = location.state.userToEdit
      setUserToEdit(user);
      setUsername(user.USUARIO);
      setPassword(user.DECRYPT);
      setName(user.NOMBRE);
      setEmail(user.EMAIL);
      setAge(user.EDAD);
      setStatus(user.ESTADO);
      setProfile(user.PERFIL)
    }
  }, [location.state]);

  const Mostrar = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async () => {
    if (isLogin) {
      setIsLogin(!isLogin);
    } else {
      try {
        if (userToEdit) {
          const response = await updateUser(userToEdit.ID, username, password, name, email, age, status, profile);
          console.log(response)
          if (response.message === 'User updated successfully'){
            navigate('/user-admin/listarUsuarios')
          } else if (response.message === "User already exists") {
            alert("El usuario ya existe");
          } else if (response.message === 'Incorrect password') {
            alert("La contraseña ingresada no cumple los requisitos:\n" +
              "- Mínimo 4 caracteres\n" +
              "- Al menos una mayuscula y una minuscula\n" +
              "- Al menos un número\n" +
              "- Al menos un caracter especial (@, $, !, %, *, ?, &, #, _)"
            );
          } else if (response.message === 'Incomplete data') {
            alert("Complete todos los campos");
          } else if (response.message === 'Incorrect email') {
            alert("El correo ingresado no es válido");
          } else{
            alert('Error al actualizar el usuario')
          }
        } else{
          const response = await createUser(username, password, name, email, age, status, profile);
          if (response.message === "User created successfully") {
            if (isAdminContext) {
              navigate('/user-admin/listarUsuarios')
            } else{
              setIsLogin(!isLogin);
              navigate("/");
            }
          } else if (response.message === "User already exists") {
            alert("El usuario ya existe");
          } else if (response.message === 'Incorrect password') {
            alert("La contraseña ingresada no cumple los requisitos:\n" +
              "- Mínimo 4 caracteres\n" +
              "- Al menos una mayuscula y una minuscula\n" +
              "- Al menos un número\n" +
              "- Al menos un caracter especial (@, $, !, %, *, ?, &, #, _)"
            );
          } else if (response.message === 'Incomplete data') {
            alert("Complete todos los campos");
          } else if (response.message === 'Incorrect email') {
            alert("El correo ingresado no es válido");
          } else {
            alert("Error al crear usuario");
          }
        }
      } catch (error) {
        console.error("Error al manejar la solicitud:", error);
        alert("Error al manejar la solicitud");
      }
    }
  };

  const fetchAgeRanges = async () => {
    const ageRanges = await getAgeRanges();
    setAgeRanges(ageRanges);
    console.log(ageRanges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await validateUser(username, password);
      if (response.message === "Valid user credentials") {
        const { user } = response;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ USUARIO: username, PERFILADMINISTRADOR: user.PERFILADMINISTRADOR })
        );
        if (user.PERFILADMINISTRADOR === 1) {
          navigate('/user-admin')
        } else{
          navigate("/diario");
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al validar usuario:", error);
      alert("Error al validar usuario");
    }
  };

  return (
    <div className="principal-container">
      <div className="form-container">
        {!isLogin && !userToEdit && !isAdminContext && (
          <button onClick={() => setIsLogin(true)} id='back-to-login'>X</button>
        )}
        <h1>{tittle}</h1>
        <form id="access-form" onSubmit={handleSubmit}>
          <label htmlFor="user">Usuario:</label>
          <input
            type="text"
            id="user"
            aria-label="user"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <label htmlFor="password">Contraseña:</label>
          <div className="mostrar-contraseña">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              aria-label="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              type="button"
              className="boton-mostrar"
              onClick={Mostrar}
            >
              {showPassword ?  <FaEye />:<FaEyeSlash /> }
            </span>
          </div>

          {isLogin ? (
            <button type="submit">Entrar</button>
          ) : (
            <>
              <h5>Datos Personales</h5>
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                aria-label="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Email</label>
              <input
                type="email"
                id="email"
                aria-label="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="age">Edad</label>
              <select
                id="age"
                name="age"
                aria-label="age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Selecciona un rando de edad</option>
                {ageRanges.map((ageRange) => {
                  return (
                    <option key={ageRange.RANGOEDAD} value={ageRange.RANGOEDAD}>
                      {ageRange.RANGOEDAD}
                    </option>
                  );
                })}
              </select>
              {(isAdminContext || userToEdit) && (
                <>
                  <label htmlFor="status">Estado</label>
                  <select
                    id="status"
                    name="status"
                    aria-label="status"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>

                  <label htmlFor="profile">Perfil</label>
                  <select
                    id="profile"
                    name="profile"
                    aria-label="profile"
                    required
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Público">Público</option>
                  </select>
                </>
              )}
            </>
          )}
        </form>
        <button onClick={handleClick} id="button-form">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
