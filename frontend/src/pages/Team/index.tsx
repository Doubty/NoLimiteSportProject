import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import "./styles.css";
import TeamCard from "../../components/TeamCard";

const Team = () => {
    const team = [
        {
            id: 1,
            name: "Manoel Ricardo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img_url: "manoel.jpeg"
        },
        {
            id: 2,
            name: "Galvão Santos",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img_url: "galvao.jpeg"
        },
        {
            id: 3,
            name: "Jacó",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img_url: "jaco.jpeg"
        },
        {
            id: 4,
            name: "Leopoldo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img_url: "leopoldo.jpeg"
        }
    ]

    return (
        <>
            <NavBar/>

            <section className="team_section">
                <div className="container">
                    <div className="row">
                            <SectionTitle text="Equipe"/>

                            {team.map((teammate) =>
                                <TeamCard title={teammate.name} description={teammate.description} img_url={teammate.img_url}/>
                            )}
                    </div>
                </div>
            </section>

            <Footer/>            
        </>
    );
}

export default Team;