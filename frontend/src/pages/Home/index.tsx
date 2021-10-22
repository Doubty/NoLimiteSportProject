import InfoCard from "../../components/InfoCard";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import { mockEvents } from "../../mockData";
//import { SportEvent } from "../../types/event";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <NavBar/>

            <section className="events_section">
                <div className="container">
                    <div className="row">
                            <SectionTitle text="Eventos"/>

                            {mockEvents.slice(0, 6).map((event) =>
                                <InfoCard title={event.title} description={event.description} img_url={event.img_url}/>
                            )}
                    </div>
                    <Link to="allEvents" className="seeMore">Ver mais</Link>
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