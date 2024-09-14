import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import React from "react";

function Deck({ name, description, deckId, cards }) {

    const handleClick = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;
        if (window.confirm("Are you sure you want to delete this deck?")) {
            deleteDeck(deckId, signal);
        }
    }

    return (
        <>
            <div className="card w-75" key={`deckId${deckId}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h2 className="card-title">{name}</h2>
                        </div>
                        <div className="col float-right">
                            <h5>{`${cards.length} cards`}</h5>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">View</Link>
                    <Link to={`/decks/${deckId}/study`}className="btn btn-primary">Study</Link>
                    <Link className="btn btn-danger float-right" onClick={handleClick}>Delete</Link>
                </div>
            </div>
            <br />
        </>
    )
};

export default Deck;