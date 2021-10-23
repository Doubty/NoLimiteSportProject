import { Link } from "react-router-dom";
import "./styles.css";

interface Props {
    title: string;
    description: string;
    img_url: string;
    url: string;
}

const InfoCard = ({ title, description, img_url, url } : Props) => {
    return (
        <Link to={url} className="event_card col-md-3" style={{backgroundImage: 'url(img/event_imgs/'+img_url+')',}}>
            <div className="event_info">
                <h2 className="event_title">{title}</h2>
                <p className="event_description">{description}</p>
            </div>
        </Link>
    );
}

export default InfoCard;