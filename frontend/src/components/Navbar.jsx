import { Link } from "react-router-dom"

export default function NavBar() {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Diario Digital Tamagotchi</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to={'/user-admin'} className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administrar
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to={'/user-admin/listarUsuarios'}>Usuarios</Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to={'/user-admin/list-ages'}>Rangos de edad</Link>
                    </li>
                </ul>

                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Crear
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to={'/user-admin/create-user'}>Nuevo Usuario</Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to={'/user-admin/create-age'}>Nuevo rango de edad</Link>
                    </li>
                </ul>
                </li>
                <li className="nav-item">
                <Link to={'/'} className="nav-link active" aria-current="page">Salir</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}