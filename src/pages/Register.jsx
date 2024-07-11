import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    return(
        <div className="registerContainer">
            <div id='registerForm'>
                <h2>Registrarse</h2>
                <form id="formularioRegistro">
                    <label>Nuevo Usuario:</label>
                    <input 
                        type= 'text'
                        id= 'nuevoUsuario'
                        required
                    />
                    <label>Nueva Contraseña:</label>
                    <input
                        type= 'password'
                        id= 'nuevaContrasena'
                        required
                    />
                    <div id="buttonsForm">
                        <Link to={'/'}>
                            <button type='submit'>Registrarse</button>
                        </Link>
                        <Link to={'/registrarse'}>
                            <button type='button'>Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
    
export default Register;