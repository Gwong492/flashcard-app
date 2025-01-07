import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";
import React from "react";

function Card({ card, deckId, refreshCards }) {
    const cardId = card.id;

    const handleClick = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        if (window.confirm("Are you sure you want to delete this card?")) {
            try {
                await deleteCard(cardId, signal);
                refreshCards();
            } catch (error) {
                console.error("Error deleting card:", error);
            }
        }
    };

    return (
        <>
            <div className="card w-75" key={`cardId${cardId}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="card-text">{card.front}</div>
                        </div>
                        <div className="col">
                            <div className="card-text">{card.back}</div>
                        </div>
                    </div>
                    <br />
                    <button
                        className="btn btn-danger float-right"
                        onClick={handleClick}
                    >
                        Delete
                    </button>
                    <Link
                        to={`/decks/${deckId}/cards/${cardId}/edit`}
                        className="btn btn-secondary float-right"
                    >
                        Edit
                    </Link>
                </div>
            </div>
            <br />
        </>
    );
}

export default Card;
