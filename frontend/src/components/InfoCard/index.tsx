import "./styles.css";

interface Props {
    title: string;
    description: string;
    img_url: string;
}

const InfoCard = ({ title, description, img_url } : Props) => {
    return (
        <div className="event_card col-md-3" style={{backgroundImage: 'url(img/event_imgs/'+img_url+')',}}>
            <div className="event_info">
                <h2 className="event_title">{title}</h2>
                <p className="event_description">{description}</p>
            </div>
        </div>
    );
}

export default InfoCard;