import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import NavBar from "../../components/NavBar";
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
                                <input type="text" name="nome" id="nome" placeholder="Nome" />
                                <input type="email" className="input_login" name="email" placeholder="E-mail"/>
                                <input type="password" className="input_login" name="passw" placeholder="Senha"/>
                                <input type="text" placeholder="Telefone Fixo" name="telefone_fixo"/>
                                <input type="text" placeholder="Telefone Celular" name="telefone_celular"/>
                                <input type="text" placeholder="CPF" name="cpf"/>
                            </section>

                            <section className="signUp_section2" style={{display: section === 1 ? 'block' : 'none'}}>
                                <input type="text" placeholder="Rua" />
                                <input type="text" placeholder="Número" />
                                <input type="text" placeholder="Bairro" />
                                <input type="text" placeholder="Complemento" />
                                <input type="text" placeholder="Cidade" />
                                <input type="text" placeholder="Estado" />
                                <input type="text" placeholder="CEP" />
                            </section>     

                            <section className="signUp_section3" style={{display: section === 2 ? 'block' : 'none'}}>
                                <input type="text" placeholder="Plano de Saúde" />

                                <label htmlFor="tam_camisa">Tamanho da Camisa: </label>
                                <select name="tam_camisa" id="tam_camisa">
                                    <option value="PP">PP</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                </select>
                                <br/>
                                <label htmlFor="tipo_sanguineo">Tipo Sanguíneo: </label>
                                <select name="tipo_sanguineo" id="tipo_sanguineo">
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
                                <select name="sexo" id="sexo">
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                                <br/>
                                <label htmlFor="data_nascimento">Data de Nascimento: </label>
                                <input type="date" name="data_nascimento" id="data_nascimento" placeholder="Data de Nascimento"/>
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
                                <button type="submit" className="btn_login" style={{display: section === 2 ? 'block' : 'none'}}>Finalizar</button>
                            </div>    
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;