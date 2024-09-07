import { Link } from "react-router-dom";

function Deck({ name, description, deckId }) {
    return (
        <>
            <div className="card w-75">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className="card-text">{description}</p>
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">View</Link>
                    <Link to={`/decks/${deckId}/study`}className="btn btn-primary">Study</Link>
                    <Link to={"#"} className="btn btn-danger float-right">Delete</Link>
                </div>
            </div>
            <br />
        </>
    )
};

export default Deck;