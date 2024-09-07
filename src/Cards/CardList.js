import { useOutletContext, Link } from "react-router-dom";
import Card from "./Card";

function CardList() {
    const { cards, deckId, decks } = useOutletContext();

    return (
        <>
            <div className="container w-65">
                <h2>{decks.name}</h2>
                <p>{decks.description}</p>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
                <Link to={"#"} className="btn btn-primary">Study</Link>
                <Link to={"#"} className="btn btn-primary">Add Cards</Link>
                <Link to={"#"} className="btn btn-danger float-right">Delete</Link>
            </div>
            <br />
            <div className="container w-65">
                <h2>Cards</h2>
                {cards.map((card) => (
                    <Card card={card} />
                ))}
            </div>
        </>
    )
};

export default CardList;