import { SportEvent } from "../../types/event";
import "./styles.css";

interface Props {
    ev: SportEvent
}

const EventCard = ({ ev } : Props) => {
    return (
        <div className="event_card col-md-3" key={ev.id} style={{backgroundImage: 'url(img/event_imgs/'+ev.img_url+')',}}>
            <div className="event_info">
                <h2 className="event_title">{ev.title}</h2>
                <p className="event_description">{ev.description}</p>
            </div>
        </div>
    );
}

export default EventCard;