import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

interface Props {
    title: string;
    description: string;
    img_url: string;
    url: string;
    click?: MouseEventHandler<HTMLAnchorElement>;
}

const InfoCard = ({ title, description, img_url, url, click } : Props) => {
    return (
        <Link onClick={click !== undefined ? click : () => {}} to={url} className="event_card col-md-3" style={{backgroundImage: 'url(img/'+img_url+')',}}>
            <div className="event_info">
                <h2 className="event_title">{title}</h2>
                <p className="event_description">{description}</p>
            </div>
        </Link>
    );
}

export default InfoCard;