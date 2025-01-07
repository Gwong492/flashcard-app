import { useOutletContext, Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import { deleteDeck, readDeck } from "../utils/api";
import React, { useState } from "react";

function CardList() {
    const { cards: initialCards, deckId, decks } = useOutletContext();
    const [cards, setCards] = useState(initialCards);
    const navigate = useNavigate();

    const refreshCards = async () => {
        const abortController = new AbortController();
        try {
            const deck = await readDeck(deckId, abortController.signal);
            setCards(deck.cards);
        } catch (error) {
            console.error("Error refreshing cards:", error);
        }
        return () => abortController.abort();
    };

    const handleDeleteDeck = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;
        if (window.confirm("Are you sure you want to delete this deck?")) {
            try {
                await deleteDeck(deckId, signal);
                navigate('/');
            } catch (error) {
                console.error("Error deleting deck:", error);
            }
        }
    };

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
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Card</Link>
                <button
                    className="btn btn-danger float-right"
                    onClick={handleDeleteDeck}
                >
                    Delete
                </button>
            </div>
            <br />
            <div className="container w-65">
                <h2>Cards</h2>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        deckId={deckId}
                        refreshCards={refreshCards}
                    />
                ))}
            </div>
        </>
    );
}

export default CardList;
