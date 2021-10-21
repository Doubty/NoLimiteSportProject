import Logo from "../../assets/img/logo.png";
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn, faYoutube, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import "./styles.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 info_enterp container_item">
                            <img src={Logo} alt="No Limite Sport" />
                            <p>
                                A No Limite Sport Turismo e Marketing Esportivo, empresa especializada em realizar eventos esportivos, 
                                organizando viagens dentro e fora do território brasileiro.
                            </p>
                        </div>
                        <div className="col-md-3 info_address container_item">
                            <h2>Endereço</h2>
                            <p>
                                Av. Bezerra de Menezes, 188, sala 105
                                Fortaleza, Ceará, 60325003, Brasil
                            </p>
                        </div>
                        <div className="col-md-2 info_socials container_item">
                            <h2>Redes Sociais</h2>
                            <ul>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faTwitter } />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faFacebookF } />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faInstagram } />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faLinkedinIn } />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faYoutube } />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={ faPinterest } />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 site_pages container_item">
                            <h2>Páginas do Site</h2>
                            <ul>
                                <li><Link className="navbar_link" to="/">Inicio</Link></li>
                                <li><Link className="navbar_link" to="/">Produtos</Link></li>
                                <li><Link className="navbar_link" to="/">Eventos</Link></li>
                                <li><Link className="navbar_link" to="/">Equipe</Link></li>
                                <li><Link className="navbar_link" to="/">Contato</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="container">
                        © 2021 No Limite Sport
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;