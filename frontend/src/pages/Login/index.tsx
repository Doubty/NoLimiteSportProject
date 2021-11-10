import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./styles.css"

const Login = () =>  {
    return (
        <>
            <NavBar/>
            <section className="login_section">
                <div className="login_container">
                    <div className="image" style={{backgroundImage: "url('img/randomLogin.png')"}}></div>
                    <div className="login_form">
                        <h1>No Limite Sport</h1>
                        <form action="/dashboard">
                            <input type="email" className="input_login" name="email" placeholder="E-mail"/>
                            <input type="password" className="input_login" name="passw" placeholder="Senha"/>
                            <button type="submit" className="btn_login">Entrar</button>
                        </form>
                        <br/>
                        <Link to="/signUp" className="btn_signIn">Registrar-se</Link>
                        <br/>
                        <br/>
                        <Link to="/" className="link_forgotPassw">Esqueci a senha</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;