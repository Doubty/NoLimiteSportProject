import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import NavBar from "../../components/NavBar";
import gateway from "../../services/gateway";
import { User } from "../../types/user";
import "./styles.css"

const SignUp = () =>  {
    const [section, setSetion] = useState<number>(0);

    const handleNextSection = () => {
        if(section < 2)
            setSetion(section + 1);
    }

    const handleBackSection = () => {
        if(section > 0)
            setSetion(section - 1);
    }

    const [user, setUser] = useState<User>({
        rua: "",
        numero: "",
        bairro: "",
        complemento: "",
        cidade: "",
        estado: "",
        cep: "",
        email: "",
        senha: "",
        nome: "",
        telefoneCelular: "",
        telefoneFixo: "",
        cpf: "",
        sexo: "M",
        dataNascimento: "",
        tipoSanquineo: "A+",
        planoSaude: "",
        nivel: 0,
        temCamisa: "PP",
        groupPedal: 1,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const register = async () => {
        await gateway.post('/usuarios', user).then( res => {
            if (res.status === 201)
                // eslint-disable-next-line no-restricted-globals
                history.pushState("Usuário cadastrado!", "", "/login");
            else
                alert('Usuário não cadastrado');
        }).catch ( err => {
            console.log(err);
        });
    }

    return (
        <>
            <NavBar/>
            <section className="signUp_section">
                <div className="signUp_container">
                    <div className="image" style={{backgroundImage: "url('img/randomLogin.png')"}}></div>
                    <div className="signUp_form">
                        <h1>Cadastro</h1>
                        <form action="/">
                            <section className="signUp_section1" style={{display: section === 0 ? 'block' : 'none'}}>
                                <input type="text" name="nome" id="nome" placeholder="Nome" onChange={handleChange} />
                                <input type="email" className="input_login" name="email" placeholder="E-mail" onChange={handleChange}/>
                                <input type="password" className="input_login" name="senha" placeholder="Senha" onChange={handleChange}/>
                                <input type="text" placeholder="Telefone Fixo" name="telefoneFixo" onChange={handleChange}/>
                                <input type="text" placeholder="Telefone Celular" name="telefoneCelular" onChange={handleChange}/>
                                <input type="text" placeholder="CPF" name="cpf" onChange={handleChange}/>
                            </section>

                            <section className="signUp_section2" style={{display: section === 1 ? 'block' : 'none'}}>
                                <input type="text" name="rua" placeholder="Rua" onChange={handleChange}/>
                                <input type="text" name="numero" placeholder="Número" onChange={handleChange}/>
                                <input type="text" name="bairro" placeholder="Bairro" onChange={handleChange}/>
                                <input type="text" name="complemento" placeholder="Complemento" onChange={handleChange}/>
                                <input type="text" name="cidade" placeholder="Cidade" onChange={handleChange}/>
                                <input type="text" name="estado" placeholder="Estado" onChange={handleChange}/>
                                <input type="text" name="cep" placeholder="CEP" onChange={handleChange}/>
                            </section>     

                            <section className="signUp_section3" style={{display: section === 2 ? 'block' : 'none'}}>
                                <input type="text" name="planoSaude" placeholder="Plano de Saúde" onChange={handleChange}/>

                                <label htmlFor="tam_camisa">Tamanho da Camisa: </label>
                                <select value={user.temCamisa} name="temCamisa" id="tam_camisa" onChange={handleChange}>
                                    <option value="PP" selected>PP</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                </select>
                                <br/>
                                <label htmlFor="tipo_sanguineo">Tipo Sanguíneo: </label>
                                <select value={user.tipoSanquineo} name="tipoSanguineo" id="tipo_sanguineo" onChange={handleChange}>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                <br/>
                                <label htmlFor="sexo">Sexo: </label>
                                <select value={user.sexo} name="sexo" id="sexo" onChange={handleChange}>
                                    <option value="M" selected>Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                                <br/>
                                <label htmlFor="data_nascimento">Data de Nascimento: </label>
                                <input type="date" name="dataNascimento" id="data_nascimento" placeholder="Data de Nascimento" onChange={handleChange}/>
                            </section>                            

                            <div className="btn_signUp">
                                <button 
                                    type="button" className="btn_back" onClick={handleBackSection} style={{display: section === 0 ? 'none' : 'block'}}>
                                         <FontAwesomeIcon className="arrowL" icon={faArrowLeft} /> Voltar
                                </button>
                                <button 
                                    type="button" className="btn_next" onClick={handleNextSection} style={{display: section === 2 ? 'none' : 'block'}}>
                                        Próximo <FontAwesomeIcon className="arrowR" icon={faArrowRight} />
                                </button>
                                <button type="button" className="btn_login" style={{display: section === 2 ? 'block' : 'none'}} onClick={register}>Finalizar</button>
                            </div>    
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;