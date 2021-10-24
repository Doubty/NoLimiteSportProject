import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./styles.css";

const NavBar = () => {
    return (
        <>
        <div className="navbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2">
                        <div className="logoImg">
                            <img src={Logo} alt="No Limite Sport" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-7">
                        <ul className="navbar_links">
                            <li><Link className="navbar_link" to="/">Inicio</Link></li>
                            <li><Link className="navbar_link" to="/allProducts">Produtos</Link></li>
                            <li><Link className="navbar_link" to="/allEvents">Eventos</Link></li>
                            <li><Link className="navbar_link" to="/team">Equipe</Link></li>
                            <li><Link className="navbar_link" to="/">Contato</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="navbar_options">
                            <Link className="navbar_link" to="/login">Login</Link>
                            <Link className="navbar_link" to="/">Registre-se</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default NavBar;