import { Link, useOutletContext } from "react-router-dom";

function NotEnoughCards() {
    const { decks, deckId } = useOutletContext();
    const cardRequestType = "new"

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{`${decks.name}`}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <br />
            <h2>{`${decks.name}: Study`}</h2>
            <br />
            <h3>Not Enough Cards</h3>
            <br />
            <p>You need at least 3 cards to study</p>
            <br />
            <Link to={`/decks/${deckId}/cards/${cardRequestType}`} className="btn btn-primary">Add Card</Link>
        </>

    )
};

export default NotEnoughCards;