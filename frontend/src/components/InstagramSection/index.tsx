import { Link } from "react-router-dom";
import "./styles.css";

const InstagramSection = () => {
    return(
        <>
            <section className="instagram_section">
                <p className="instagram_section_paragr">
                Siga-nos no Instagram
                <br/>
                <Link to="https://www.instagram.com/nolimitesportce/" className="instagram_link">@nolimitesportce</Link>
                </p>
            </section>
        </>
    );
}

export default InstagramSection;