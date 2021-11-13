import InfoCard from "../../components/InfoCard";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import { mockEvents } from "../../mockData";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SportEvent } from "../../types/event";

const AllEvents = () => {
    const [events, setEvents] = useState<SportEvent[]>(mockEvents);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (value === "") {
            setEvents(mockEvents);
            return;
        }

        const searchedValues = events.filter(event => event.titulo.includes(value));
        setEvents(searchedValues);
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

                            {events.map((event) =>
                                <InfoCard url={`/event/${event.id}`} key={event.id} title={event.titulo} description={event.descricao} img_url={"/event_imgs/" + event.bannerUrl}/>
                            )}
                    </div>
                </div>
            </section>

            <InstagramSection/>

            <Footer/>            
        </>
    );
}

export default AllEvents;