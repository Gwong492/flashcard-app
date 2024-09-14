import { Link, useNavigate } from "react-router-dom";
import { deleteCard } from "../utils/api";
import React from "react";

function Card({ card, deckId }) {
    const cardId = card.id;
    const cardRequestType = "edit"
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId, signal);
            navigate(`/decks/${deckId}`);
        };
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
                    <Link className="btn btn-danger float-right" onClick={handleClick}>Delete</Link>
                    <Link to={`/decks/${deckId}/cards/${cardId}/${cardRequestType}`} className="btn btn-secondary float-right">Edit</Link>
                </div>
            </div>
            <br />
        </>
    )
};

export default Card;