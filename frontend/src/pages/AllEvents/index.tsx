import InfoCard from "../../components/InfoCard";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SportEvent } from "../../types/event";
import gateway from "../../services/gateway";

const AllEvents = () => {
    const [events, setEvents] = useState<SportEvent[]>();

    useEffect(() => {
        gateway.get("/eventos").then(res => {
            setEvents(res.data);
        });
    }, []);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (value === "") {
            gateway.get("/eventos").then(res => {
                setEvents(res.data);
            });
            return;
        }

        if (events !== undefined) {
            const searchedValues = events.filter(event => event.titulo.includes(value));
            setEvents(searchedValues);
        }
    }

    return (
        <>
            <NavBar/>

            <section className="allEvents_section">
                <div className="container">
                    <div className="row">
                            <SectionTitle text="Todos os Eventos"/>

                            <div className="searchBar col-sm-12">
                                <input type="text" name="searchEvent" id="searchEvent" placeholder="Digite o nome de um evento..." onChange={handleInputChange}/>
                                <FontAwesomeIcon className="icon-search" icon={ faSearch } />
                            </div>

                            {
                                (events !== undefined) ? 
                                events.map((event) =>
                                    <InfoCard key={event.id} url={"/event/" + event.id} title={event.titulo} description={event.descricao} img_url={"/event_imgs/event1.png"}/>
                                ) :
                                <p>Não há eventos</p>
                            }
                    </div>
                </div>
            </section>

            <InstagramSection/>

            <Footer/>            
        </>
    );
}

export default AllEvents;