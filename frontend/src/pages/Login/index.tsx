import { ChangeEvent, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../../components/NavBar";
import { login } from "../../services/auth";
import api from "../../services/gateway";
import "./styles.css"

interface state {
    status: boolean;
}

const Login = () =>  {
    const location = useLocation<state>();

    if(location.state?.status)
        Swal.fire("O usuário foi cadastrado", "", "success");

    const [user, setUser] = useState({
        email: "",
        senha: ""
    });

    const history = useHistory();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const handleLogin = async () => {
        await api.post('/login', user).then(res => {
            const jwtToken = res.headers.authorization;
            if (jwtToken !== null) {
                login(jwtToken);
                history.push('/dashboard');
            } else {
                Swal.fire("O cadastro falhou!", "", "error");
            }
          }).catch(err => console.error(err));
    }

    return (
        <>
            <NavBar/>
            <section className="login_section">
                <div className="login_container">
                    <div className="image" style={{backgroundImage: "url('img/randomLogin.png')"}}></div>
                    <div className="login_form">
                        <h1>No Limite Sport</h1>
                        <form action="">
                            <input type="email" className="input_login" name="email" placeholder="E-mail" onChange={handleChange}/>
                            <input type="password" className="input_login" name="senha" placeholder="Senha" onChange={handleChange}/>
                            <button type="button" className="btn_login" onClick={handleLogin}>Entrar</button>
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