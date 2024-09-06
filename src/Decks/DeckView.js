import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import Card from "../Cards/Card";

function DeckView() {
    const [decks, setDecks] = useState(null);
    const { deckId } = useParams()
        
    useEffect(() => {
        async function fetchDeck() {
            const response = await readDeck(deckId);
            setDecks(response);
        }
        fetchDeck()

    }, [])

    if (!decks) {
        return <h2>Loading...</h2>
    }
    
    const cards = decks.cards;
    
    return (
        <>
            <div className="container w-65">
                <h2>{decks.name}</h2>
                <p>{decks.description}</p>
                <Link to={"#"} className="btn btn-secondary">Edit</Link>
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

export default DeckView;