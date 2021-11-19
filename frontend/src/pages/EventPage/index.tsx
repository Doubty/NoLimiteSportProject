import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import { SportEvent } from "../../types/event";
import "./styles.css";
import SubscriptionModal from "../../components/SubscriptionModal";
import gateway from "../../services/gateway";

const EventPage = () => {
    const [modalOn, setModalOn] = useState<boolean>(false);
    const [event, setEvent] = useState<SportEvent>({
        id: -1,
        bannerUrl: "",
        titulo: "",
        descricao: "",
        dataSaida: "",
        dataRetorno: "",
        localConcentracao: "",
        destino: "",
        qtdVagas: 0,
        ritmo: "",
        tipoEvento: "",
        infoComplementar: "",
        valorInscricao: 0
    });
    const { eventId } = useParams<{eventId: string}>();

    useEffect(() => {
        gateway.get("/eventos/search/byId?id="+eventId).then(res => {
            const theEvent = res.data;
            if (theEvent !== undefined)
                setEvent(theEvent);
        });
    }, [eventId]);

    const showModal = () => {
        setModalOn(true);
    }

    const closeModal = () => {
        setModalOn(false);
    }

    return (
        <>
            <NavBar/>
            <section className="event_section">
                <img src={"/img/event_imgs/event1.png"} alt="Banner do evento" className="event_banner"/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <SectionTitle text={event?.titulo || ""}/>
                            <div className="event_description">
                                {event?.descricao}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <SectionTitle text="Datas"/>
                            <div className="event_dates">
                                <p>Saída: {event?.dataSaida}</p>
                                <p>Retorno: {event?.dataRetorno}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <SectionTitle text="Locais"/>
                            <div className="event_locals">
                                <p>Destino: {event?.destino}</p>
                                <p>Local de Concentração: {event?.localConcentracao}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <SectionTitle text="Ritmo e Tipo"/>
                            <div className="event_dates">
                                <p>Ritmo: {event?.ritmo}</p>
                                <p>Tipo: {event?.tipoEvento}</p>
                            </div>
                        </div>
                        <div className="col-md-12 event_infos_container">
                            <SectionTitle text="Informações Complementares"/>
                            <div className="event_infos">
                                {event?.infoComplementar}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <SectionTitle text="Patrocinadores"/>
                            <img src={"/img/partner_imgs/partner1.png"} alt="Lojas Parceiras" className="event_partners"/>
                        </div>
                        <div className="col-md-12">
                            <SectionTitle text="Formas de Pagamento"/>
                            <div className="event_payments">
                                Pix, Depósito, Maquineta ou Link de Pagamento.
                            </div>
                        </div>
                        <div className="col-md-12 subscribe_section">
                            <SectionTitle text={"Valor da Inscrição: R$ " + event?.valorInscricao}/>
                            <button type="button" className="subscribe_btn" onClick={showModal}>Me inscrever <FontAwesomeIcon className="arrow" icon={faArrowRight} /></button>
                        </div>
                    </div>
                </div>
            </section>
            <SubscriptionModal closeModalFunc={closeModal} ev={event} isOn={modalOn}/>
            <Footer/>
        </>
    );
}

export default EventPage;