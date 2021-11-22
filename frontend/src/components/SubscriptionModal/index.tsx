import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { isAuthenticated } from "../../services/auth";
import gateway from "../../services/gateway";
import { SportEvent } from "../../types/event";
import SectionTitle from "../SectionTitle";
import "./styles.css";

interface Props {
    ev: SportEvent;
    isOn: boolean;
    closeModalFunc: Function;
}

const SubscriptionModal = ({ ev, isOn, closeModalFunc } : Props) => {
    const [paymentMet, setPaymentMet] = useState<string>("Pix");

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaymentMet(event.target.value);
    }

    const history = useHistory();

    const subscribe = () => {
        if (isAuthenticated()) {
            gateway.post("eventos/inscricoes", {
                tipoPagamento: paymentMet,
                eventoId: ""+ev.id
            }).then( res => {
                if (res.status >= 200 && res.status < 300) {
                    Swal.fire("Inscrição realizada", "", "success");
                    history.push("/dashboard");
                } else {
                    Swal.fire("Erro ao realizar inscrição", "", "error");
                }
            }).catch(() => {
                Swal.fire("Erro ao realizar inscrição", "", "error");
            });
        }
    }

    return (
            <div className="modal_container" style={{display: isOn ? "block" : "none"}}>
                <div className="subscrip_modal">
                    <div className="subscrip_modal_header">
                        <SectionTitle text="Inscrição"/>
                        <FontAwesomeIcon className="close_btn" icon={faTimesCircle} onClick={()=> {closeModalFunc()}}/>
                    </div>
                    <div className="subscrip_modal_body">
                        <h1 className="modal_title">Evento: {ev.titulo}</h1>
                        <p>Local de destino: {ev.destino}</p>
                        <p>Local de concentração: {ev.localConcentracao}</p>
                        <p>Data de Saída: {ev.dataSaida}</p>
                        <p>Data de Retorno: {ev.dataRetorno}</p>
                        <p>Informações Comlementares: {ev.infoComplementar}</p>
                        <hr />
                    </div>
                    <div className="subscrip_modal_footer">
                        <h1 className="modal_title">Formas de Pagamento: </h1>
                        <select value={paymentMet} name="payment_method" onChange={handleChange}>
                            <option value="Pix">Pix</option>
                            <option value="Deposito">Depósito</option>
                            <option value="Maquineta">Maquineta</option>
                            <option value="Link">Link de Pagamento</option>
                        </select>
                        <br/>
                        <button type="button" className="confirm_subscrip_btn" onClick={subscribe}>Confirmar</button>                
                    </div>
                </div>
            </div>
    );
}

export default SubscriptionModal;