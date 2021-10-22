import "./styles.css";

interface Props {
    title: string;
    description: string;
    img_url: string;
}

const TeamCard = ({ title, description, img_url } : Props) => {
    return (
        <div className="team_card col-md-3">
            <div className="teammate_perfil" style={{backgroundImage: 'url(img/team_imgs/'+img_url+')',}}></div>
            <div className="team_info">
                <h2 className="teammate">{title}</h2>
                <p className="teammate_descr">{description}</p>
            </div>
        </div>
    );
}

export default TeamCard;