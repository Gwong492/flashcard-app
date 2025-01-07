import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { createCard } from "../utils/api";

function CreateCard() {
    const { deckId, decks } = useOutletContext();
    const navigate = useNavigate();

    const initialFormState = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        const newCard = {
            front: formData.front,
            back: formData.back,
            deckId: Number(deckId),
        };

        if (window.confirm("Are you sure you want to save changes")) {
            await createCard(deckId, newCard, signal);
            setFormData({ ...initialFormState });
            navigate(`/decks/${deckId}`);
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{decks.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <div className="container w-65">
                <h2>{`${decks.name}: Add Card`}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="front">Front</label>
                        <textarea
                            id="front"
                            name="front"
                            className="form-control"
                            rows="3"
                            placeholder="Enter front of the card"
                            value={formData.front}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">Back</label>
                        <textarea
                            id="back"
                            name="back"
                            className="form-control"
                            rows="3"
                            placeholder="Enter back of the card"
                            value={formData.back}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => window.location.assign(`/decks/${deckId}`)}
                    >
                    Cancel
                    </button>
                    <button 
                        type="submit"  
                        className="btn btn-primary"
                    >
                    Save
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreateCard;
