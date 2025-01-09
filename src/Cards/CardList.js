import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Card from "./Card";

function CardList() {
    const { deckId, decks, setChange } = useOutletContext();
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        const loadDeck = async () => {
            try {
                const deck = await readDeck(deckId, signal);
                setCards(deck.cards || []);
            } catch (error) {
                console.error("Error loading deck:", error);
            }
        };

        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleDeleteDeck = (event) => {
            event.preventDefault();
            const abortController = new AbortController();
            const { signal } = abortController;
            if (window.confirm("Are you sure you want to delete this deck?")) {
                deleteDeck(deckId, signal);
                navigate("/");
                setChange(true);
            }
        }

    const handleDeleteCard = async (cardId) => {
        try {
            await deleteCard(cardId);
            setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {decks.name}
                    </li>
                </ol>
            </nav>
            <br />
            <div className="container w-65">
                <h2>{decks.name}</h2>
                <p>{decks.description}</p>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                    Edit
                </Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
                    Study
                </Link>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                    Add Card
                </Link>
                <button
                    className="btn btn-danger float-right"
                    onClick={handleDeleteDeck}
                >
                    Delete
                </button>
            </div>
            <br />
            <div className="container">
                <h2>Cards</h2>
                {cards.map((card) => (
                    <Card key={card.id} card={card} deckId={deckId} onDelete={handleDeleteCard} />
                ))}
            </div>
        </>
    );
}

export default CardList;
