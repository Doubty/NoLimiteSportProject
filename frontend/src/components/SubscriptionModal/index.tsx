import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SportEvent } from "../../types/event";
import SectionTitle from "../SectionTitle";
import "./styles.css";

interface Props {
    ev: SportEvent;
    isOn: boolean;
}

const SubscriptionModal = ({ ev, isOn } : Props) => {
    return (
        <div className="subscrip_modal" style={{display: isOn ? "block" : "none"}}>
            <div className="subscrip_modal_header">
                <SectionTitle text="Inscrição"/>
                <FontAwesomeIcon className="close_btn" icon={faTimesCircle}/>
            </div>
            <div className="subscrip_modal_body">
                <h1 className="modal_title">Evento: {ev.titulo}</h1>
                <p>Local de destino: {ev.destino}</p>
                <p>Local de concentração: {ev.local_concentracao}</p>
                <p>Data de Saída: {ev.data_saida}</p>
                <p>Data de Retorno: {ev.data_retorno}</p>
                <p>Informações Comlementares: {ev.info_complementar}</p>
                <hr />
            </div>
            <div className="subscrip_modal_footer">
                <h1 className="modal_title">Formas de Pagamento: </h1>
                <select name="payment_method">
                    <option value="1">Pix</option>
                    <option value="2">Depósito</option>
                    <option value="3">Maquineta</option>
                    <option value="4">Link de Pagamento</option>
                </select>
                <br/>
                <button type="button" className="confirm_subscrip_btn">Confirmar</button>                
            </div>
        </div>
    );
}

export default SubscriptionModal;