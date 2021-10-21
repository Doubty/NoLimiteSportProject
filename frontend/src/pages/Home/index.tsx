import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
//import { SportEvent } from "../../types/event";
import "./styles.css";

const Home = () => {
    const mockEvents = [
        {
            id: 1,
            title: "Natal - Fortaleza",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event1.png" 
        },
        {
            id: 2,
            title: "Corrida Solidária",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event2.png" 
        },
        {
            id: 3,
            title: "Ciclismo na praia",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event1.png" 
        },
        {
            id: 4,
            title: "Corrida Padre Cícero",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event2.png" 
        },

        {
            id: 5,
            title: "Corrida Padre Cícero 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event2.png" 
        },

        {
            id: 6,
            title: "Corrida Padre Cícero 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event2.png" 
        },

        {
            id: 7,
            title: "Corrida Padre Cícero 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img_url: "event2.png" 
        }
    ];

    return (
        <>
            <NavBar/>

            <section className="events_section">
                <div className="container">
                    <div className="row">
                            <h1 className="title_section">Eventos</h1>
                            <hr />

                            {mockEvents.slice(0, 6).map((event) =>
                                <EventCard ev={event}/>
                            )}
                    </div>
                    <button type="button" className="seeMore">Ver mais</button>
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