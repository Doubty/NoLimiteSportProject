import InfoCard from "../../components/InfoCard";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SportEvent } from "../../types/event";
import gateway from "../../services/gateway";

const Home = () => {
    const [events, setEvents] = useState<SportEvent[]>();

    useEffect(() => {
        gateway.get("/eventos").then(res => {
            setEvents(res.data);
        });
    }, []);

    return (
        <>
            <NavBar/>

            <section className="events_section">
                <div className="container">
                    <div className="row">
                            <SectionTitle text="Eventos"/>

                            {
                                (events !== undefined) ? 
                                events.slice(0, 6).map((event) =>
                                    <InfoCard key={event.id} url={"/event/" + event.id} title={event.titulo} description={event.descricao} img_url={"/event_imgs/event1.png"}/>
                                ) :
                                <p>Não há eventos</p>
                            }
                    </div>
                    <Link to="allEvents" className="seeMoreEvents">Ver mais</Link>
                </div>
            </section>

            <section className="motivationalVitrine">
                <p className="motivationalVitrine_paragr">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                </p>
            </section>

            <InstagramSection/>

            <Footer/>            
        </>
    );
}

export default Home;