import "./styles.css";

interface Props {
    text: string;
}

const SectionTitle = ({ text } : Props) => {
    return (
        <>
            <h1 className="title_section">{text}</h1>
            <hr/>
        </>
    );
}

export default SectionTitle;