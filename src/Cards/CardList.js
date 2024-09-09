import { useOutletContext, Link } from "react-router-dom";
import Card from "./Card";

function CardList() {
    const { cards, deckId, decks } = useOutletContext();
    const cardRequestType = "new";

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{`${decks.name}`}</li>
                </ol>
            </nav>
            <br />
            <div className="container w-65">
                <h2>{decks.name}</h2>
                <p>{decks.description}</p>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
                <Link to={`/decks/${deckId}/cards/${cardRequestType}`} className="btn btn-primary">Add Card</Link>
                <Link to={"#"} className="btn btn-danger float-right">Delete</Link>
            </div>
            <br />
            <div className="container w-65">
                <h2>Cards</h2>
                {cards.map((card) => (
                    <Card card={card} deckId={deckId} />
                ))}
            </div>
        </>
    )
};

export default CardList;